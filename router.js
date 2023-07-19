import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import Home from "./Screens/mainScreen/Home";

const MainStack = createStackNavigator();


export const useRoute = () => {
    return <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Registration" component={RegistrationScreen} options={{headerShown: false}} />
        <MainStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <MainStack.Screen name="Home" component={Home} />
        </MainStack.Navigator> 
}