import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, Pressable, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null)


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCurrentPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude })
    })();
  }, []);


  const getPosition = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setCurrentPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude })
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = currentPosition ? currentPosition.latitude + " - " + currentPosition.longitude : "";
  }


  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle= "default"
      />
      <View style={{ backgroundColor: "#2980B9", width: '100%', padding: 5, marginTop: 0, marginBottom: 10 }}>
        <Text style={{ textAlign: 'center', fontSize: 25, color: '#ffffff' }}>Get My position</Text>
      </View>
      <Text style={styles.paragraph}>{text}</Text>
      {currentPosition && <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }}
      >
        <Marker
          coordinate={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
          title='Ma position'
          description='Position actuelle'
        />
      </MapView>}
      <Pressable style={styles.position} onPress={getPosition}>
        <Text style={{ fontSize: 20 }}>P</Text>
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#0B5345'
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: "#fff"
  },
  map: {
    width: '100%',
    height: '80%',
  },
  position: {
    marginTop: 10,
    position: 'absolute',
    bottom: 50,
    right: 20,
    borderRadius: 26,
    backgroundColor: '#FBFCFC75',
    borderWidth: 1,
    borderColor: "#2980B9",
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});