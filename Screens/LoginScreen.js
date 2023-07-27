import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, 
Keyboard } from "react-native";
import PhotoBG from "../assets/images/PhotoBG.png";
import { authSignInUser } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialState = {
    email: "",
   password: "" 
}

export default function LoginScreen({navigation}) {
    const [state, setState] = useState(initialState);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const dispatch = useDispatch();
    
const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
    };
    
const handleSubmit = () => {
    // console.log(state);
    setState(initialState);
    dispatch(authSignInUser(state));
    };


    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
        <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={styles.area}>
        <View style={styles.form}>
        <Text style={styles.title}>Увійти</Text>
       
        <View style={styles.input}><TextInput value={state.email} placeholder="Адреса електронної пошти" onChangeText={(value)=>setState((prevState) => ({...prevState, email: value}))} style={styles.text} onFocus={()=>setKeyboardVisible(true)}  onSubmitEditing={() => setKeyboardVisible(false)}/></View>
        <View style={{...styles.lastInput, marginBottom: keyboardVisible ? 32 : 43}}><TextInput value={state.password} placeholder="Пароль" onChangeText={(value)=>setState((prevState) => ({...prevState, password: value}))} style={styles.text} onFocus={()=>setKeyboardVisible(true)}  onSubmitEditing={() => setKeyboardVisible(false)}/></View>
      {!keyboardVisible && 
    <View style={styles.btnContainer}><TouchableOpacity style={styles.btn} onPress={handleSubmit}><Text style={styles.btnText}>Увійти</Text></TouchableOpacity>
            <Text style={styles.confirmation}>Не маєте акаунта? <Text onPress={()=> navigation.navigate('Registration')} style={styles.navigationText}>Зареєструватися</Text></Text></View>}
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
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
},
    title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
marginBottom: 33,
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
    padding: 16,
    
}, 
text: {
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
fontSize: 16,
}, 
confirmation: {
    color: "#1B4371",
textAlign: "center",
fontSize: 16,
    },
 btnContainer: {
    marginBottom: 144,
    },
    navigationText: {
     textDecorationLine: "underline",
 }
})