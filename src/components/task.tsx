import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoItem } from "../data/types";
interface Props {
    task: TodoItem 
}

export default function Task({task}: Props): JSX.Element {   
    const { id, task_name, completed, due_date } = task;

    return (
        <View>
            <Text>{task_name}</Text>
            <Text>Due Date: {due_date}</Text>
        </View>
    )
};

const styles = StyleSheet.create({

});
