import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, 
Keyboard } from "react-native";
import PhotoBG from "../assets/images/PhotoBG.png";
import { useFonts } from 'expo-font';

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
          })

const emailHandler = (text) => setEmail(text);
const passwordHandler = (text) => setPassword(text);

    const onLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`)
}
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <SafeAreaView style={styles.area}>
        <View style={styles.form}>
        <Text style={styles.title}>Увійти</Text>
        <View style={styles.input}><TextInput value={email} placeholder="Адреса електронної пошти" onChangeText={emailHandler} style={styles.text}/></View>
        <View style={styles.lastInput}><TextInput value={password} placeholder="Пароль" onChangeText={passwordHandler} style={styles.text}/></View>
        <TouchableOpacity style={styles.btn} onPress={onLogin}><Text style={styles.btnText}>Увійти</Text></TouchableOpacity>
            <Text style={styles.confirmation}>Не маєте акаунта? Зареєструватися</Text>
            </View>
            </SafeAreaView>
            </KeyboardAvoidingView>
            </ImageBackground>
    </View>
    </TouchableWithoutFeedback>)
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: "100%",
    justifyContent: "flex-end"
},
area: {
    flex: 1,
},
form: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 489,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
},
title: {
    fontFamily: "Roboto-Regular", 
    fontSize: 30,
    fontWeight: 500,
marginBottom: 33,
},
input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    width: "100%",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    marginBottom: 16, 
padding: 16,
},
lastInput: {
    height: 50,
    backgroundColor: "#F6F6F6",
    width: "100%",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    marginBottom: 43,
    padding: 16,
}, 
text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
},
btn: {
    display: "flex",
    width: 343,
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 16,
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    borderRadius: 100,
backgroundColor: "#FF6C00",
marginBottom: 16
},

btnText: {
color: "#FFF",
textAlign: "center",
fontFamily: "Roboto-Regular",
fontSize: 16,
}, 
confirmation: {
    color: "#1B4371",
textAlign: "center",
fontFamily: "Roboto-Regular",
fontSize: 16,
    }   
})