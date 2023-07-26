import 'react-native-gesture-handler';
import { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from './router';
import { useFonts } from 'expo-font';
import {Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  const routing = useRoute(false);

const [fontsLoaded] = useFonts({
  "Roboto": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf")
      });
if (!fontsLoaded) {
return null;
}
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      {routing}
      </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
