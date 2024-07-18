import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

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
        </View>
    );
}
