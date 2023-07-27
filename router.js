import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import Home from "./Screens/mainScreens/Home";
import CreatePostsScreen from "./Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreens/ProfileScreen";
import { AntDesign } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

function backButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
      <Ionicons name="arrow-back" size={24} color="rgba(33, 33, 33, 1)" />
    </TouchableOpacity>
  );
};

const HomeTabs = ({navigation}) => {
return <MainTab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: { paddingHorizontal: 82, paddingTop: 9 } }}>
        <MainTab.Screen options={{
            title: "Публікації",
            tabBarIcon: ({ focused, size, color }) => (<AntDesign name="appstore-o" size={24} color="black" />),
            headerShown: false,
        }} name="Home" component={Home} />
        <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (<View style={styles.iconWrapper}><Octicons name="plus" size={20} color="white" /></View>),
            tabBarStyle: { display: 'none' }, 
            headerLeft: () => backButton(),
        }} name="Створити публікацію" component={CreatePostsScreen} />
        <MainTab.Screen options={{
            tabBarIcon: ({ focused, size, color }) => (<Feather name="user" size={24} color="black" />), headerShown: false,
        }} name="Профіль" component={ProfileScreen} />
    </MainTab.Navigator>
};


export const useRoute = (isAuth) => {
    if (!isAuth) {
        return <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
            <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </MainStack.Navigator>
    }
    return <MainStack.Navigator>
        <MainStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
    </MainStack.Navigator>
};
    

const styles = StyleSheet.create({
    iconWrapper: {
    width: 70,
    height: 40,
        backgroundColor: "rgba(255, 108, 0, 1)",
        borderRadius: 20,
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