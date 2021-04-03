import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import { USER_FRAGMENT } from "../fragments";

const LIKES_QUERY = gql`
    query seePhotoLikes($id: Int!){
        seePhotoLikes(id: $id){
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;

export default function Likes({route}) {
    const {data , loading, refetch} = useQuery(LIKES_QUERY, {
        variables: {
            id: route?.params?.photoId
        },
        skip: !route?.params?.photoId
    });


    const renderUser = ({ item: user }) => (
        <UserRow {...user} />
    );

    const refresh = async() => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const [refreshing, setRefreshing] = useState(false);

    return(
        <ScreenLayout loading={loading}>
            <FlatList
                ItemSeparatorComponent={()=> (
                    <View style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}>
                    </View>
                )}
                refreshing={refreshing}
                onRefresh={refresh}
                data={data?.seePhotoLikes}
                keyExtractor={(item) => ""+item.id}
                renderItem={renderUser}
                style={{width:"100%"}}
            />
            
        </ScreenLayout>
    );
};