import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { Keyboard } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import styled from 'styled-components/native'

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #FF7F00;
    padding: 0px 40px;
`;

const Logo = styled.Image`
    max-width: 90%;
    width: 100%;
    height: 90px;
    margin-bottom: 10px;
`;

export default function AuthLayout({children}) {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return(
        <TouchableWithoutFeedback
         style={{
            height: "100%",
         }}
         onPress={dismissKeyboard}
         disabled={Platform.OS === "web"}
        >
            <Container>
                <Logo resizeMode="contain" source={require("../../assets/logo.png")} />
                    {children}
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 0: 50} 
                    styled={{
                        width: "100%",
                    }} 
                />
            </Container>
        </TouchableWithoutFeedback>
    );
}