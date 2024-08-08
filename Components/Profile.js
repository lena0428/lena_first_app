import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import * as Location from "expo-location";
import { auth } from "../Firebase/firebaseSetup";
import LocationManager from "./LocationManager";

export default function Profile({ route }) {
    const selectedLocation = route.params?.location;

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <View>
                {auth.currentUser ? (
                    <View>
                        <Text>{auth.currentUser.email}</Text>
                        <Text>{auth.currentUser.uid}</Text>
                        <LocationManager />
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