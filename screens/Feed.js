import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View } from "react-native";
import { FlatList, Text } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
       seeFeed(offset: $offset){
        ...PhotoFragment

        user{
            id
            username
            avatar
        }
        caption

        createdAt
        isMine
        }
    }
    ${PHOTO_FRAGMENT}

`;

export default function Feed({ navigation }) {
    const { data = {} , loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
        variables: {
            offset: 0,
        },
    });
    //console.log(data);
    //console.log(JSON.stringify(error, null, 2));
    const renderPhoto = ({item: photo}) => {
        return(
            <Photo {...photo} />
        );
    };

    const refresh = async() => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const [refreshing, setRefreshing] = useState(false);
    return(
        <ScreenLayout loading={loading}>
            <FlatList 
                onEndReachedThreshold={0.05}
                onEndReached={()=> 
                    fetchMore({
                        variables: {
                            offset: data?.seeFeed?.length,
                        },
                })}
                refreshing={refreshing}
                onRefresh={refresh}
                style={{ width:"100%" }}
                data={data?.seeFeed}
                keyExtractor={photo => ""+photo.id}
                renderItem={renderPhoto}
            />
        </ScreenLayout>
    );
};