import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from "react-native";
import TakePhoto from "../screens/TakePhoto";
import SelectPhoto from "../screens/SelectPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav(){
    return (
        <Tab.Navigator 
            tabBarPosition="bottom"
            tabBarOptions={{
                style: {
                    backgroundColor:"white",
                },
                activeTintColor: "black",
                indicatorStyle: {
                    backgroundColor: "red",
                    top: 0,
                },
            }}
        > 
            
            <Tab.Screen name="Select" >
                {() => (
                <Stack.Navigator
                    screenOptions={{
                        headerTintColor: "black",
                        headerBackTitleVisible: false,
                        headerBackImage: ({tintColor}) => (
                            <Ionicons color={tintColor} name="close" size={28} />
                        ),
                        headerStyle: {
                            backgroundColor: "white",
                            shadowOpacity: 0.3,
                        }
                    }}
                >
                    <Stack.Screen 
                        name="Select" 
                        options={{title:"Choose a photo"}}
                        component={SelectPhoto}
                    />
                </Stack.Navigator>
                )}

            </Tab.Screen>

            <Tab.Screen name="Take" component={TakePhoto} />
        </Tab.Navigator>
    );o
};