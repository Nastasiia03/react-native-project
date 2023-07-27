import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {Provider } from 'react-redux';
import { store } from './redux/store';
import Main from './components/main';

export default function App() {

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
    <Main/>
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
