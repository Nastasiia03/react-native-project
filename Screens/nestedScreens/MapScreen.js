import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  
  const {latitude, longitude} = route.params.location;
  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }} initialRegion={{ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true}>
        <Marker coordinate={{latitude, longitude}}/>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});