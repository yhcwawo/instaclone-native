import { gql, useLazyQuery } from "@apollo/client";
import { printIntrospectionSchema } from "graphql";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Image } from "react-native";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { Text, View, TextInput } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_PHOTOS = gql`
    query searchPhotos($keyword: String!){
        searchPhotos(keyword: $keyword){
            id
            file
            caption
        }
    }
`;

const MessageContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex:1;
`;
const MessageText = styled.Text`
    margin-top: 15px;
    color: black;
    font-weight: 600;
`;

const Input = styled.TextInput`
    background-color: rgba(255,255,255, 1);
    width: ${(props) => props.width / 1.5}px;
    color: black;
    padding: 5px 10px;
    border-radius: 7px;
`;

export default function Search({navigation}) {
    const numColumns = 4;
    const {width} = useWindowDimensions();
    const {setValue, register, watch, handleSubmit} = useForm()
    const [startQueryFn, {loading, data = {}, called}] =  useLazyQuery(SEARCH_PHOTOS);

    const onValid = ({keyword}) => {
        startQueryFn({
            variables: {
                keyword,
            },
        })
    };
    const SearchBox = () => (
        <Input 
            width={width}
            placeholder="결혼식을 검색해보세요."
            placeholderTextColor="rgba(0,0,0,0.8)"
            autoCapitalize="none"
            returnKeyLabel="Search"
            returnKeyType="search"
            autoCorrect={false}
            onChangeText={(text)=> setValue("keyword", text)}
            onSubmitEditing={handleSubmit(onValid)}
        />
    );


    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
            headerTitleAlign: "center",
        });
        register("keyword", {
            required: true,
            minLength: 2,
        });
    } , []);

    const renderItem = ({ item: photo }) => (
        <TouchableOpacity onPress={()=> navigation.navigate("Photo",{
            photoId: photo.id,
        })}>
            <Image source={{uri: photo.file}} style={{ 
                width: width / numColumns, height: 100
            }} />
        </TouchableOpacity>
    );

    return(
        <DismissKeyboard>
            <View style={{
                flex : 1,
                backgroundColor: "white",
            }}>
            {loading ? (
                <MessageContainer>
                    <ActivityIndicator size="large" color="black" />
                    <MessageText>Searching...</MessageText>
                </MessageContainer>
            ) : null }
            {!called ? (
                <MessageContainer>
                    <MessageText>Search by keyword</MessageText>
                </MessageContainer>
            ) : null }
            {data?.searchPhotos !== undefined ? (
                data?.searchPhotos.length === 0 ? (
                    <MessageContainer>
                        <MessageText>Could not find anything</MessageText>
                    </MessageContainer>
                ) : <FlatList 
                    numColumns={numColumns}
                    data={data?.searchPhotos}
                    keyExtractor={photo => ""+photo.id}
                    renderItem={renderItem}
                /> 
            ) : null}
            </View>
        </DismissKeyboard>

    );
};