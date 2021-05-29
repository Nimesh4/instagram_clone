import React, { Component } from 'react'
import { TouchableOpacity,ScrollView, Text, View, TextInput, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { AnyAction, bindActionCreators, Dispatch }  from 'redux'
import { connect } from 'react-redux'
import PostComponent from '../Components/PostComponent'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

interface names {
  navigation:any,
  item:any,
}


export default function CommentScreen () {

        return (
          <SafeAreaView style={{backgroundColor:'#131212' , flex:1}}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Text style={{color:'white' , justifyContent:'center', fontSize:25, alignItems:'center'}}> Comment Screen. </Text>
          </SafeAreaView>
    
         )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#131212"
      },
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      titleText: {
        fontFamily: "lobster_regular",
        fontSize: 56,
        color: 'white'
      },
      inputWrapper: {
        marginTop: 20,
        
      },
      textWrapper: {
        width: screenWidth * 0.9,
        alignItems: "center",
        position: "relative"
      },
      line: {
        height: 1,
        backgroundColor: "#A9A9A9",
        position: "absolute",
        top: 7,
        width: screenWidth * 0.9
      },
      textStyle: {
        fontSize: 16,
        textAlign: "center",
        backgroundColor: "white",
        paddingHorizontal: 8,
        fontFamily: "logo-font",
        color: "gray"
      },
      footerContainer: {
        borderTopWidth: 1,
        borderColor: "gray",
        alignItems: "center",
        paddingVertical: 18
      },
      textinput:{
        height:50,
        width:screenWidth*0.9,
        backgroundColor:'#FAFAFA',
        color:'black',
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
})