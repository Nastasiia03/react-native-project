import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { doc, collection, addDoc, getDocs, onSnapshot,} from "firebase/firestore";

export default function CommentsScreen({route}) {
  const [comment, setComment] = useState("");
  const { postId } = route.params;
  const { nickname } = useSelector(state => state.auth);
  
  const createComment = async () => {
  const docRef = await doc(db, "posts", postId);

    await addDoc(collection(docRef, "comments"), {
      comment,
      nickname,
    });

    setComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formInput}><TextInput onChangeText={setComment} placeholder="Коментар..."/></View>
            <TouchableOpacity  style={styles.activeBtn} onPress={createComment}><Text style={styles.activeBtnText}>Залишити коментар</Text></TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "white",
        paddingTop: 32, 
        paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "flex-end",
    alignItems: "center",
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
      activeBtnText: {
color: "rgba(255, 255, 255, 1)",
fontFamily: "Roboto",
fontSize: 16,
  },
      formInput: {
        width: 343,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(232, 232, 232, 1)",
        flexDirection: "row",
        alignItems: "center",
marginBottom: 20,
    },
});
