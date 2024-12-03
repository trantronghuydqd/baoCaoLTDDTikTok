import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UploadScreen from "../screens/UploadScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: "Chỉnh sửa hồ sơ" }}
            />
        </Stack.Navigator>
    );
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="MainNavigator" 
                    options={{ headerShown: false }}
                >
                    {() => (
                        <Tab.Navigator
                            screenOptions={{
                                tabBarStyle: { backgroundColor: "black" },
                                tabBarActiveTintColor: "white",
                                tabBarInactiveTintColor: "gray"
                            }}
                        >
                            <Tab.Screen
                                name="Home"
                                component={HomeStackScreen}
                                options={{
                                    headerShown: false,
                                    tabBarIcon: ({ color }) => (
                                        <Ionicons name="home" size={24} color={color} />
                                    ),
                                }}
                            />
                            <Tab.Screen
                                name="Upload"
                                component={UploadScreen}
                                options={{
                                    title: "Đăng tải",
                                    tabBarIcon: ({ color }) => (
                                        <Ionicons name="add-circle" size={24} color={color} />
                                    ),
                                }}
                            />
                            <Tab.Screen
                                name="Profile"
                                component={ProfileStackScreen}
                                options={{
                                    title: "Hồ sơ",
                                    tabBarIcon: ({ color }) => (
                                        <Ionicons name="person" size={24} color={color} />
                                    ),
                                }}
                            />
                        </Tab.Navigator>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}