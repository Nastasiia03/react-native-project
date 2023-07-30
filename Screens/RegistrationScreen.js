import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import PhotoBG from "../assets/images/PhotoBG.png";
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch} from "react-redux";
import {authSignUpUser} from "../redux/auth/authOperations";

const initialState = {
nickname: "",
email: "",
password: "", 
photo: null,
}

export default function RegistrationScreen({navigation}) {
    const [state, setState] = useState(initialState);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();

const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
    };

const handlePhotoSelection = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to access your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.assets.length > 0) {
      setPhoto(result.assets[0]);
    }
  } catch (error) {
    console.log('Error picking image', error);
  }
};

    const clearPhoto = () => {
    setPhoto(null);
    };
    
    const handleSubmit = () => {
    // console.log(state);
        setState(initialState);
        dispatch(authSignUpUser(state));
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
            {photo ? (
            <View style={styles.avatar}>
                <Image source={{ uri: photo.uri }} style={styles.photo} />
                <TouchableOpacity onPress={clearPhoto} style={styles.avatarBtn}><AntDesign name="closecircleo" size={23} style={styles.avatarIcon} /></TouchableOpacity></View>
  ) : (
    <View style={styles.avatar}>
                <TouchableOpacity onPress={handlePhotoSelection} style={styles.avatarBtn}><EvilIcons name="plus" size={29} style={styles.avatarIcon} /></TouchableOpacity></View>
  )}
                <Text style={styles.title}>Реєстрація</Text>
                <View style={styles.input}>
                    <TextInput value={state.nickname} placeholder="Логін" onChangeText={(value)=>setState((prevState) => ({...prevState, nickname: value}))} style={styles.text} onFocus={()=>setKeyboardVisible(true)} onSubmitEditing={() => setKeyboardVisible(false)}/>              
                    </View>
            <View style={styles.input}>
                <TextInput value={state.email} placeholder="Адреса електронної пошти" onChangeText={(value)=>setState((prevState) => ({...prevState, email: value}))} style={styles.text} onFocus={()=>setKeyboardVisible(true)} onSubmitEditing={() => setKeyboardVisible(false)}/>
                </View>
            <View style={{...styles.lastInput, marginBottom: keyboardVisible ? 32 : 43}}>
                <TextInput value={state.password} placeholder="Пароль" onChangeText={(value)=>setState((prevState) => ({...prevState, password: value}))} secureTextEntry={true} style={styles.text} onFocus={()=>setKeyboardVisible(true)} onSubmitEditing={() => setKeyboardVisible(false)}/>
                </View>
                {!keyboardVisible &&
                <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}><Text style={styles.btnText}>Зареєструватися</Text></TouchableOpacity>
            <Text style={styles.confirmation}>Вже маєте акаунт? <Text onPress={()=> navigation.navigate('Login')} style={styles.navigationText}>Увійти</Text></Text></View>}
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
        backgroundColor: "rgba(246, 246, 246, 1)"
    },
    avatarBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        width: 24, 
        height: 24, 
        borderRadius: 50,
        position: "absolute",
        top: 80,
        left: 105,
    },
    avatarIcon: { 
        color: "#FF6C00",
    },
    photo: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
        position: "absolute",
    },
    title: { 
        fontFamily: "Roboto-Medium",
        fontSize: 30,
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
        marginBottom: 78,
    },
       navigationText: {
     textDecorationLine: "underline",
 }
})