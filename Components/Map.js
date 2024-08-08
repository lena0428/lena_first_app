import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default Map;