import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from '../router';
import { authStateChangeUser } from "../redux/auth/authOperations";

export default function Main() {
    const {stateChange} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    console.log(stateChange);

    useEffect(() => {
        dispatch(authStateChangeUser());
    }, []);

    const routing = useRoute(stateChange);

    
    
   return <NavigationContainer>
      {routing}
      </NavigationContainer> 
} 