import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class NotificationsScreen extends Component {
    render() {
        return (
            <View style={{alignItems:'center', flex:1, padding:25, justifyContent:'center'}}>
                <Text style={{color:'blue', fontSize:25}}> Notification Screen  </Text>
            </View>
        )
    }
}

export default NotificationsScreen


  