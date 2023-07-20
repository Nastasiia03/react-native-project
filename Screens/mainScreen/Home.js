import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

export default function Home({navigation}) {
    return <MainTab.Navigator screenOptions={{tabBarShowLabel: false, tabBarStyle: {paddingHorizontal: 82, paddingTop: 9}}}>
        <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (<AntDesign name="appstore-o" size={24} color="black" />),
            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.logout}>
              <MaterialIcons name="logout" size={24} color="rgba(189, 189, 189, 1)" />
            </TouchableOpacity>),
    }} name="Публікації" component={PostsScreen} />
        <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (<View style={styles.iconWrapper}><Octicons name="plus" size={20} color="white"/></View>)
        }} name="Створити публікацію" component={CreatePostsScreen} />
    <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (<Feather name="user" size={24} color="black" />)
        }} name="Профіль" component={ProfileScreen} />
</MainTab.Navigator>
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