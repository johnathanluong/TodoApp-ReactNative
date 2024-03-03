import { View, SectionList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Task from './task';
import { TodoItem } from '../data/types';
import DayHeader from './dayHeader';
import { loadJSONFromFile, saveJSONToFile } from './fileUtils';
import * as FileSystem from 'expo-file-system';

interface Props {
	todos: TodoItem[];
	onUpdateTodos: (updatedTodos: TodoItem[]) => void;
}

interface GroupedItems {
	date: string;
	data: TodoItem[];
}

// Renderer for the date header for each group
const renderHeader = ({ section: { date } }: { section: GroupedItems }) => (
	<DayHeader date={date} />
);

/**
 * Groups the todo items by their due date
 * @param data An array of TodoItem objects representing the todo items
 * @returns An array of GroupedItems objects representing the todo items grouped by their due date
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

export default function List({ todos, onUpdateTodos }: Props): JSX.Element {
	useEffect(() => {
		loadInitialData();
	}, []);

	const loadInitialData = async () => {
		try {
			const jsonData = await loadJSONFromFile(
				FileSystem.documentDirectory + 'data.json'
			);
			onUpdateTodos(jsonData.todos);
		} catch (error) {}
	};

	const updateAndSaveData = async (updateData: TodoItem[]) => {
		await saveJSONToFile(FileSystem.documentDirectory + 'data.json', {
			todos: updateData,
		});
		onUpdateTodos(updateData);
	};

	// Creates a new array of todos that updates the task name
	const updateTask = (taskId: number, newData: Partial<TodoItem>) => {
		const updatedTodos = todos.map((task) =>
			task.id === taskId ? { ...task, ...newData } : task
		);

		updateAndSaveData(updatedTodos);
	};

	const deleteTask = (taskId: number) => {
		const updatedTodos = todos.filter((task) => task.id !== taskId);
		updateAndSaveData(updatedTodos);
	};

	// Renderer for task in each group
	const renderTask = ({ item }: { item: TodoItem }) => (
		<>
			<Task
				task={item}
				onUpdateTask={updateTask}
				onDeleteTask={deleteTask}
			/>
			<View style={styles.line} />
		</>
	);

	return (
		<View>
			<SectionList
				sections={groupTodoByDueDate(todos)}
				renderItem={renderTask}
				renderSectionHeader={renderHeader}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	line: {
		borderBottomColor: 'black',
		borderBottomWidth: StyleSheet.hairlineWidth,
		padding: 5,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 10,
	},
});
