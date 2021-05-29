import { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity} from 'react-native';

import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword , updateUsername , signup} from '../../actions/user'

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height


interface props {
    type:any;
    user:any
    signup:any
    updateUsername:any
    updateEmail:any
    updatePassword:any

}

class Signup extends React.Component <props> {
 
    state = {
      repeat:'', // is the repeat password
    }

  onLoginPress = () =>{
    if(this.props.user.password == this.state.repeat && this.props.user.username !== '' ){
      this.props.signup()
     
    }else{
      alert('the passcodes are not identical')
    }
  }
  render(){
    return (
      <View style={{   flex: 1,   alignItems: 'center'  }}>
        
            <Image source={require('../../assets/backgrounds/back4.jpeg')} style={ styles.img } />
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}> Username </Text>
              </View>
              <TextInput 
              style={styles.textinput}
              placeholderTextColor={'grey'}
              placeholder={'your username'}
              onChangeText={input=>this.props.updateUsername(input)}
              value={this.props.user.username}
              />
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Email</Text>
              </View>
              <TextInput 
              style={styles.textinput}
              placeholderTextColor={'grey'}
              placeholder={'example@example.com'}
              onChangeText={input=>this.props.updateEmail(input)}
              value={this.props.user.email}
              />
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Password</Text>
              </View>
              <TextInput 
              style={styles.textinput}
              placeholderTextColor={'grey'}
              placeholder={'Passcode123'}
              onChangeText={input=>this.props.updatePassword(input)}
              value={this.props.user.password}
              secureTextEntry={true}
              />
              <View style={{width:screenWidth*0.9,  marginTop:10, }}>
                <Text style={{left:15}}>Repeat Password</Text>
              </View>
              <TextInput 
              style={styles.textinput}
              placeholderTextColor={'grey'}
              placeholder={'Repeat Passcode123'}
              onChangeText={input=>this.setState({repeat: input})}
              value={this.state.repeat}
              secureTextEntry={true}
              />
              <TouchableOpacity style={{width:screenWidth*0.6, height:50, borderRadius:30, backgroundColor:'#0095f6', justifyContent:'center',alignItems:'center', margin:30}}
              onPress={()=>this.onLoginPress()}>
                <Text style={{color:'white', fontWeight:'bold', fontSize:20}}> SIGNUP </Text>
              </TouchableOpacity>
              
      </View>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({ updateEmail, updatePassword , updateUsername , signup}, dispatch)
}
const mapStateToProps = (state: { user: any; }) => {
  return{
    user: state.user,
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Signup)


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

})