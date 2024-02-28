import { registerRootComponent } from 'expo';
import { StyleSheet, View } from 'react-native';
import Header from './components/header';
import List from './components/list';
import data from './data/data.json';

export default function App(): JSX.Element {
	return (
		<View style={styles.container}>
			<Header />
			<List todos={data.todos} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});

registerRootComponent(App);
