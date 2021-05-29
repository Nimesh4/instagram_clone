import React, { Component, Dispatch } from 'react'
import { Text, View, SafeAreaView,StyleSheet, Button, TouchableOpacity, TextInput, Dimensions, Image, FlatList, StatusBar } from 'react-native'

import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'

import { getPosts, likePost, unLikePost, savePost, unSavePost } from '../../actions/post'
import PostComponent from  '../Components/PostComponent' 



const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


interface name{
    getUser:any,
    user:any,
    navigation:any,
    getPosts:any,
    feed:any,
    post:any,
    likePost:any,
    unLikePost:any,
    savePost:any,
    unSavePost:any
}

class HomeScreen extends React.Component <name> {



    render(){
        this.props.navigation.setOptions({
            title:this.props.post.onePost.username + "'s post"
        })
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#000" />
                <PostComponent
                item={this.props.post.onePost} 
                user={this.props.user} 
                likePost={(item) => this.props.likePost(item)}
                unLikePost={(item) => this.props.unLikePost(item)} 
                savePost={(item) => this.props.savePost(item)}
                unSavePost={(item) => this.props.unSavePost(item)}
                navigation={this.props.navigation}                
                />
            </View>
        );
    }
}


const mapDispatchProps = (dispatch) => {
    return bindActionCreators({ getUser, getPosts ,likePost, unLikePost, savePost, unSavePost},dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post,
    }
}

export default connect (mapStateToProps, mapDispatchProps)(HomeScreen)


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#131212',
        //justifyContent:'center',
        //alignItems:'center',

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
        height:screenHeight+50
    },

})