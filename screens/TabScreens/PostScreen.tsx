import React, { Component, Dispatch } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native'

import {  AnyAction, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'


interface props{
    getUser:any,
    user:any,
    navigation:any,
}

class PostScreen extends React.Component  <props>{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Post Screen  </Text>
            </View>
        );
    }
}

const mapDispatchProps = (dispatch) => {
    return bindActionCreators({ getUser },dispatch)
}

const mapStateToProps = (state: { user: any }) => {
    return {
        user: state.user,
    }
}

export default connect (mapStateToProps, mapDispatchProps)(PostScreen)


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',

    },
    text:{
        fontSize:35,
        fontFamily:'logo-font',
        marginVertical:60,
        color:'#3b474e'

    }

})