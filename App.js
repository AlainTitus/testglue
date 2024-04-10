import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, Pressable, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null)
  const [userLat, setUserLat] = useState(null);
  const [userLong, SetUserLong] = useState(null);
  const [precision, setPrecision] = useState(null)


  useEffect(() => {
    let subscription;
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locat = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        distanceInterval: 1
      });
      setLocation(locat);
      const { latitude, longitude, accuracy } = locat.coords;
      setCurrentPosition({ latitude, longitude })
      console.log("userLats: ", latitude);
      console.log("userLongs: ", longitude);
      console.log('accuracy: ', accuracy)
      setUserLat(latitude);
      SetUserLong(longitude);
      setPrecision(accuracy);
      

      // subscription = await Location.watchPositionAsync(
      //   {
      //     accuracy: Location.Accuracy.High,
      //     distanceInterval: 1
      //   },
      //   (locations) => {
      //     console.log(locations)
      //     const { coords } = locations;
      //     const { latitude, longitude } = coords;
      //     console.log('userLatitude', latitude);
      //     console.log('userLongitude', longitude);
      //     setUserLat(latitude);
      //     SetUserLong(longitude)
      //   }
      // )


    })();
  }, []);


  const getPosition = async () => {

    let subscription = null
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    // subscription = await Location.watchPositionAsync(
    //   {
    //     accuracy: Location.Accuracy.High,
    //     distanceInterval: 1
    //   },
    //   (location) => {
    //     console.log(location)
    //     const { coords } = location;
    //     const { latitude, longitude } = coords;
    //     console.log('userLatitude', latitude);
    //     console.log('userLongitude', longitude);
    //     setUserLat(latitude);
    //     SetUserLong(longitude)
    //   }
    // )

    let locat = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      distanceInterval: 1
    });
    console.log(locat)
    setLocation(locat);
    const { latitude, longitude, accuracy } = locat.coords;
    setCurrentPosition({ latitude, longitude })
    console.log("userLats: ", latitude);
    console.log("userLongs: ", longitude);
    console.log("accuracy: ", accuracy)
    setUserLat(latitude);
    SetUserLong(longitude);
    setPrecision(accuracy)
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log(precision/2)
    text = userLat == null && precision == null ? "" : userLat + " - " + userLong + " -(" + Number.parseFloat(precision).toFixed(2)+')';
  }


  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="default"
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
          latitudeDelta: 1,
          longitudeDelta: 1
        }}
      >
        <Marker
          coordinate={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1
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
    backgroundColor: '#',
    borderWidth: 1,
    borderColor: "#2980B9",
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});