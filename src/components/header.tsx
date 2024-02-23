import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';

// Top header
export default function Header(): JSX.Element {
	return (
		<View style={styles.header}>
			<View>
				<Text style={styles.headerText}>Todo List</Text>
			</View>
			<View style={styles.symbolContainer}>
				<Octicons name="plus" size={24} color="black" />
			</View>
		</View>
	);
}

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
	},

	headerText: {
		fontWeight: 'bold',
		fontSize: 22,
		color: '#333',
		letterSpacing: 1,
		paddingLeft: 15,
	},

	symbolContainer: {
		paddingRight: 15,
	},
});
