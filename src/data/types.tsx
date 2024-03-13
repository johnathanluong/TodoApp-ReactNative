export interface TodoItem {
	id: number;
	task_name: string;
	completed: boolean;
	due_date: string;
}

export interface GroupedItems {
	date: string;
	data: TodoItem[];
}
