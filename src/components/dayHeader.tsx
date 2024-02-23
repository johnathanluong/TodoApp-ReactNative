import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function DayHeader({ date }: { date: string }): JSX.Element {
	const dateItem: Date = new Date(date);

	return (
		<View style={styles.container}>
			<Text style={styles.date}>
				{dateItem.toLocaleString('default', { month: 'short' }) +
					' ' +
					(dateItem.getDate() + 1)}
			</Text>
			<Text style={styles.day}>
				{dateItem.toLocaleString('default', { weekday: 'short' })}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: '#f0f0f0',
	},

	date: {
		fontSize: 18,
		fontWeight: 'bold',
	},

	day: {
		fontSize: 16,
		color: '#222',
	},
});
