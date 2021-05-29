import React, { Component, Dispatch } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Dimensions, Image, FlatList } from 'react-native'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../../actions/user'
import { SafeAreaView } from 'react-navigation'
import {getSavedPosts, getPosts, likePost, unLikePost, savePost, unSavePost } from '../../../actions/post'
import PostComponent from '../../Components/PostComponent'
//mport PostComponent from  '../Components/PostComponent' 



const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


interface props{
    getUser:any,
    user:any,
    navigation:any,
    getPosts:any,
    feed:any,
    post:any,
    likePost:any,
    unLikePost:any,
    savePost:any,
    unSavePost:any,
    getSavedPosts:any
}

class SavedPosts extends React.Component  <props>{

    componentDidMount = () => {
        this.props.getSavedPosts()
    }

   

    render(){
        return (
            
                <FlatList 
                 style={{backgroundColor:'#131212', }}
                 data={this.props.post.saved_feed}
                 keyExtractor={(item) => JSON.stringify(item.uid)}
                 renderItem={({item}) => (

                    <PostComponent
                     item={item} 
                     user={this.props.user} 
                     likePost={(item) => this.props.likePost(item)}
                     unLikePost={(item) => this.props.unLikePost(item)} 
                     savePost={(item) => this.props.savePost(item)}
                     unSavePost={(item) => this.props.unSavePost(item)}                
                    />
                 )}
                />
            
        );
    }
}

const mapDispatchProps = (dispatch) => {
    return bindActionCreators({ getSavedPosts, getUser, getPosts ,likePost, unLikePost, savePost, unSavePost},dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post,
    }
}

export default connect (mapStateToProps, mapDispatchProps)(SavedPosts)


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
        color:'#0095f6'

    },
    img:{
        position:'absolute',
        zIndex:-1,
        width:screenWidth,
        height:screenHeight+50
    },

})