import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import * as firebase from 'firebase'


export class ProfileScreen extends Component {


    signout = () => {
        firebase.auth().signOut()
    }

    render() {
        return (
            <SafeAreaView style={{alignItems:'center', flex:1, padding:25, justifyContent:'center'}}>
                <Text style={{color:'blue', fontSize:25}}> Profile Screen  </Text>

                <View>
                    <TouchableOpacity onPress={() => {this.signout}}>
                        <Text style={{color:'red', fontSize:20, fontWeight:'bold', borderRadius:2, padding:10 }}> Logout </Text>
                    </TouchableOpacity>                    
                </View>
            </SafeAreaView>
            
        )
    }
}

export default ProfileScreen

