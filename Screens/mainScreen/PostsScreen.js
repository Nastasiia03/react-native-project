import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";


export default function PostsScreen() {
    
    return <View style={styles.container}>
        <View style={styles.userContainer}>
            <Image source={{uri: "https://brighterwriting.com/wp-content/uploads/icon-user-default.png"}} style={styles.image}></Image>
            <View style={styles.textContainer}>
            <Text style={styles.userName}>User Name</Text>
            <Text style={styles.userEmail}>User Email</Text>
            </View>
        </View>
    </View>
}; 



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 32, 
        paddingLeft: 16,
        paddingRight: 16,
    },
    userContainer: {
    flexDirection: "row", 
    alignItems: 'center',
    },
    image: {
        width: 60, 
        height: 60, 
        borderRadius: 16, 
        marginRight: 8
    },
    textContainer: {
        flexDirection: "column",
    },
    userName: {
        fontFamily: "Roboto-Bold",
        fontSize: 13,
fontWeight: 700,
    },
    userEmail: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "rgba(33, 33, 33, 0.80)",
    }
})