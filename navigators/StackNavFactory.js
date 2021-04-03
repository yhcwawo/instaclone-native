import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import Search from "../screens/Search";
import { Image } from "react-native";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

export default function StackNavFactory({screenName}){

    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
                headerTintColor: "black",
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: "white",
                    shadowColor: "rgba(255,255,255,0.3)",
                },
            }}
    
        >
            {screenName === "Feed" ? (
                <Stack.Screen name={"Feed"} component={Feed} options={{
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Image 
                            style={{
                                maxHeight: 60,
                            }}
                            resizeMode="contain" 
                            source={require("../assets/logo.png")} 
                        /> 
                    ),
                }} />
            ) : null}
            {screenName === "Search" ? (
                <Stack.Screen name={"Search"} component={Search} />
            ) : null}
            {screenName === "Notifications" ? (
                <Stack.Screen name={"Notifications"} component={Notifications} />
            ) : null}
            {screenName === "Me" ? (
                <Stack.Screen name={"Me"} component={Me} />
            ) : null}

            <Stack.Screen
                name="Profile"
                component={Profile}
            />
            <Stack.Screen
                name="Photo"
                component={Photo}
            />
            <Stack.Screen
                name="Likes"
                component={Likes}
            />
            <Stack.Screen
                name="Comments"
                component={Comments}
            />
                


        </Stack.Navigator>
    );
}