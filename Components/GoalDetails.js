import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { markAsWarning } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';

export default function GoalDetails({ navigation, route }) {
    const [textColor, setTextColor] = useState('black');
    const [headerTitle, setHeaderTitle] = useState(route.params?.goalObject.text);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: headerTitle,
            headerRight: () => (
                <Button
                    title="Warning"
                    onPress={() => {
                        setTextColor('red');
                        setHeaderTitle('Warning!');
                        // Call the function to update Firestore
                        markAsWarning(route.params.goalObject.id); 
                    }}
                />
            ),
        });
    }, [navigation, headerTitle]);

    return (
        <View>
            {route.params ? (
                <Text style={{ color: textColor }}>
                    GoalDetails of {route.params.goalObject.text} with id of {route.params.goalObject.id}
                </Text>
            ) : (
                <Text style={{ color: textColor }}>More Details</Text>
            )}
            <Button title="More details" onPress={() => navigation.push('Details')} />
            <GoalUsers id={route.params.goalObject.id} />
        </View>
    );
}
