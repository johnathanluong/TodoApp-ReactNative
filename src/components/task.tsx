import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { TodoItem } from '../data/types';
import { Octicons } from '@expo/vector-icons';
interface Props {
	task: TodoItem;
	onUpdateTask: (taskId: number, newData: Partial<TodoItem>) => void;
	onDeleteTask: (taskId: number) => void;
}

export default function Task({
	task,
	onUpdateTask,
	onDeleteTask,
}: Props): JSX.Element {
	/** 
	 * task
    @id List key: number
    @task_name Name of Task: string
    @completed Status of Completion: boolean
    @due_date Due date: string ()
    */

	const handleNameChange = (newName: string) => {
		onUpdateTask(task.id, { task_name: newName });
	};

	const onPressCheck = () => {
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
					<TextInput
						onChangeText={handleNameChange}
						value={task.task_name}
					/>
				)}
				<Pressable onPress={onPressCheck}>
					<Octicons
						name={task.completed ? 'x-circle' : 'check-circle'}
						size={24}
						color="black"
					/>
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
		paddingTop: 10,
	},
	strikedText: {
		textDecorationLine: 'line-through',
	},
});
