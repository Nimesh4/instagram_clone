import { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { uploadPhoto } from '../../actions/index'
import { updatePhoto } from '../../actions/user'

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


interface props {
    type:any;
    user:any
    signup:any
    updateUsername:any
    updateEmail:any
    updatePassword:any
    updatePhoto:any
    navigation:any
    uploadPhoto:any
}

class ProfilePicture extends React.Component <props> {

    openLibrary = async () => {
        try{
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if( status  === 'granted') {
                const image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing:true
                })
                if(!image.cancelled){
                    const url = await this.props.uploadPhoto(image)
                    this.props.updatePhoto(url)
                }
            }
        }
        catch(e){
            alert(e)
        }
    }
 

  render(){

    return (
        <View style={{   flex: 1,   alignItems: 'center', justifyContent:'center' }}>
            
            <Image source={require('../../assets/backgrounds/background-white.jpg')} style={styles.img} />
                <View style={{justifyContent:"center", alignItems:'center', bottom:100}}>
                <Text style={{ fontWeight:'bold' , fontSize:24, color:'black', margin:20}}>Choose a Profile Picture.</Text>
                {
                    (this.props.user.photo == undefined)
                    ?
                    <TouchableOpacity 
                     onPress={() => this.openLibrary()}
                    >
                        <View style={{width:screenWidth*.5, height:screenWidth*.5, borderRadius:screenWidth*.25, backgroundColor:'beige'}} />
                    </TouchableOpacity>                    
                    :
                    <TouchableOpacity
                     onPress={() => this.openLibrary()}
                    >
                        <Image
                         source={{uri:this.props.user.photo}}
                         style={{width:screenWidth*.5,  height:screenWidth*.5, borderRadius:screenWidth*.25, backgroundColor:'beige'}} 
                        />
                    </TouchableOpacity>
                }
                <TouchableOpacity
                 style={{margin:25, padding:10, borderRadius:14, backgroundColor:'rgba(0,0,0,0.05)' , width:screenWidth*0.9, alignItems:'center'}}
                 onPress={() => this.props.navigation.navigate('Signup')}
                >
                    <Text style={{fontWeight:'bold', fontSize:20, color:'black'}}> Continue </Text>
                </TouchableOpacity>
                </View>

        </View>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch)
}
const mapStateToProps = (state: { user: any; }) => {
  return{
    user: state.user,
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(ProfilePicture)


const styles = StyleSheet.create({

    img:{
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      zIndex:-1,
      width:screenWidth,
      height:screenHeight+50,
      
    }

})