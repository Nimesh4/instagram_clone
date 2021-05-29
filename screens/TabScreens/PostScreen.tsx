import React, { Component, Dispatch } from 'react'
import { Text,SafeAreaView, View, StyleSheet,  TouchableOpacity, Dimensions, Image, Platform, StatusBar } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'


import { uploadPhoto } from '../../actions/index'
import { updateNextPhoto, removeImage } from '../../actions/post'
import { FontAwesome } from '@expo/vector-icons'




const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

interface props {
    uploadPhoto:any,
    updateNextPhoto:any
    removeImage:any
    post:any
    navigation:any
}

class PostScreen extends React.Component <props> {

    state = {
        urlChosen:undefined
    }

    openLibrary = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status === 'granted') {
                const image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing:true
                })
                if(!image.cancelled){

                    const url = await this.props.uploadPhoto(image)
                    this.props.updateNextPhoto(url)
                    this.setState({urlChosen:url})
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    changeChosenUrl = (url) => {
        this.setState({urlChosen:url})
    }

    removeImage = (url) => {
        const position = this.props.post.photos.indexOf(url)
        this.props.removeImage(position)
        if(this.props.post.photos.length == 2){
            this.setState({urlChosen: this.props.post.photos[0]})
        }else{
            this.setState({ urlChosen:undefined })
        }
    }

    uploadPost = () => {
        this.props.navigation.navigate("PostCheckout")
    }



    render(){
        return (
            <SafeAreaView style={ {flex:1} }>
                <StatusBar barStyle="light-content" backgroundColor="#000" />
            <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{justifyContent:'center',alignItems:'center', position:'absolute',zIndex:-1,width:screenWidth, height:screenHeight}} />
                <View style= {(Platform.OS == 'ios') 
                ? 
                {width:screenWidth, height:55} 
                : 
                {width:screenWidth, height:55, marginTop:30, justifyContent:'space-between', alignItems:"center",flexDirection:'row'}}>
                    <Text style={styles.text}> New Post </Text>
                    <TouchableOpacity style={{margin:10}}
                    onPress={() => this.uploadPost()} >
                        <Text style={styles.btn}> Upload </Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:screenWidth, height:360}}>
                    {
                    (this.state.urlChosen == undefined)?
                    <TouchableOpacity style={{width:screenWidth, height:360, justifyContent:'center', alignItems:'center'}} 
                     onPress={() => this.openLibrary()} >
                       <View style={styles.plus}>
                            <Text style={{color:'white' , fontSize:35}}> + </Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                     style={{width:screenWidth, height:360}}
                    >
                        <Image source={{ uri: this.state.urlChosen }} style={{width:screenWidth , height:360}} />
                        <TouchableOpacity onPress={() => this.removeImage(this.state.urlChosen)}  style={{position:'absolute', bottom:30, right:40}}>
                            <FontAwesome name='trash' color={'black'} size={40}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    }
                </View>

                <View style={{ flexDirection:'row', width:screenWidth, justifyContent:'center', alignItems:'center', flex:1}}>
                    {
                        (this.props.post.photos == undefined || this.props.post.photos?.lenght == 3 || this.props.post.photos?.lenght == 0)
                        ?
                        null
                        :
                        <TouchableOpacity style={styles.fun_touch}
                        onPress={() => this.openLibrary()}
                        >
                            <View style={styles.T_plus}>
                                <Text style={{color:'white' , fontSize:30}}> + </Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        this.props.post.photos?.map(e =>
                            <TouchableOpacity
                             onPress= {() => this.changeChosenUrl(e)}>
                                <Image source={{uri:e}} style={{width:95, height:90, backgroundColor:'rgba(0,0,0,0.1)', borderRadius:12, margin:10}} />
                            </TouchableOpacity>    
                        )
                    }
                </View>

            </SafeAreaView>
        );
    }
}

const mapDispatchProps = (dispatch) => {
    return bindActionCreators({ getUser, uploadPhoto, updateNextPhoto, removeImage },dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post,
    }
}

export default connect (mapStateToProps, mapDispatchProps)(PostScreen)


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    text:{
        margin:10,
        fontWeight:'bold',
        fontSize:18
    },
    btn:{
        margin:10,
        fontWeight:'bold',
        fontSize:18,
        color:'blue',
    },
    img:{
        width:screenWidth,
        height:360,        
    },
    postimg:{
        width:screenWidth,
        height:360,
        justifyContent:'center',
        alignItems:'center',

    },
    plus:{
        width:65,
        height:65, 
        borderRadius:65/2,  
        backgroundColor:'rgba(0,0,0,0.1)', 
        justifyContent:'center', 
        alignItems:'center'
    },
    T_plus:{
        width:40, 
        height:40, 
        borderRadius:20,  
        backgroundColor:'rgba(0,0,0,0.1)', 
        justifyContent:'center', 
        alignItems:'center'
    },
    fun_touch:{
        width:95, 
        height:90, 
        backgroundColor:'rgba(0,0,0,0.1)', 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:12,
        margin:5,
    }

})