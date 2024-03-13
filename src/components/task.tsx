import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { TodoItem } from '../data/types';
import { Octicons } from '@expo/vector-icons';
interface Props {
	task: TodoItem;
	onUpdateTask: (taskId: number, newData: Partial<TodoItem>) => void;
	onDeleteTask: (taskId: number) => void;
}

/**
 * Renders a single todo item with a checkbox and an editable text input.
 * @param task - The todo item object
 * @param onUpdateTask - A function to update the task data
 * @param onDeleteTask - A function to delete the task
 */
export default function Task({ task, onUpdateTask, onDeleteTask }: Props): JSX.Element {
	/** 
	 * Task
    @id List key: number
    @task_name Name of Task: string
    @completed Status of Completion: boolean
    @due_date Due date: string ()
    */

	// Updates task's name to the new name passed through
	const handleNameChange = (newName: string) => {
		onUpdateTask(task.id, { task_name: newName });
	};

	// Toggles the completion status
	// If already complete, deletes task
	const toggleTaskCompletion = () => {
		if (task.completed) {
			onDeleteTask(task.id);
		} else {
			onUpdateTask(task.id, { completed: true });
		}
	};

	return (
		<View>
			<View style={styles.container}>
				{task.completed ? (
					<Text style={styles.strikedText}>{task.task_name}</Text>
				) : (
					<TextInput onChangeText={handleNameChange} value={task.task_name} />
				)}
				<Pressable onPress={toggleTaskCompletion}>
					<Octicons name={task.completed ? 'x-circle' : 'check-circle'} size={24} color='black' />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingTop: 10
	},
	strikedText: {
		textDecorationLine: 'line-through'
	}
});
