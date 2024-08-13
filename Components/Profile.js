import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import LocationManager from "./LocationManager";
import NotificationManager from "./NotificationManager";

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <View>
                {auth.currentUser ? (
                    <View>
                        <Text>{auth.currentUser.email}</Text>
                        <Text>{auth.currentUser.uid}</Text>
                        <LocationManager />
                        <NotificationManager />
                    </View>
                ) : (
                    <Text>No user is currently logged in.</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: 400,
        height: 200,
        marginTop: 20,
    },
});