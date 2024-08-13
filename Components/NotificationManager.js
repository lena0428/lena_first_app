import React from "react";
import { Button, View, Alert } from "react-native";
import * as Notifications from "expo-notifications";

const NotificationManager = () => {

    async function verifyPermission() {
        try {
            const response = await Notifications.getPermissionsAsync();

            if (response.granted) {
                return true;
            }

            const requestResponse = await Notifications.requestPermissionsAsync();
            return requestResponse.granted;
        } catch (error) {
            console.log(error);
        }
    }

    async function scheduleNotificationHandler() {
        const hasPermission = await verifyPermission();
        console.log(hasPermission);

        if (!hasPermission) {
            Alert.alert(
                "Permission Required",
                "You need to grant notification permissions to use this feature."
            );
            return;
        }

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Add a goal',
                body: 'Remember to add a goal today',
                data: { url: 'https://google.com' },
            },
            trigger: {
                seconds: 5,
            },
        });
    };

    return (
        <View>
            <Button
                title="Remind me to add a goal"
                onPress={scheduleNotificationHandler}
            />
        </View>
    );
};

export default NotificationManager;
