import React, {useState, useEffect, Component} from 'react'
import {StatusBar} from 'expo-status-bar'
import { StyleSheet , Image , Text, View, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import Icon  from 'react-native-vector-icons/FontAwesome'
import { AnyAction, bindActionCreators, Dispatch }  from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword , login} from '../../actions/user'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


interface props {
    type:any;
    updateEmail:any
    updatePassword:any
    user:any
    login:any
    navigation:any
}


class Login extends React.Component <props>  {

    render(){

    return (
        <View style={styles.container}>
          <Image source={require('../../assets/backgrounds/back4.jpeg')} style={styles.img}/>
            <Text style={styles.logo}> instagraam </Text>

            <View style={{marginTop:100, alignItems:'center'}}>

            <View style={{width:screenWidth*0.9, marginTop:10}}>
                <Text style={{left:8}}> Email </Text>
            </View>
            <TextInput
             style={styles.textinput}
             placeholderTextColor={'grey'}
             placeholder={'example@example.com'}
             onChangeText={ input => this.props.updateEmail(input)}
             value={this.props.user.email}
            />

            <View style={{width:screenWidth*0.9, marginTop:10}}>
                <Text style={{left:8}}> Password </Text>
            </View>

            <TextInput
             style={styles.textinput}
             placeholderTextColor={'grey'}
             placeholder={'passcode@123'}
             onChangeText={input => this.props.updatePassword(input)}
             value= {this.props.user.password}
             secureTextEntry={true}
            />

            <View style={{width:screenWidth, alignItems:'center',margin:30}}>

            <TouchableOpacity style={styles.button} 
             onPress={() => this.props.login()}>
               <Text style={{color:'white', fontWeight:'bold', fontSize:20}}> Log In </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center', flexDirection:'row', margin:5}}
             onPress={() => this.props.navigation.navigate('Signup')}
            > 

                <Text style={{fontSize:18}}>Don't Have an account?</Text>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#0095f6'}}>SignUp!</Text>
            </TouchableOpacity>

            </View>
{/* 
            <View style={styles.container}>
                <FontAwesome.Button name="google" backgroundColor="transparent" style={{height:40, borderRadius:20, borderColor:"#0a66c2", borderWidth:2 }} color="#0a66c2" >
                    <Text>Login with Google </Text>
                </FontAwesome.Button>
            </View> */}

            </View>

            <View style={{position:'absolute', bottom:20, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:18}} > From </Text>
                <Text style={{fontSize:20, fontWeight:'bold'}}> Nikist </Text>
            </View>

        </View>
    )
    }
}

const mapDispatchToProps = (dispach: Dispatch<AnyAction>) => {
    return bindActionCreators({ updateEmail, updatePassword, login }, dispach)
}

const mapstateToProps = (state: { user: any }) => {
    return {
        user: state.user,
        
    }
}
export default connect (mapstateToProps, mapDispatchToProps)(Login)

//export default Login


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        //justifyContent:'center',
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
