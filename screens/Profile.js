import React, { useEffect } from "react";
import { Text, View } from "react-native";



export default function Profile( { navigation, route } ) {
    
    useEffect(() => {
        if(route?.params?.username){
            navigation.setOptions({
                title: route.params.username,
                headerTitleAlign: "center",
            });
        }
        
    }, []);

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
               Someone's Profile (Click event)
            </Text>
        </View>
    );
};