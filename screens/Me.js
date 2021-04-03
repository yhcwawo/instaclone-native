import React, { useEffect } from "react";
import { Text, View } from "react-native";
import useMe from "../hooks/useMe";


export default function Me({navigation}) {
    const {data, error} = useMe();
    useEffect(()=>{
        navigation.setOptions({
            title: data?.me?.username,
            headerTitleAlign: "center",
        });
    }, []);

    //console.log(data);


    return(
        <View
            style={{
                backgroundColor: "white",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{
                color: "black"
            }}
            >
                My Profile Page
            </Text>
        </View>
    );
};