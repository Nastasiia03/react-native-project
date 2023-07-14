import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, 
Keyboard, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import PhotoBG from "../assets/images/PhotoBG.png";
import { SvgXml } from 'react-native-svg';

export default function RegistrationScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [fontsLoaded] = useFonts({
"Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  })

  if (!fontsLoaded) {
    return null;
  }

const nameHandler = (text) => setName(text);
const emailHandler = (text) => setEmail(text);
const passwordHandler = (text) => setPassword(text);
    
const onRegister = () => {
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`)
}

const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
};

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="132" height="120" viewBox="0 0 132 120" fill="none">
<rect width="120" height="120" rx="16" fill="#F6F6F6"/>
<circle cx="119.5" cy="93.5" r="12" fill="white" stroke="#FF6C00"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M120 87H119V93H113V94H119V100H120V94H126V93H120V87Z" fill="#FF6C00"/>
</svg>
`

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
            <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={styles.area}>
            <View style={styles.form}>
                <View style={styles.avatar}> 
                <SvgXml xml={xml}/>
                </View>
                <Text style={styles.title}>Реєстрація</Text>
                <View style={styles.input}>
                    <TextInput value={name} placeholder="Логін" onChangeText={nameHandler} style={styles.text} onFocus={()=>setKeyboardVisible(true)} onSubmitEditing={() => setKeyboardVisible(false)}/>              
                    </View>
            <View style={styles.input}>
                <TextInput value={email} placeholder="Адреса електронної пошти" onChangeText={emailHandler} style={styles.text} onFocus={()=>setKeyboardVisible(true)} onSubmitEditing={() => setKeyboardVisible(false)}/>
                </View>
            <View style={{...styles.lastInput, marginBottom: keyboardVisible ? 32 : 43}}>
                <TextInput value={password} placeholder="Пароль" onChangeText={passwordHandler} secureTextEntry={true} style={styles.text} onFocus={()=>setKeyboardVisible(true)} onSubmitEditing={() => setKeyboardVisible(false)}/>
                </View>
                {!keyboardVisible &&
                <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={onRegister}><Text style={styles.btnText}>Зареєструватися</Text></TouchableOpacity>
            <Text style={styles.confirmation}>Вже маєте акаунт? Увійти</Text></View>}
            </View>
            </SafeAreaView>
            </KeyboardAvoidingView>
            </ImageBackground>
            
     </View>
     </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    
    },

    area: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: "100%",
        justifyContent: "flex-end"
    },

    form: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingTop: 92,
        paddingLeft: 16,
        paddingRight: 16,
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25, 
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 16,
        position: "absolute",
        top: -60,
    },
    title: {
        fontFamily: "Roboto-Regular", 
        fontSize: 30,
        fontWeight: 500,
    marginBottom: 32,
    },

    input: {
        height: 50,
        backgroundColor: "#F6F6F6",
        width: "100%",
        borderWidth: 1, 
    borderColor: "#E8E8E8",
        borderRadius: 8,
        marginBottom: 16, 
    padding: 16,
    },

    lastInput: {
        height: 50,
        backgroundColor: "#F6F6F6",
        width: "100%",
        borderWidth: 1, 
    borderColor: "#E8E8E8",
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
    },
    btnContainer: {
        marginBottom: 78,
     }   
})