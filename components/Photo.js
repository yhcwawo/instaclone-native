import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons';
import { gql, useMutation } from "@apollo/client";
import { logUserOut } from "../apollo";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!){
        toggleLike(id: $id){
            ok 
            error
        }
    }
`;


const Container = styled.View`
    border: 1px solid ;
`;
const Header = styled.TouchableOpacity`
    padding: 10px;
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image`
    margin-right: 10px;
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
`;
const Username = styled.Text`
    color: black;
    font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
    flex-direction : row;
    align-items: center;
`;
const Action = styled.TouchableOpacity`
    margin-right: 10px;
`;
const Caption = styled.View`
    flex-direction: row;
`;
const CaptionText = styled.Text`
    color:black;
    margin-left: 5px;
`;
const Likes = styled.Text`
    color:black;
    margin: 7px 0px;
    font-weight: 600;
`;

const ExtraContainer = styled.View`
    padding: 10px;
`;

function Photo({
    id,
    user,
    caption,
    file,
    isLike,
    likes,
    comments,
    // fullView
    }){

    const navigation = useNavigation();
    const {width , height} = useWindowDimensions();
    const [imageHeight, setImageHeight] =  useState(height -300);

    useEffect(()=> {
        Image.getSize(file, (width, height) => {
            setImageHeight(height/2);
        });
    }, [file]);

    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: {ok},
            },
        } = result;

        if(ok){
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLike(prev){
                        return !prev;
                    },
                    likes(prev){
                        if(isLike) {
                            return prev - 1;
                        }
                        return prev + 1;
                    },
                },
            });
        }
    };

    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        update: updateToggleLike,
    });

    const goToProfile = () => {
        navigation.navigate("Profile", {
            username: user.username,
            id: user.id,
        })
    }

    return (
        <Container>
            <Header onPress={goToProfile}>
                <UserAvatar 
                    resizeMode="cover"
                    source={{uri : user.avatar}}
                />
                <Username>{user.username}</Username>
            </Header>
            <File 
                resizeMode="cover"
                style={{
                    width: width,
                    height: imageHeight,
                }}
                source={{uri : file}}
            />

            <ExtraContainer>
            <Actions>
                <Action onPress={toggleLikeMutation} >
                    <Ionicons name={isLike ? "heart" : "heart-outline"}  
                            color={isLike ? "tomato" : "black"}  
                            size={22} 
                    />
                </Action>
                    
                  {/* navigation.navigate("Comments")  */}
                <Action onPress={()=> logUserOut()}>
                    <Ionicons name="chatbubble-outline" color="black"  size={22} />
                </Action>
            </Actions>

            <TouchableOpacity onPress={()=> navigation.navigate("Likes",{
                        photoId: id,
                    })
                }
            >
                <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
            </TouchableOpacity>

            <Caption>

                <TouchableOpacity onPress={goToProfile}>
                <Username>{user.username}</Username>
                </TouchableOpacity>

                <CaptionText>{caption}</CaptionText>

            </Caption>
            </ExtraContainer>

        </Container>
    );


}



Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLike: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
  //  comments: PropTypes.number.isRequired,
};

export default Photo;