import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./StackNavFactory";
import useMe from "../hooks/useMe";
import { Image } from "react-native";

const Tabs = createBottomTabNavigator();

export default function TabsNav(){
    const { data = {} } = useMe();
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: "black",
                showLabel: false,
                style:  {
                    backgroundColor: "white",
                    borderTopColor: "rgba(255,255,255,0.3)",
                },
                // tabStyle: {
                //     backgroundColor: "red",
                //     marginBottom: 10,
                // }
            }}
        >
            <Tabs.Screen 
                name="Feed" 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    ),
                }} 
            >
                {() => <StackNavFactory screenName="Feed" />}
            </Tabs.Screen>
            <Tabs.Screen name="Search"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"search"} color={color} focused={focused} />
                    ),
                }} 
                
            >
                {() => <StackNavFactory screenName="Search" />}

            </Tabs.Screen>
            <Tabs.Screen 
                name="Camera" 
                component={View}
                listeners={({navigation}) => {
                    return {
                        tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate("UploadNav");
                        },
                    };
                }} 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"camera"} color={color} focused={focused} />
                    ),
                }} 
             />
            <Tabs.Screen name="Notifications" 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"heart"} color={color} focused={focused} />
                    ),
                }}            
            >
                {() => <StackNavFactory screenName="Notifications" />}

            </Tabs.Screen>
            <Tabs.Screen name="Me" 
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        data?.me?.avatar ? (
                            <Image source={{uri:data.me.avatar}} style={{
                                width:20,
                                height: 20,
                                borderRadius: 10,
                                ...(focused && {borderColor: "white", borderWidth: 1}),
                            }} />
                        ) : <TabIcon iconName={"person"} color={color} focused={focused} />
                    ),
                }}            
            >
                {() => <StackNavFactory screenName="Me" />}
            </Tabs.Screen>
        </Tabs.Navigator>

    );
};