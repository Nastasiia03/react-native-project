import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

export default function Home() {
    return <MainTab.Navigator>
    <MainTab.Screen name="Posts" component={PostsScreen} />
    <MainTab.Screen name="Create" component={CreatePostsScreen} />
    <MainTab.Screen name="Profile" component={ProfileScreen} />
</MainTab.Navigator>
}