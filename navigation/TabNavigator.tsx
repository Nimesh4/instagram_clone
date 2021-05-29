
import React from 'react'
import { Platform } from 'react-native';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

//Local Screen Import..
import HomeScreen from '../screens/TabScreens/HomeScreen'
import PostScreen from '../screens/TabScreens/PostScreen'
import SearchScreen from '../screens/TabScreens/SearchScreen'
import NotificationsScreen from '../screens/TabScreens/NotificationsScreen'
import ProfileScreen from '../screens/TabScreens/ProfileScreen'
import { Icon } from 'react-native-elements';



const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
         barStyle={ (Platform.OS == 'ios')?
         { backgroundColor:'#000000' , height:53,bottom:10 }
         :
         { backgroundColor:'#000000', height:53 } }
        >
            <Tab.Screen name="Home" component={HomeScreen}
             options={({ route }) => ({
                 tabBarIcon: ({color, }) => (
                    <AntDesign name='home' color={color} size={26} />
                 )
             }) }
            />

            <Tab.Screen name="Search" component={SearchScreen}
             options={({ route }) => ({
                 tabBarIcon: ({color, }) => (
                     <Ionicons name='search' color={color} size={25} />
                 )
             })}
            />

            <Tab.Screen name="Post" component={PostScreen}
             options={({ route }) => ({
                 tabBarIcon: ({color, }) => (
                    <AntDesign name='plussquare' color={color} size={24}  />
                 )
             })}
            />

            <Tab.Screen name="Notifications" component={NotificationsScreen}
             options={({ route }) => ({
                 
                 tabBarIcon: ({color, }) => (
                    <FontAwesome name='heart' color={color} size={24}/>
                 ),
                 
             }) }
            />

            <Tab.Screen name="Profile" component={ProfileScreen}
             options={({ route }) => ({
                 
                 tabBarIcon: ({color, }) => (
                    <Ionicons name='person-sharp' color={color} size={25} />
                 )
             })}
             />
        </Tab.Navigator>
    );
}
