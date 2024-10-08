import React, { useState } from 'react';
import { View, Button, Alert, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { googleMapApiKey } from '@env';
import { useNavigation, useRoute} from '@react-navigation/native';
import { useEffect } from 'react';
import { writeWithIdToDB, getADoc } from '../Firebase/firestoreHelper';
import { auth } from '../Firebase/firebaseSetup';


const LocationManager = () => {
    const [location, setLocation] = useState(null);
    const [status, requestPermission] = Location.useForegroundPermissions();
    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.params);

    useEffect(() => {
        if (route.params?.location) {
            setLocation(route.params.location);
        }
    }, [route.params?.location]);

    useEffect(() => {
        async function fetchUserLocation() {
            const userDoc = await getADoc('users', auth.currentUser.uid);
            if (userDoc) {
                setLocation(userDoc.location);
            }
        }
        
        if (!route.params?.location) {
            fetchUserLocation();
        }
    }, []);


    
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

    const saveLocationHandler = async () => {
        if (location) {
            await writeWithIdToDB(auth.currentUser.uid, 'users', { location });
            navigation.navigate('Home');
        }
    };

    return (
        <View>
            <Image
                style={styles.map}
                source={{
                    uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${googleMapApiKey}`
                }}
            />
            <Button title="Find My Location" onPress={locateUserHandler} />
            <Button
                title="Let me choose a location"
                onPress={() => navigation.navigate('Map')}
            />
             <Button
                title="Save my location"
                onPress={saveLocationHandler}
                disabled={!location}
            />
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
