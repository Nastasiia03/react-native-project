import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function RegistrationScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

 const nameHandler = (text) => setName(text);
const emailHandler = (text) => setEmail(text);
const passwordHandler = (text) => setPassword(text);
    
    return (
    <View>
        <h2>Реєстрація</h2>
            <TextInput value={name} placeholder="Логін"/>
            <TextInput value={email} placeholder="Адреса електронної пошти"/>
            <TextInput value={password} placeholder="Пароль" />
            <Button title={"Зареєструватися"} />
            <Text>Вже маєте акаунт? Увійти</Text>
    </View>)
}