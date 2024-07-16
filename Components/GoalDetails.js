import React from 'react';
import { View, Text, Button } from 'react-native';

export default function GoalDetails({ navigation, route }) {
    console.log(route)
    return (
        <View>
            {route.params?(<Text>GoalDetails of {route.params.goalObject.text} with id of {route.params.goalObject.id}</Text>):(<Text>More Details</Text>)}
            <Button title='More details' onPress={() => navigation.push('Details')} />
        </View>
    );
}