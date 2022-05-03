import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FeedScreen from '../main/Feed'
import ProfileScreen from '../main/Profile'
import AddScreen from '../Main/Add'


const Tab = createMaterialBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator initialRouteName="Feed" labeled={false}>
            <Tab.Screen name="Feed" component={FeedScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                ),
            }}
            />
            <Tab.Screen name="Add" component={AddScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                ),
            }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                ),
            }}
            />
        </Tab.Navigator>
        
        )
}