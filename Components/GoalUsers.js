import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { writeToDB, readAllData } from "../Firebase/firestoreHelper";

const GoalUsers = ({ id }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const dataFromFirebase = await readAllData(`goals/${id}/users`);
                if (dataFromFirebase.length) {
                    setUsers(dataFromFirebase);
                    return;
                }

                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('The request was not successful');
                }
                const data = await response.json();
                console.log(data);
                setUsers(data);
                data.forEach((user) => {
                    writeToDB(user, `goals/${id}/users`);
                });
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserData();
    }, []);

    return (
        <View>
            <Text>GoalUsers</Text>
            <FlatList
                data={users}
                renderItem={({ item }) => {
                    return <Text>{item.name}</Text>
                }}
            />
        </View>
    );
}

export default GoalUsers;