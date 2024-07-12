import React, { useEffect, useState, useContext } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Categories from '../screens/Categories';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsDetails from '../components/NewsDetails';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Account from '../screens/Account';
import BookmarkDetails from '../screens/BookmarkDetails';
import Trending from '../screens/Trending';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export const navigationRef = React.createRef();


function DashboardTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarInactiveTintColor: 'rgba(0,0,0,0.47)',
                tabBarLabelStyle: [
                    {
                        fontSize: 14,
                        fontWeight: 'bold',
                    }
                ],
                tabBarStyle: [
                    {
                        display: "flex",
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor: 'white',
                        borderTopColor:'white',
                        height:54
                    },
                    null

                ],
            })}
        >
             <Tab.Screen name="Categories" component={Categories} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return focused ? <Ionicons name={'search'} size={24} color={'black'} /> : <Ionicons name={'search'} size={24} color={'grey'} />
                }
            }} />
            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? <AntDesign name={'home'} size={24} color={'black'} /> : <AntDesign name={'home'} size={24} color={'grey'} />
                    }
                }} />
             <Tab.Screen name="Account" component={Account} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return focused ? <AntDesign name={'user'} size={24} color={'black'} /> : <AntDesign name={'user'} size={24} color={'grey'} />
                }
            }} />
        </Tab.Navigator>
    );
}


const Routes = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={DashboardTabs} options={{ headerShown: false, animation: 'slide_from_right' }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'slide_from_right' }} />
                <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false, animation: 'slide_from_left' }} />
                <Stack.Screen name="NewsDetails" component={NewsDetails} options={{ headerShown: false }} />
                <Stack.Screen name="BookmarkDetails" component={BookmarkDetails} options={{ headerShown: false }} />
                <Stack.Screen name="Trending" component={Trending} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes