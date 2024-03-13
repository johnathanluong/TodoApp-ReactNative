import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import ReactNativeModal from 'react-native-modal';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface AddTaskProps {
	addTask: (taskName: string, due_date: string) => void;
}

/**
 * Displays the modal when the AddTask symbol is pressed
 * Allows user to input task name and due date to add to the Todo List
 * @param {AddTaskProps} addTask - The addTask function passed from the list component -> header component -> here to be used
 */
const AddTask = ({ addTask }: AddTaskProps) => {
	const [taskName, setTaskName] = useState('');
	const [dueDate, setDueDate] = useState(new Date());
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	// Adds the task if the task name was filled out and closes the modal
	const handleAddTask = () => {
		if (taskName !== '') {
			addTask(taskName, dueDate.toISOString().split('T')[0]);
		}
		handleModalClose();
	};

	// Closes the DatePicker and sets the due date to be inputed
	const handleSetDueDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setDueDate(selectedDate);
		}
	};

	// Closes the modal and resets data
	const handleModalClose = () => {
		setIsModalVisible(false);
		setTaskName('');
		setDueDate(new Date());
		setShowDatePicker(false);
	};

	return (
		<View>
			<Pressable onPress={() => setIsModalVisible(true)}>
				<Octicons name='plus' size={24} color='black' />
			</Pressable>

			<ReactNativeModal isVisible={isModalVisible} onBackdropPress={handleModalClose}>
				<View style={styles.modalContainer}>
					<TextInput style={styles.textInput} placeholder='Task Name' value={taskName} onChangeText={setTaskName} />

					<Pressable style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
						<Text>{dueDate.toDateString()}</Text>
					</Pressable>

					{showDatePicker && (
						<DateTimePicker value={dueDate} mode='date' display='inline' onChange={handleSetDueDate} />
					)}

					<Button title='Add Task' onPress={handleAddTask} />
				</View>
			</ReactNativeModal>
		</View>
	);
};

export default AddTask;

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10
	},
	textInput: {
		borderWidth: 1,
		borderColor: 'grey',
		padding: 10,
		marginBottom: 10
	},
	datePickerButton: {
		borderWidth: 1,
		borderColor: 'grey',
		padding: 10,
		marginBottom: 10
	}
});
