import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import { StatusBar, Image, Text, Alert } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Touchable } from "react-native";
import { useIsFocused } from "@react-navigation/core";


const Container = styled.View`
    flex:1;
    background-color:black;
`;
const Actions = styled.View`
    flex: 0.35;
    padding: 0px 50px;
    align-items: center;
    justify-content: space-around;
`;

const ButtonsContainer = styled.View`
    width: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius:50px;
`;

const SliderContainer = styled.View`

`;
const ActionsContainer = styled.View`
    flex-direction: row;
    padding: 30px;
`;
const CloseBtn = styled.TouchableOpacity`
    position: absolute;
    top: 20px;
    left: 20px;
`;

const PhotoAction = styled.TouchableOpacity`
    background-color: white;
    padding: 5px 10px;
    border-radius: 4px;
`;
const PhotoActionText = styled.Text`
    font-weight: 600;
`;


export default function TakePhoto({navigation}) {
    const camera = useRef();
    const [cameraReady, setCameraReady] = useState(false);
    const [takenPhoto, setTakenPhoto] = useState("");
    const [ok, setOk] = useState(false);
    const [zoom, setZoom] = useState(0);
    const [flashMode, setflashMode] = useState(Camera.Constants.FlashMode.off);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const getPermissions = async() => {
        const {granted} = await Camera.requestPermissionsAsync();
        setOk(granted);
    };

    useEffect(() => {
        getPermissions();
    }, [] );

    const onCameraSwitch = () => {
        if(cameraType === Camera.Constants.Type.front){
            setCameraType(Camera.Constants.Type.back);
        } else {
            setCameraType(Camera.Constants.Type.front);
        }
    };

    const onZoomValueChange = (e) => {
        setZoom(e);
    };

    const onFlashChange = (e) => {
        if(flashMode === Camera.Constants.FlashMode.off){
            setflashMode(Camera.Constants.FlashMode.on);
        } else if(flashMode === Camera.Constants.FlashMode.on){
            setflashMode(Camera.Constants.FlashMode.auto);
        } else if(flashMode === Camera.Constants.FlashMode.auto){
            setflashMode(Camera.Constants.FlashMode.off);
        }
        
    };
    
    const goToUpload = async(save) => {
        if(save){
            await MediaLibrary.saveToLibraryAsync(takenPhoto);
        }
        navigation.navigate("UploadForm", {
            file: takenPhoto,
        });

    };
    const onUpload = () => {
        Alert.alert("Save Photo?", "Save photo & Upload or just upload" , [
            {
                text: "Save & Upload",
                onPress: () => goToUpload(true),
            },
            {
                text: "Just Upload",
                onPress: () => goToUpload(false),
            },
        ]);
    };
    const onCameraReady = () => setCameraReady(true);
    const takePhoto =  async() => {
        if(camera.current && cameraReady){
            const {uri} = await camera.current.takePictureAsync({
                quality:1,
                exif:true
            });
            setTakenPhoto(uri);
            
            
        }
    };

    const onDismiss = () => setTakenPhoto("");
    const isFocused = useIsFocused();
    return(
        <Container>
            {isFocused ? <StatusBar hidden={true} /> : null}
            {takenPhoto ==="" ? (
                <Camera 
                    style={{flex:1, marginRight: 3}}
                    type={cameraType}
                    zoom={zoom}
                    flashMode={flashMode}
                    ref={camera}
                    onCameraReady={onCameraReady}
                >
                    <CloseBtn onPress={()=> navigation.navigate("Tabs")}>
                        <Ionicons color="white" size={30} name="close" />
                    </CloseBtn>
                </Camera>
            ) : (
                <Image source={{uri:takenPhoto}} style={{flex:1}} />
            )}

            {takenPhoto === "" ? (
            <Actions>
            <SliderContainer>
                <Slider 
                    style={{width: 200, height: 20}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="rgba(255,255,255,0.5)"
                    onValueChange={onZoomValueChange}
                />
            </SliderContainer>

            <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
                <TouchableOpacity onPress={onFlashChange}>
                <Ionicons 
                        size={28}
                        color="white" 
                        name={flashMode === Camera.Constants.FlashMode.off ? "flash-off" 
                        : flashMode === Camera.Constants.FlashMode.on ? "flash" 
                        : flashMode === Camera.Constants.FlashMode.auto ? "eye" 
                        : ""}  
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons 
                        size={28}
                        color="white" 
                        name={cameraType === Camera.Constants.Type.front ? "camera-reverse" : "camera"} 
                    />
                </TouchableOpacity>
                
            </ActionsContainer>
            </ButtonsContainer>
    
            
        </Actions>
            ) : (
                //after takenPhoto
                <Actions>
                    <PhotoAction onPress={onDismiss}>
                        <PhotoActionText>Dismiss</PhotoActionText>
                    </PhotoAction>
                    <PhotoAction onPress={onUpload}>
                        <PhotoActionText>Upload</PhotoActionText>
                    </PhotoAction>
                    <PhotoAction>
                        <PhotoActionText>Save & Upload</PhotoActionText>
                    </PhotoAction>
                </Actions>
            )}

        </Container>
    );
};