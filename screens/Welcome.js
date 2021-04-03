import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from 'styled-components/native'
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";


const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 800;
    margin-top: 20px;
`;

export default function Welcome({navigation}) {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogIn = () => navigation.navigate("LogIn");

    return(
        <AuthLayout>

            <AuthButton text="Create New Account" disabled={false} onPress={goToCreateAccount}>
            </AuthButton>

            <TouchableOpacity onPress={goToLogIn}>
               <LoginLink>Log in</LoginLink>
            </TouchableOpacity>
    
        </AuthLayout>
    );
}