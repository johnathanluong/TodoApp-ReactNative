import { registerRootComponent } from 'expo';
import { StyleSheet, View } from 'react-native';
import Header from './components/header';
import List from './components/list';
import data from './data/data.json';
import { useState } from 'react';
import { TodoItem } from './data/types';

export default function App(): JSX.Element {
	const [todos, setTodos] = useState(data.todos);

	const handleUpdateTodos = (updatedTodos: TodoItem[]) => {
		setTodos(updatedTodos);
	};

	return (
		<View style={styles.container}>
			<Header />
			<List todos={todos} onUpdateTodos={handleUpdateTodos} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});

registerRootComponent(App);
