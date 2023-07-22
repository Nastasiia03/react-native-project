import React from "react";
import {View, Text, StyleSheet, ImageBackground } from "react-native";
import PhotoBG from "../../assets/images/PhotoBG.png";

export default function ProfileScreen() {
    return <View style={styles.container}>
        <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
            <Text>Profile Screen</Text>
            </ImageBackground>
    </View>
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
      image: {
    flex: 1,
    justifyContent: 'center',
    width: "100%",
    justifyContent: "flex-end"
},
})