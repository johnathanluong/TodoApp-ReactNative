import { registerRootComponent } from 'expo';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/header';
import List, { ListRef } from './components/list';

export default function App(): JSX.Element {
	// Create a reference to the List component instance
	const listRef = useRef<ListRef>(null);

	/**
	 * Adds a new task to the list
	 * Needed to pass the addTask function from the List component to the Header component -> AddTask component
	 * @param taskName - The name of the task
	 * @param due_date - The due date of the task in 'YYYY-MM-DD'
	 */
	const addTask = (taskName: string, due_date: string) => {
		// Check if the list reference exists
		if (listRef.current) {
			// If so we access the addTask function in the list instance
			listRef.current.addTask(taskName, due_date);
		}
	};

	return (
		<View style={styles.container}>
			<Header addTask={addTask} />
			<List ref={listRef} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff'
	}
});

registerRootComponent(App);
