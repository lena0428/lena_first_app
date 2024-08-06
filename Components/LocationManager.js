import React, { useState } from 'react';
import { View, Button, Alert, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { googleMapApiKey } from '@env';

const LocationManager = () => {
    const [location, setLocation] = useState(null);
    const [status, requestPermission] = Location.useForegroundPermissions();

    async function verifyLocationPermission() {
        if (status && status.granted) {
            return true;
        }
        const permission = await requestPermission();
        return permission.granted;
    }

    async function locateUserHandler() {
        const hasPermission = await verifyLocationPermission();
        if (!hasPermission) {
            Alert.alert('Permission to access location was denied');
            return;
        }

        try {
            const result = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: result.coords.latitude,
                longitude: result.coords.longitude
            });
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Could not fetch location');
        }
    }

    return (
        <View>
            <Image
                style={styles.map}
                source={{
                    uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${googleMapApiKey}`
                }}
            />
            <Button title="Find My Location" onPress={locateUserHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: 400,
        height: 200,
        marginTop: 20,
    },
});

export default LocationManager;
