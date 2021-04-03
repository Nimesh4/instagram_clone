import React, { Component, Dispatch } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native'

import {  AnyAction, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateDescription } from '../../../actions/post'
import { SafeAreaView } from 'react-navigation'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


interface props{
    getUser:any,
    user:any,
    navigation:any,
    post:any,
    updateDescription:any
}

class PostCheckout extends React.Component  <props>{
    render(){
        return (
            <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/backgrounds/background-white.jpg')} style={styles.img}/>
                <TextInput
                 placeholderTextColor={'grey'}
                 placeholder={'Type Your Decscription ..'}
                 onChangeText={input=>{this.props.updateDescription(input)}}
                 value={this.props.post.description}
                 style={styles.desc}
                 />
            </SafeAreaView>
        );
    }
}

const mapDispatchProps = (dispatch) => {
    return bindActionCreators({ updateDescription },dispatch)
}

const mapStateToProps = (state: { user, post }) => {
    return {
        user: state.user,
        post: state.post,
    }
}

export default connect (mapStateToProps, mapDispatchProps)(PostCheckout)


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        //justifyContent:'center',
        alignItems:'center',

    },
    text:{
        fontSize:35,
        fontFamily:'logo-font',
        marginVertical:60,
        color:'#0095f6'

    },
    img:{
        position:'absolute',
        zIndex:-1,
        width:screenWidth,
        height:screenHeight+50,
        justifyContent:'center',
        alignItems:'center',
    },
    desc:{
        backgroundColor:'red'
    }

})