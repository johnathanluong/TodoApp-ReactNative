import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TodoItem } from '../data/types';
import { Octicons } from '@expo/vector-icons';
interface Props {
    task: TodoItem;
}

export default function Task({ task }: Props): JSX.Element {
    /** 
    @id List key: number
    @task_name Name of Task: string
    @completed Status of Completion: boolean
    @due_date Due date: string ()
    */
    const { id, task_name, completed, due_date } = task;

    return (
        <View>
            <View style={styles.container}>
                <Text>{task_name}</Text>
                <Octicons name="check-circle" size={24} color="black" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});
