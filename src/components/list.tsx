import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Task from './task'
import { TodoItem } from '../data/types';

interface Props {
    todos: TodoItem[];
}

export default function List({ todos }: Props): JSX.Element {
    const renderTask = ({ item }: { item: TodoItem }) => <Task task={item} />
    
    return (
        <View>
            <FlatList 
                data={todos}
                renderItem={renderTask}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}