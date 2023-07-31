import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, } from "react-native";
import { format } from "date-fns";
import { en } from "date-fns/locale";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { doc, collection, addDoc, getDocs, onSnapshot,query, where} from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';

const formatDate = (date) => {
  return format(Date.parse(date), "dd MMMM, yyyy | HH:mm:ss", {
    locale: en,
  });
};

export default function CommentsScreen({route, navigation}) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { postId, image } = route.params;
  const { nickname, stateChange, photo} = useSelector(state => state.auth);
  const [commentsCount, setCommentsCount] = useState(0);

  let unsubscribeListener;
  
useEffect(() => {
  if(stateChange) {
  getAllComments();
};

return () => {
  if (unsubscribeListener) {
      unsubscribeListener();
  }

}}, [stateChange]);

useEffect(() => {
  navigation.setParams({ commentsCount: commentsCount });
}, [commentsCount]);

  const createComment = async () => {
  const docRef = await doc(db, "posts", postId);

    await addDoc(collection(docRef, "comments"), {
      comment,
      nickname,
      postedDate: formatDate(new Date())
    });

    setComment("");
  };

  const fetchAvatarForNickname = async (nickname) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const userDocs = await getDocs(q);

  if (!userDocs.empty) {
    const userData = userDocs.docs[0].data();
    const avatar = userData.photo;

    if (typeof avatar === "string" && avatar !== "") {
      console.log(`Avatar URL found for ${nickname}: ${avatar}`);
      return avatar;
    } else {
      console.log(`Invalid or empty avatar URL for ${nickname}`);
      return null;
    }
  } else {
    console.log(`User data not found for ${nickname}`);
    return null;
  }
};


  const getAllComments = async () => {
    const docRef = await doc(db, "posts", postId);

    unsubscribeListener = await onSnapshot(collection(docRef, "comments"), async (data) => {
      const commentsData = await Promise.all(
        data.docs.map(async (doc) => {
          const commentData = doc.data();
          const avatar = await fetchAvatarForNickname(commentData.nickname);
          return { ...commentData, id: doc.id, avatar };
        })
      );
      setAllComments(commentsData);
    });

    

      setCommentsCount(Number(allComments.length));
  };

  const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
    };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
   <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image source={{ uri: image }} style={styles.photo} />
            {!keyboardVisible &&  <FlatList style={styles.commentsList}
                data={allComments}
                renderItem={({ item }) => (
                  (
                    <View style={styles.wrapperComment}>
                      <Image style={styles.avatar} source={{uri: item.avatar}}/>
                      <View style={styles.commentContainer}>
                        <Text style={styles.userName}>{item.nickname}</Text>
                        <Text style={styles.userComment}>{item.comment}</Text>
                        <Text style={styles.postedDate}>{item.postedDate}</Text>
                      </View>
                    </View>
                  )
                )}
                keyExtractor={(item) => item.id}
              />
                      }
            
      <View style={styles.formInput}><TextInput style={styles.textInput} onChangeText={setComment} placeholder="Коментувати..." onFocus={() => setKeyboardVisible(true)} onSubmitEditing={() => setKeyboardVisible(false)}/>
      <TouchableOpacity  style={styles.activeBtn} onPress={createComment}><AntDesign name="arrowup" size={20} color="#fff" /></TouchableOpacity>
      </View>
            </KeyboardAvoidingView>
    </View >
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "white",
        paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    alignItems: "center",
  },
  area: {
    flex: 1,
},
form: {
  flex: 1,
  backgroundColor: "white",
  width: "100%",
  paddingLeft: 16,
  paddingRight: 16,
  alignItems: "center",
  marginBottom: 10,
},

  wrapperComment: {
    display: "flex",
    flexDirection: "row",
  },
  commentContainer: {
    padding: 14,
    marginBottom: 24,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, 0.03)",
    width: 290,
  },
  userName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#BDBDBD",
  },
  userComment: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
      activeBtn: {
display: "flex",
width: 34,
height: 34,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00", 
  },
      activeBtnText: {
color: "rgba(255, 255, 255, 1)",
fontFamily: "Roboto",
fontSize: 16,
  },
      formInput: {
        width: 343,
        height: 50,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
marginBottom: 20,
backgroundColor: "#F6F6F6",
borderRadius: 100,
paddingLeft: 16,
paddingRight: 8,
    },
    textInput: {
fontSize: 16,
    },
    photo: {
      width: 343,
      height: 240,
      borderRadius: 8,
marginBottom: 32,
  },
  commentsList: {
    marginBottom: 31
  },
  postedDate: {
    fontFamily: "Roboto",
    fontSize: 10,
    lineHeight: 11.72,
    color: "#BDBDBD",
    textAlign: "right",
  },
   avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 10,
  },
});
