import { View, Text, FlatList, SectionList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Task from './task';
import { TodoItem } from '../data/types';
import DayHeader from './dayHeader';

interface Props {
    todos: TodoItem[];
}

interface GroupedItems {
    date: string;
    data: TodoItem[];
}

export default function List({ todos }: Props): JSX.Element {
    //
    const groupedTodo: GroupedItems[] = groupTodobyDueDate(todos);

    return (
        <View>
            <SectionList
                sections={groupedTodo}
                renderItem={renderTask}
                renderSectionHeader={renderHeader}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

// Renderer for task in each group
const renderTask = ({ item }: { item: TodoItem }) => (
    <>
        <Task task={item} />
        <View style={styles.line} />
    </>
);

// Renderer for the date header for each group
const renderHeader = ({ section: { date } }: { section: GroupedItems }) => (
    <DayHeader date={date} />
);

/**
 * Groups the todo items by their due date
 * @param data An array of TodoItem objects representing the todo items
 * @returns An array of GroupedItems objects representing the todo items grouped by their due date
 */
const groupTodobyDueDate = (data: TodoItem[]): GroupedItems[] => {
    const groups: GroupedItems[] = [];

    data.forEach((item: TodoItem) => {
        const group = groups.find((group) => group.date === item.due_date);

        if (group) {
            group.data.push(item);
        } else {
            groups.push({ date: item.due_date, data: [item] });
        }
    });

    groups.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA.getTime() - dateB.getTime();
    });

    return groups;
};

const styles = StyleSheet.create({
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
});
