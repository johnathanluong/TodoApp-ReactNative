import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { TodoItem } from '../data/types';
import { Octicons } from '@expo/vector-icons';
interface Props {
	task: TodoItem;
	onUpdateName: (taskId: number, newName: string) => void;
}

export default function Task({ task, onUpdateName }: Props): JSX.Element {
	/** 
	 * task
    @id List key: number
    @task_name Name of Task: string
    @completed Status of Completion: boolean
    @due_date Due date: string ()
    */

	const [text, setText] = useState(task.task_name);
	const [iconName, setIconName] = useState('check-circle');

	const handleNameChange = (newName: string) => {
		setText(newName);
		onUpdateName(task.id, newName);
	};

	const onPressCheck = () => {
		setIconName('x-circle');
	};

	return (
		<View>
			<View style={styles.container}>
				<TextInput onChangeText={handleNameChange} value={text} />
				<Pressable onPress={onPressCheck}>
					<Octicons name={iconName as any} size={24} color="black" />
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
});
