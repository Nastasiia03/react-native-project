import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CreatePostsScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    }, []);
    if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    };

    const takePhoto = async () => {
        if (camera) {
            const { uri } = await camera.takePictureAsync();
            await MediaLibrary.createAssetAsync(uri);
            setPhoto(uri);
        }
    };

    const sendPhoto = () => {
        navigation.navigate("Публікації", {photo}); 
    }


    return <View style={styles.container}>
        <Camera style={styles.imageContainer} ref={setCamera}>
            {/* {photo && <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />
            </View>} */}
            <TouchableOpacity style={styles.iconContainer} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={24} color="rgba(255, 255, 255, 1)" />
            </TouchableOpacity>
        </Camera>
        <View style={styles.imageForm}>
            <Text style={styles.formTitle}>Завантажте фото</Text>
            <View style={styles.inputContainer}><View style={styles.formInput}><TextInput  placeholder="Назва..." /></View>
            <View style={styles.formInput}><SimpleLineIcons name="location-pin" size={24} color="rgba(189, 189, 189, 1)"/><TextInput  placeholder="Місцевість..."/></View></View>
            <TouchableOpacity style={styles.btn} onPress={sendPhoto}><Text style={styles.btnText}>Опублікувати</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deleteBtn}><Feather name="trash-2" size={24} color="rgba(189, 189, 189, 1)" /></TouchableOpacity>
    </View>
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 32, 
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 34,
        
    },
    imageContainer: {
       width: 343,
        height: 240,
        borderRadius: 8, 
        backgroundColor: "rgba(246, 246, 246, 1)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    iconContainer: {
       width: 60,
        height: 60,
        backgroundColor: "rgba(255, 255, 255, 0.30)",
alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    imageForm: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: 120,
    },
    formTitle: {
        color: "#BDBDBD",
fontFamily: "Roboto",
        fontSize: 16,
marginBottom: 32,
    },
    inputContainer: {
marginBottom: 32,
    },

    formInput: {
        width: 343,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(232, 232, 232, 1)",
        flexDirection: "row",
alignItems: "center",
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
    borderRadius: 100,
        backgroundColor: "#F6F6F6",  

    },
    btnText: {
    color: "#BDBDBD",
fontFamily: "Roboto",
fontSize: 16,
    },
    deleteBtn: {
      width: 70,
        height: 40,
        backgroundColor: "rgba(246, 246, 246, 1)",
        borderRadius: 20,
        display: "flex",
        justifyContent: "center", 
        alignItems: "center"
    },
    takePhotoContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        borderColor: "#fff",
        borderWidth: 1, 
    }
})