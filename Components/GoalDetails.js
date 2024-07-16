import React from 'react';
import { View, Text } from 'react-native';

export default function GoalDetails({ navigation, route }) {
    console.log(route)
    return (
        <View>
            <Text>GoalDetails of {route.params.goalObject.text} with id of {route.params.goalObject.id}</Text>
        </View>
    );
}