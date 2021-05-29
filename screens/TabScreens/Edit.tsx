import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, StatusBar, } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { updatePhoto, updateEmail, updatePassword, updateUsername, updateName,updateQuote, signup, updateUser,  } from '../../actions/user'
import { uploadPhoto , } from '../../actions'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

interface name {
    uploadPhoto:any,
    navigation:any,
    updateQuote:any,
    user:any,
    updateName:any,
    updatePhoto:any
}

class Edit extends React.Component  <name>{

    openLibrary = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status === 'granted') {
            const image = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true })
            if(!image.cancelled ){
                const url = await this.props.uploadPhoto(image)
                this.props.updatePhoto(url)
            }
        }
    }



    async onEdit (){
        await this.props.uploadPhoto()
        this.setState({message:'User edited succesfully!'})
    }
    state = {
        message:''
    }


    render() {

        this.props.navigation.setOptions({
            headerBackTitle:'',
            headerTitle:'Edit Profile'
        });
        return (
            <View>
                <StatusBar barStyle="light-content" backgroundColor="#000" />
                <Image source={require('../../assets/backgrounds/background-white.jpg')} style={{    justifyContent: 'center',     alignItems: 'center', position:'absolute', zIndex:-1, width:screenWidth, height:screenHeight}} />
                {/* <Text style={{fontSize: 30, margin: 40, fontFamily:'Product-sans-bold', color:'white'}}>Edit</Text> */}
                <View style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        {
                        (this.props.user.photo == undefined) ?
                        <TouchableOpacity onPress={()=> this.openLibrary()} style={{alignItems: 'center', width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8, backgroundColor:'black',  margin:20, marginHorizontal:60,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 7,
                        },
                        shadowOpacity: 0.41,
                        shadowRadius: 9.11,
                        elevation: 14,}}>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=> this.openLibrary()} style={{alignItems: 'center', width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8, backgroundColor:'black', margin:20, marginHorizontal:60,shadowColor: "#000",shadowOffset: {    width: 0,    height: 7,},shadowOpacity: 0.41,shadowRadius: 9.11, elevation: 14,}}>
                            <Image style={{ width:screenWidth/4, height:screenWidth/4, borderRadius:screenWidth/8}} source={{uri: this.props.user.photo}}/>
                        </TouchableOpacity>
                        }
                        <Text style={{color:'white',  marginBottom:50, fontFamily:'logo-font'}} >Change the profile image </Text>
                    </View>
                    
                    </View>
                    <TextInput
                    value={this.props.user.name}
                    onChangeText={input => this.props.updateName(input)}
                    placeholder='Name'
                    placeholderTextColor="black"
                    style={{width:screenWidth*.9, height:50, borderRadius:50, backgroundColor:'rgba(0,0,0, 0.03)', margin: 15, textAlign:'center', padding:15, color:'black', fontSize:15}}
                    />
                    <TextInput
                    value={this.props.user.quote}
                    onChangeText={input => this.props.updateQuote(input)}
                    placeholder='Quote'
                    placeholderTextColor="black"
                    style={{width:screenWidth*.9, height:50, borderRadius:50, backgroundColor:'rgba(0,0,0, 0.03)', margin: 15, textAlign:'center', padding:15, color:'black', fontSize:15}}
                    />
                    <Text style={{color:'#51FF0D', fontSize:20, fontFamily:'logo-font', top:30}}> {this.state.message} </Text>
                    <TouchableOpacity onPress={() => this.onEdit()} style={{marginLeft:20,width:screenWidth*.9, alignItems:'center', backgroundColor:'beige', height:60, borderRadius:20, justifyContent:'center', shadowOffset: {width: 5, height: 5},shadowOpacity: 1,elevation: 3,top:100,}}>
                        <Text style={{fontSize: 20, fontWeight:'bold', color:'black', fontFamily:'logo-font'}}>ACCEPT CHANGES</Text>
                    </TouchableOpacity>

            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updatePhoto, uploadPhoto, updateUser, updateEmail, updatePassword, updateUsername, updateName, signup, updateQuote,  }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
