import { useNavigation } from "@react-navigation/native"
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

const Column = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const UserAvatar = styled.Image`
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 25px;
`;
const Username = styled.Text`
    color: black;
    font-weight: 600;
`;

const Wrapper =  styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 15px;
`;

const FollowBtn =  styled.TouchableOpacity`
    background-color: ${colors.blue};
    justify-content: center;
    padding: 5px 10px;
    border-radius: 4px;
`;

const FollowBtnText =  styled.Text`
    color: black;
    font-weight: 600;
`;


export default function UserRow({
    id,
    avatar,
    username,
    isFollowing,
    isMe,
    }){

    const navigation = useNavigation();

    return (
        <Wrapper>

            <Column onPress={()=> navigation.navigate("Profile",{
                id,
                username,
            })}>
                <UserAvatar source={{uri :  avatar}} />
                <Username>{username}</Username>
            </Column>
            {!isMe ? (
                    <FollowBtn>
                        <FollowBtnText>{isFollowing ? "Unfollow" : "Follow" }</FollowBtnText>
                    </FollowBtn>
            ) : null }
        </Wrapper>
    );
}
