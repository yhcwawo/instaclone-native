import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";



const Button = styled.TouchableOpacity`
    background-color: #487eb0;
    padding: 15px 10px;
    margin-top: 20px;
    borderRadius: 5px;
    width: 100%;
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText =  styled.Text`
    color: black;
    font-weight: 600;
    text-align: center;
`;



export default function AuthButton({onPress, disabled, text, loading}) {

    return(

            <Button disabled={disabled} onPress={onPress}>
                {loading ? (
                <ActivityIndicator color="white" /> 
                ) : (
                <ButtonText>{text}</ButtonText>
                )}
            </Button>

    );
}