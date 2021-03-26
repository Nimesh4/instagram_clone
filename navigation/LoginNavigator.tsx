import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import { useFonts } from '@use-expo/font'

import Login from '../screens/AuthScreens/Login'
import Signup from '../screens/AuthScreens/Signup'
import Welcome from '../screens/AuthScreens/Welcome'
import StackNavigator from './StackNavigator'


const Stack = createStackNavigator();

export default function App()  {

    const [fontsLoaded] = useFonts({

        'logo-font': require('../assets/fonts/Handlee-Regular.ttf')
    });

    if (!fontsLoaded) {
        return <View />;
    }else{

        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false, title:"Welcome"}} />
                    <Stack.Screen name="Login"  component={Login} options={{headerShown:false, title:"Login"}} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="StackNavigator" component={StackNavigator} options={{}} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}



const styles = StyleSheet.create({})
