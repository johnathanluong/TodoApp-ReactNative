import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AddTask from './AddTask';

interface HeaderProps {
	addTask: (taskName: string, due_date: string) => void;
}

/**
 * Displays the header and the AddTask component represented by the '+' symbol
 * @param {HeaderProps} addTask - The addTask function passed from the list component so that we can pass to the AddTask component
 */
const Header = ({ addTask }: HeaderProps): JSX.Element => {
	return (
		<View style={styles.header}>
			<View>
				<Text style={styles.headerText}>Todo List</Text>
			</View>

			<View style={styles.addTaskContainer}>
				<AddTask addTask={addTask} />
			</View>
		</View>
	);
};

export default Header;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	header: {
		width: width,
		backgroundColor: '#f0f0f0',
		alignItems: 'center',
		paddingTop: 30,
		paddingBottom: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 0.5
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 22,
		color: '#333',
		letterSpacing: 1,
		paddingLeft: 15
	},
	addTaskContainer: {
		paddingRight: 15
	}
});
