import React from "react";
import {View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import PhotoBG from "../../assets/images/PhotoBG.png";
import { AntDesign } from '@expo/vector-icons';

export default function ProfileScreen() {
    return <View style={styles.container}>
        <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: "https://brighterwriting.com/wp-content/uploads/icon-user-default.png" }} />
                <TouchableOpacity style={styles.changeBtn}><AntDesign name="closecircleo" size={24} color="#E8E8E8" /></TouchableOpacity>
                <Text style={styles.userName}>User Name</Text>
            </View>
            </ImageBackground>
    </View>
}; 

const styles = StyleSheet.create({
    container: {
       flex: 1,   
    },
      image: {
    flex: 1,
    width: "100%",
    },
    profile: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25,
        paddingTop: 92,
        alignItems: "center",
        marginTop: 147,
    },
    avatar: {
       width: 120,
        height: 120,
        borderRadius: 16,
        position: "absolute",
        top: -60, 
    },
    userName: {
fontFamily: "Roboto-Medium",
fontSize: 30,
        letterSpacing: 0.3,
marginBottom: 33,
    },
    changeBtn: {
        position: "absolute",
        top: 16,
        left: 245,
backgroundColor: "#fff",
        borderRadius: 50,
    },
})