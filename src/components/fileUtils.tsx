import * as FileSystem from 'expo-file-system';
import { TodoItem } from '../data/types';

export const loadJSONFromFile = async (
	filePath: string
): Promise<{ todos: TodoItem[] }> => {
	try {
		const fileContents = await FileSystem.readAsStringAsync(filePath);
		return JSON.parse(fileContents) as { todos: TodoItem[] };
	} catch (error) {
		console.error('Error reading JSON file:', error);
		throw error;
	}
};

export const saveJSONToFile = async (
	filePath: string,
	data: { todos: TodoItem[] }
): Promise<void> => {
	try {
		await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
	} catch (error) {
		console.error('Error saving data to JSON: ', error);
		throw error;
	}
};
