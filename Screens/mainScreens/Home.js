import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";


import PostsScreen from "./PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const HomeStack = createStackNavigator();

export default function Home({navigation}) {
    return <HomeStack.Navigator>
        <HomeStack.Screen name="Публікації" component={PostsScreen} options={{headerShown: false}}/>
        <HomeStack.Screen name="Коментарі" component={CommentsScreen} options={{headerShown: false}}/>
        <HomeStack.Screen name="Локації" component={MapScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
}

const styles = StyleSheet.create({
    iconWrapper: {
    width: 70,
    height: 40,
        backgroundColor: "rgba(255, 108, 0, 1)",
        borderRadius: 30,
        display: "flex",
        justifyContent: "center", 
        alignItems: "center"
    },
    logout: {
        marginRight: 16
    }
})