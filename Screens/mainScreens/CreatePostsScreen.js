import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { storage, db } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
    postName: "",
    locationName: ""
};

export default function CreatePostsScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [info, setInfo] = useState(initialState);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const {userId, nickname } = useSelector((state) => state.auth);

    useEffect(() => {
    const requestCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Camera permission denied");
      } else {
        setHasPermission(status === "granted");
      }
    };

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      const locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
    })();

        requestCameraPermission();
        setIsButtonDisabled(true);
    }, []);


    const takePhoto = async () => {
        try {
            if (camera) {
                const { uri } = await camera.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
                setPhoto(uri);
            
                let locationRef = await Location.getCurrentPositionAsync({});
                console.log(locationRef)
                const coords = {
                    latitude: locationRef.coords.latitude,
                    longitude: locationRef.coords.longitude,
                };

                setLocation(coords);
                setIsButtonDisabled(false);  
            }
        } catch (error) {
      console.log(error);
    }
    };


    const uploadPhotoToServer = async () => {
        const response = await fetch(photo);
        const file = await response.blob();

        const uniquePostId = Date.now().toString();

        const storageRef = ref(storage, `postImage/${uniquePostId}`);

         await uploadBytes(storageRef, file);
        
        const processedPhoto = await getDownloadURL(storageRef);

        return processedPhoto;
    };

    const uploadPostToServer = async () => {
        const photo = await uploadPhotoToServer();
        await addDoc(collection(db, "posts"), { photo, info, location, userId, nickname });
    };

       const sendPhoto = () => {
        navigation.navigate("Публікації", { photo, location, info });
        setInfo(initialState);
           setIsButtonDisabled(true);
           uploadPostToServer();
           console.log(info);
           console.log(location);
    };

    return <View style={styles.container}>
        <View style={styles.cameraWrapper}>
        <Camera style={styles.imageContainer} ref={setCamera}>
            {photo && <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={{ width: 100, height: 100, borderRadius: 8 }} />
            </View>}
            <TouchableOpacity style={styles.iconContainer} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={24} color="rgba(255, 255, 255, 1)" />
            </TouchableOpacity>
            </Camera>
            </View>
        <View style={styles.imageForm}>
            <Text style={styles.formTitle}>Завантажте фото</Text>
            <View style={styles.inputContainer}><View style={styles.formInput}><TextInput value={info.postName} onChangeText={(value)=>setInfo((prevState) => ({...prevState, postName: value}))} placeholder="Назва..." /></View>
            <View style={styles.formInput}><SimpleLineIcons name="location-pin" size={24} color="rgba(189, 189, 189, 1)"/><TextInput value={info.locationName} onChangeText={(value)=>setInfo((prevState) => ({...prevState, locationName: value}))} placeholder="Місцевість..."/></View></View>
            <TouchableOpacity disabled={isButtonDisabled} style={isButtonDisabled ? styles.btn : styles.activeBtn} onPress={sendPhoto}><Text style={isButtonDisabled ? styles.btnText : styles.activeBtnText}>Опублікувати</Text></TouchableOpacity>
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
    cameraWrapper: {
        borderRadius: 8,
         width: 343,
        height: 240,
        marginBottom: 8,
        overflow: "hidden",    
    },
    imageContainer: {
        flex:1,
       width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",      
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
    activeBtn: {
display: "flex",
    width: 343,
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 16,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 100,
        backgroundColor: "#FF6C00", 
    },
    btnText: {
    color: "#BDBDBD",
fontFamily: "Roboto",
fontSize: 16,
    },
    activeBtnText: {
color: "rgba(255, 255, 255, 1)",
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
        borderRadius: 8,
    }
})