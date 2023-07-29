import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { db } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const HomeStack = createStackNavigator();

function backButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
      <Ionicons name="arrow-back" size={24} color="rgba(33, 33, 33, 1)" />
    </TouchableOpacity>
  );
};

export default function Home({ navigation }) {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOutUser());
        };

    return <HomeStack.Navigator>
        <HomeStack.Screen name="Публікації" component={PostsScreen} options={{
            headerRight: () => (<TouchableOpacity style={styles.logout} onPress={signOut}>
                <MaterialIcons name="logout" size={24} color="rgba(189, 189, 189, 1)" />
            </TouchableOpacity>), headerLeft: false
        }} />
        <HomeStack.Screen name="Коментарі" component={CommentsScreen} options={{headerLeft: () => backButton()}}/>
        <HomeStack.Screen name="Локації" component={MapScreen} options={{title: "Локація", headerLeft: () => backButton(),}} />
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
    },
    backBtn: {
        marginLeft: 16
    }
})