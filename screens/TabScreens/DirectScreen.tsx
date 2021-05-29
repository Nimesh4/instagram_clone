import React, { Component } from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'

export default class DirectScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{backgroundColor:'#131212', flex:1}}>
                <StatusBar barStyle="light-content" backgroundColor="#000" />
                <Text style={{color:'white'}}> Direct Screen. </Text>
            </SafeAreaView>
        )
    }
}
