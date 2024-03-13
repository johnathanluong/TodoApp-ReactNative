import { View, SectionList, StyleSheet, Text } from 'react-native';
import React, { useEffect, useMemo, useReducer, useImperativeHandle } from 'react';
import Task from './task';
import { TodoItem, GroupedItems } from '../data/types';
import DateHeader from './DateHeader';
import { loadJSONFromFile, saveJSONToFile } from './fileUtils';
import * as FileSystem from 'expo-file-system';

/**
 * Defines actions that can be performed on todos state
 */
type TodoAction =
	| { type: 'SET_TODOS'; payload: TodoItem[] }
	| { type: 'ADD_TASK'; payload: TodoItem }
	| { type: 'UPDATE_TASK'; payload: { taskId: number; newData: Partial<TodoItem> } }
	| { type: 'DELETE_TASK'; payload: number };

/**
 * Reducer function that handles state updates to the todo list
 * @param {TodoItem[]} state - Current todo list state
 * @param {TodoAction} action - Action to perform on todo list state
 * @returns {TodoItem[]} - Updated todo list state
 */
const todoReducer = (state: TodoItem[], action: TodoAction): TodoItem[] => {
	switch (action.type) {
		case 'SET_TODOS':
			return action.payload;
		case 'ADD_TASK':
			return [...state, action.payload];
		case 'UPDATE_TASK':
			return state.map((task) => (task.id === action.payload.taskId ? { ...task, ...action.payload.newData } : task));
		case 'DELETE_TASK':
			return state.filter((task) => task.id !== action.payload);
		default:
			return state;
	}
};

/**
 * Interface of the shape of the ref object exposed by the List component
 * Done to expose the addTask function so that the AddTask component can use
 */
export type ListRef = {
	addTask: (taskName: string, due_date: string) => void;
};

/**
 * List component that renders a list of todo tasks grouped by due date
 */
const List = React.forwardRef<ListRef>((props, ref) => {
	const [todos, dispatch] = useReducer(todoReducer, []);

	// Loads the data when List is initialized
	useEffect(() => {
		loadInitialData();
	}, []);

	// Saves the todos state to the JSON file whenever todos is updated
	useEffect(() => {
		saveUpdatedTodos(todos);
	}, [todos]);

	// Exposes the addTask function
	useImperativeHandle(ref, () => ({
		addTask: (taskName: string, due_date: string) => {
			addTask(taskName, due_date);
		}
	}));

	// Creates a blank formatted JSON file to prep for adding todos
	const createInitialFile = async () => {
		try {
			await saveJSONToFile(FileSystem.documentDirectory + 'data.json', { todos: [] });
		} catch (error) {
			console.error('Error creating initial file: ', error);
		}
	};

	/**
	 * Loads the data
	 * If data does not exist, createInitialFile()
	 */
	const loadInitialData = async () => {
		try {
			const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'data.json');
			if (fileInfo.exists) {
				const jsonData = await loadJSONFromFile(FileSystem.documentDirectory + 'data.json');
				dispatch({ type: 'SET_TODOS', payload: jsonData.todos });
			} else {
				await createInitialFile();
				dispatch({ type: 'SET_TODOS', payload: [] });
			}
		} catch (error) {
			console.error('Error loading initial data: ', error);
		}
	};

	// Saves updated todos to JSON
	const saveUpdatedTodos = async (updatedTodos: TodoItem[]) => {
		try {
			await saveJSONToFile(FileSystem.documentDirectory + 'data.json', {
				todos: updatedTodos
			});
		} catch (error) {
			console.error('Error saving updated data: ', error);
		}
	};

	// Create new task and add it to the todo list
	const addTask = (taskName: string, due_date: string) => {
		const newTaskId = todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
		const newTask = { id: newTaskId, task_name: taskName, completed: false, due_date: due_date };

		dispatch({ type: 'ADD_TASK', payload: newTask });
	};

	// Update the specified task
	const updateTask = (taskId: number, newData: Partial<TodoItem>) => {
		dispatch({ type: 'UPDATE_TASK', payload: { taskId, newData } });
	};

	// Delete the specified task
	const deleteTask = (taskId: number) => {
		dispatch({ type: 'DELETE_TASK', payload: taskId });
	};

	/**
	 * Groups the todo list items into sectioned groups based off of due date (BUCKET SORT !!!!)
	 * @param {TodoItem[]} data - List of todo items
	 * @returns {GroupedItems[]} groups - A sorted array of todo items sectioned by their due date
	 */
	const groupTodoByDueDate = (data: TodoItem[]): GroupedItems[] => {
		const groups: GroupedItems[] = [];

		data.forEach((item: TodoItem) => {
			const group = groups.find((group) => group.date === item.due_date);

			if (group) {
				group.data.push(item);
			} else {
				groups.push({ date: item.due_date, data: [item] });
			}
		});

		groups.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			return dateA.getTime() - dateB.getTime();
		});

		return groups;
	};

	// Stores the grouped todos and calls groupTodoByDueDate if the todos state changes
	const groupedTodos = useMemo(() => groupTodoByDueDate(todos), [todos]);

	// Renders each task and the line break
	const renderTask = ({ item }: { item: TodoItem }) => (
		<>
			<Task task={item} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
			<View style={styles.line} />
		</>
	);

	// Renders the date header
	const renderDateHeader = ({ section: { date } }: { section: GroupedItems }) => <DateHeader date={date} />;

	return (
		<View>
			{todos.length === 0 ? (
				<Text style={styles.emptyListText}>Press the + button to add a task</Text>
			) : (
				<SectionList
					sections={groupedTodos}
					renderItem={renderTask}
					renderSectionHeader={renderDateHeader}
					keyExtractor={(item) => item.id.toString()}
				/>
			)}
		</View>
	);
});

export default List;

const styles = StyleSheet.create({
	line: {
		borderBottomColor: 'black',
		borderBottomWidth: StyleSheet.hairlineWidth,
		padding: 5,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 10
	},
	emptyListText: {
		fontSize: 16,
		textAlign: 'center',
		color: 'gray'
	}
});
