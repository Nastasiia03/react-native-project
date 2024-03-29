import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, FlatList } from "react-native";
import PhotoBG from "../../assets/images/PhotoBG.png";
import { AntDesign } from '@expo/vector-icons';
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import {collection, onSnapshot, where, query,} from "firebase/firestore";
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';

export default function ProfileScreen({route, navigation}) {
    const [userPosts, setUserPosts] = useState([]);
    const [commentsCount, setCommentsCount] = useState({});
    const { userId, stateChange, nickname, photo } = useSelector(state => state.auth);
    let unsubscribeListener;
    let unsubscribe;

    useEffect(() => {
        if(stateChange) {
        getUserPosts();
    };

        return () => {
            if (unsubscribeListener) {
                unsubscribeListener();
            }

}}, [stateChange]);

useEffect(() => {
    if (route.params?.commentsCount) {
      setCommentsCount((prev) => ({
        ...prev,
        [route.params.postId]: route.params.commentsCount,
      }));
    }
    
    return () => {
        if (unsubscribe) {
            unsubscribe();
          };
      };

  }, [route.params]);

const getUserPosts = async () => {
    const userPostsRef = collection(db, "posts");
    const queryRef = query(userPostsRef, where("userId", "==", userId));
    unsubscribeListener = await onSnapshot(queryRef, (querySnapshot) => {
      const userPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserPosts(userPosts);

      userPosts.forEach((post) => {
        getCommentsCount(post.id);    
      });
    });
}; 

const getCommentsCount = async (postId) => {
    try {
      const commentsRef = collection(db, `posts/${postId}/comments`);
      const queryRef = query(commentsRef);
      unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const commentsCount = querySnapshot.docs.length;
        setCommentsCount((prev) => ({ ...prev, [postId]: commentsCount }));
      });
    //   return () => unsubscribe();
    } catch (error) {
      console.log(error);
      setCommentsCount((prev) => ({ ...prev, [postId]: 0 }));
      return () => {};
    }
  };


    return <View style={styles.container}>
        <ImageBackground source={PhotoBG} resizeMode="cover" style={styles.image}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: photo }} />
                <Text style={styles.userName}>{nickname}</Text>
                <View style={styles.postsList}><FlatList data={userPosts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <View style={{ marginBottom: 10 }}>
                <Image source={{ uri: item.photo }} style={styles.photo} />
                <Text style={styles.name}>{item.info.postName}</Text>
            <View style={styles.postsContainer}>
                <View style={styles.infoContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Коментарі", {postId: item.id, image: item.photo})}><Feather name="message-circle" size={24} style={styles.comment} /></TouchableOpacity>
                <Text style={styles.count}>{commentsCount[item.id] || 0}</Text></View>
                <View style={styles.infoContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Локації", { location: item.location })}><SimpleLineIcons name="location-pin" size={24} style={styles.locationIcon} />
                    </TouchableOpacity>
                <Text style={styles.location}>{item.info.locationName}</Text>
            </View>
            </View>
        </View>} />
            </View>
            </View>
            </ImageBackground>
    </View>
}; 

const styles = StyleSheet.create({
    container: {
       flex: 1,   
    },
      image: {
    flex: 1,
    width: "100%",
    },
    profile: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25,
        paddingTop: 92,
        alignItems: "center",
        marginTop: 147,
    },
    avatar: {
       width: 120,
        height: 120,
        borderRadius: 16,
        position: "absolute",
        top: -60, 
    },
    userName: {
fontFamily: "Roboto-Medium",
fontSize: 30,
        letterSpacing: 0.3,
marginBottom: 33,
    },
    changeBtn: {
        position: "absolute",
        top: 16,
        left: 245,
backgroundColor: "#fff",
        borderRadius: 50,
    },
    postsList: {
        alignItems: "center",
        flex:1,
    },
    photo: {
        width: 343,
        height: 240,
        borderRadius: 8,
marginBottom: 8,
    },
    postsContainer: {
        flex: 1,
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between"
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        marginBottom: 8,
    },
    count: {
        color: "rgba(189, 189, 189, 1)",
        fontSize: 16,
    },
    comment: {
        marginRight: 6,
        color: "rgba(189, 189, 189, 1)",
    },
    locationIcon: {
        marginRight: 4,
        color: "rgba(189, 189, 189, 1)",
    },
    location: {
textAlign: "right",
fontFamily: "Roboto",
fontSize: 16,
        textDecorationLine: "underline",

    }
})