import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_PHOTO } from "../fragments";

const UPLOAD_PHOTO_MUTATION = gql`
    mutation uploadPhoto($file: Upload!, $caption: String){
        uploadPhoto(file: $file, caption: $caption) 
        {
            ...FeedPhoto
        }
    }
    ${FEED_PHOTO}
`;

const Container = styled.View`
    flex:1;
    background-color:white;
    padding: 0px 50px;
`;

const Photo = styled.Image`
    height: 300px;
`;

const CaptionContainer = styled.View`
    margin-top: 30px;
`;

const Caption = styled.TextInput`
    background-color : white;
    color: black;
    font-weight: 600;
    padding : 10px 20px;
    border-radius: 80px;
`;

const CloseBtn = styled.TouchableOpacity`

`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: 600;
    margin-right: 7px;
`;


export default function UploadForm({navigation, route}) {
    const { register ,handleSubmit, setValue } = useForm();
    const [uploadMutation, {loading}] = useMutation(UPLOAD_PHOTO_MUTATION);
    const updateUploadPhoto = (cache, result) => {
        const {data : {uploadPhoto} } = result;
        if(uploadPhoto.id){
            cache.modify({
                id: "ROOT_QUERY",
                fields: {
                    seeFeed(prev){
                        return [uploadPhoto, ...prev];
                    }
                }
            });
            navigation.navigate("Tabs");
        }
    };

    const HeaderRight = () => (
        <TouchableOpacity 
            onPress={handleSubmit(onValid)} 
        >
            <HeaderRightText>Upload</HeaderRightText>
        </TouchableOpacity>

    );

    const HeaderRightLoading = () => (
        <ActivityIndicator 
            size="small" 
            color="white"
            style={{
                marginRight:10
            }}
        
        />
    ); 

    useEffect(() => {
        navigation.setOptions({
            headerRight: loading ? HeaderRightLoading: HeaderRight,
            ...(loading && {headerLeft: ()=> null}),
        })
    },[loading]);

    useEffect(() => {
        register("caption")
    }, [register]);

    const onValid = ({caption}) => {
        const file = new ReactNativeFile({
            uri: route?.params?.file,
            name: `1.jpg`,
            type: "image/jpeg",
        })

        uploadMutation({
            variables: {
                caption: caption,
                file: file
            }
        })
    };


    return(
        <DismissKeyboard>
            <Container>
                <Photo 
                    source={{uri:route?.params?.file}} 
                    resizeMod="contain"
                />
                    <CaptionContainer>
                        <Caption 
                            returnKeyType="done"
                            placeholder="Write a caption...."
                            placeholderTextColor="rgba(0, 0, 0, 0.5)"
                            onChangeText={text => setValue("caption", text)}
                            onSubmitEditing={handleSubmit(onValid)}
                        />
                    </CaptionContainer>
            </Container>
        </DismissKeyboard>
    );
};