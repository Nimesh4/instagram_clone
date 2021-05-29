import firebase from 'firebase'
import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TextInput, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import { resetpassword } from  '../../actions/user'
import * as FR from '../../config/firebase'


const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


interface names {
    forgotPassword:any,
    resetpassword:any
}

const forgotPassword = () => {
    return async (dispatch, getState) => {
        try {
            const {Email} = getState().user
            const reset = await firebase.auth().sendPasswordResetEmail(Email)
            alert('Sent Successfully')
        } catch (error) {
            alert(error)
        }
    }
}

export default class ForgotPassword extends Component <names>{
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#000" />
                <Text style={{marginTop:60,fontSize:24}}> Forgot Password!</Text>
                <TextInput
                 style={styles.textinput}
                 placeholder={'Email Address'}
                 placeholderTextColor={'grey'}
                 //onChangeText={input=>this.props.resetpassword(input)}
                 //value={this.props.user.email}
                />

                <TouchableOpacity 
                 onPress={() =>forgotPassword()}
                 style={{width:screenWidth*0.6, height:50, borderRadius:30, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center', margin:30}}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Send Email </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
   container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center'
    },
    textinput:{
        height:50,
        width:screenWidth*0.9,
        backgroundColor:'#FAFAFA',
        color:'#131212',
        paddingHorizontal:20,
        margin:0,
        borderRadius:10,
        borderColor:'grey',
        borderWidth:1,
    },
    button:{
        width:screenWidth*0.6,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0095f6',
        margin:10,
        height:50,
        paddingEnd:10,
        borderRadius:30,
        marginBottom:20
    },
    logo:{
        fontSize:35,
        fontFamily:'logo-font',
        marginVertical:60,
    },
    img:{
      position:'absolute',
      zIndex:-1,
      width:screenWidth,
      height:screenHeight+50
    }
});
