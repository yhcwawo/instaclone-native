import React, { useEffect, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import styled from "styled-components/native";
import { FlatList, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../colors";
import { StatusBar } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.View`
    flex:1;
    background-color:white;
`;
const Top = styled.View`
    flex:1;
    background-color:white;
`;
const Bottom = styled.View`
    flex:1;
    background-color:white;
`;

const ImageContainer = styled.TouchableOpacity`

`;

const IoniconsContainer = styled.View`
    position: absolute;
    bottom: 5px;
    right: 0px;
`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: 600;
    margin-right: 7px;
`;

export default function SelectPhoto({navigation}) {
    const [ok , setOk] = useState(false);
    const [photos , setPhotos] = useState([]);
    const [chosenPhoto , setchosenPhoto] = useState("");
    const getPhotos =  async() => {
        const {assets:photos} =  await MediaLibrary.getAssetsAsync();
        setPhotos(photos);
        setchosenPhoto(photos[0]?.uri);
    };

    const getPermissions = async() =>{
        const {granted, canAskAgain} = await MediaLibrary.getPermissionsAsync();

        if(granted === false && canAskAgain){
            const {granted} = await MediaLibrary.requestPermissionsAsync();
            if(granted !== false){
                setOk(true);
                getPhotos();
            } 
        } else if(granted !== false){
            setOk(true);
            getPhotos();
        }

    };

    const HeaderRight = () => (
        <TouchableOpacity onPress={()=> navigation.navigate("UploadForm", {
            file: chosenPhoto,
        }) }>
            <HeaderRightText>NEXT</HeaderRightText>
        </TouchableOpacity>

    );

    useEffect(()=> {
        getPermissions();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRight,
        })
    },[chosenPhoto]);


    const numColumns = 4;
    const {width} = useWindowDimensions();
    const choosePhoto = (uri) => {
        setchosenPhoto(uri);
    };

    const renderItem = ({item:photo}) => (
        <ImageContainer onPress={()=>choosePhoto(photo.uri)}>
            <Image source={{uri: photo.uri}} style={{ width: width/numColumns, height: 100}} />
                <IoniconsContainer>
                    <Ionicons name="checkmark-circle" size={18} color={photo.uri === chosenPhoto ? colors.blue : "white"} />
                </IoniconsContainer>
        </ImageContainer>
    ); 
    return(
            <Container>
                <StatusBar hidden={false} />
                <Top>
                    {chosenPhoto !== "" ? (<Image 
                    source={{uri:chosenPhoto}}
                    style={{ width, height: "100%"}} />
                    ) : null} 

                </Top>
                <Bottom>
                    <FlatList 
                        data={photos}
                        numColumns={numColumns}
                        keyExtractor={(photo)=> photo.id}
                        renderItem={renderItem}
                    /> 
                </Bottom>
            </Container>
    );
};