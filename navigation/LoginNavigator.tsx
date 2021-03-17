import React, {Component} from 'react'
import { AppLoading } from 'expo'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import Login from '../screens/AuthScreens/Login'
import Signup from '../screens/AuthScreens/Signup'
import { useFonts } from '@use-expo/font'


const Stack = createStackNavigator();

const LoginNavigation = () => {

    const [fontsLoaded] = useFonts({

        'logo-font': require('../assets/fonts/Handlee-Regular.ttf')
    });

    if (!fontsLoaded) {
        return <View />;
    }else{

        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login"  component={Login} options={{headerShown:false, title:"Login"}} />
                    <Stack.Screen name="Signup" component={Signup} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default LoginNavigation

const styles = StyleSheet.create({})
