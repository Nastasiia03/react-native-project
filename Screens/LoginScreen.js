import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

const emailHandler = (text) => setEmail(text);
const passwordHandler = (text) => setPassword(text);

    const onLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`)
}
    
    return (
    <View style={styles.container}>
        <Text>Увійти</Text>
            <TextInput value={email} placeholder="Адреса електронної пошти" onChangeText={emailHandler}/>
            <TextInput value={password} placeholder="Пароль" onChangeText={passwordHandler}/>
            <Button title={"Увійти"} onPress={onLogin}/>
            <Text>Не маєте акаунта? Зареєструватися</Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
})