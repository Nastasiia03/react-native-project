import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Button } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import { db } from "../../firebase/config";
import {collection, onSnapshot, query} from "firebase/firestore";
import { useSelector } from "react-redux";

export default function PostsScreen({route, navigation}) {
    const [posts, setPosts] = useState([]);
    const [commentsCount, setCommentsCount] = useState({});
    const { stateChange, nickname, email, photo } = useSelector(state => state.auth);
    let unsubscribePosts;
    let unsubscribe; 
    
    const getAllPosts = async () => {
        unsubscribePosts = await onSnapshot(collection(db, "posts"), (data) => {
            const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPosts(posts);

            posts.forEach((post) => {
                getCommentsCount(post.id);    
              });
        });
    };

    useEffect(() => {
        if(stateChange) {
       getAllPosts();
    };
    
    return () => {
        if (unsubscribePosts) {
            unsubscribePosts();
          };
      };

}, [stateChange]);

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
        <View style={styles.userContainer}>
            <Image source={photo} style={styles.image}></Image>
            <View style={styles.textContainer}>
            <Text style={styles.userName}>{nickname}</Text>
                <Text style={styles.userEmail}>{email}</Text>    
            </View>    
        </View>
        <View style={styles.postsList}><FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <View style={{ marginBottom: 10 }}>
                <Image source={{ uri: item.photo }} style={styles.photo} />
                <Text style={styles.name}>{item.info.postName}</Text>
            <View style={styles.postsContainer}>
                <View style={styles.infoContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Коментарі", {postId: item.id, photo: item.photo})}><Feather name="message-circle" size={24} style={styles.comment} /></TouchableOpacity>
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
}; 



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 32, 
        paddingLeft: 16,
        paddingRight: 16,
    },
    userContainer: {
    flexDirection: "row", 
        alignItems: 'center',
    marginBottom: 32,
    },
    image: {
        width: 60, 
        height: 60, 
        borderRadius: 16, 
        marginRight: 8
    },
    textContainer: {
        flexDirection: "column",
    },
    userName: {
        fontFamily: "Roboto-Bold",
        fontSize: 13,
    },
    userEmail: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "rgba(33, 33, 33, 0.80)",
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