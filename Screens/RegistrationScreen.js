import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image } from "react-native";
import { useFonts } from 'expo-font';

export default function RegistrationScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fontsLoaded] = useFonts({
"Roboto": require("../assets/fonts/Roboto-Regular.ttf"),
  })
    

const nameHandler = (text) => setName(text);
const emailHandler = (text) => setEmail(text);
const passwordHandler = (text) => setPassword(text);
    
const onRegister = () => {
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`)
}
    return (
        <View style={styles.container}>
            <Image source={require('../assets/PhotoBG.png')} style={styles.image}/>
            <View style={styles.form}>
                <Text style={styles.title}>Реєстрація</Text>
                <View style={styles.input}><TextInput value={name} placeholder="Логін" onChangeText={nameHandler}/></View>
            <View style={styles.input}><TextInput value={email} placeholder="Адреса електронної пошти" onChangeText={emailHandler}/></View>
            <View style={styles.lastInput}><TextInput value={password} placeholder="Пароль" onChangeText={passwordHandler} secureTextEntry={true}/></View>
                <Button style={styles.btn} title={"Зареєструватися"} onPress={onRegister}/>
            <Text>Вже маєте акаунт? Увійти</Text>
            </View>
            
    </View>)
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    
    },

    image: {
        position: "absolute",
        width: "100%",
        top: 0,
    },

    form: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 549,
        paddingTop: 92,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 78,
    },

    title: {
        fontFamily: "Roboto", 
        fontSize: 30,
        fontWeight: 500,
        lineHeight: 35,
    marginBottom: 32,
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

    btn: {
        backgroundColor: "#FF6C00",
        borderRadius: 100,
    }
    
    
})