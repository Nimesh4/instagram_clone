import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Dimensions, Image, StatusBar } from 'react-native'

import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { getUser } from '../../actions/user'
//import Login from './Login';

interface props{
    getUser:any,
    user:any,
    navigation:any,
}

class Login extends React.Component <props> {

    componentDidMount = () =>{
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.props.getUser(user.uid)
                if(this.props.user != null){
                    this.props.navigation.navigate("StackNavigator")
                    this.props.navigation.reset({
                        index:0,
                        routes: [{ name:'StackNavigator' }]
                    })
                }
            }
            else {
                this.props.navigation.navigate('Login')
            }
        })                    
    }

    render() {
        return (
            <View style={styles.container}>
                 <StatusBar barStyle="light-content" backgroundColor="#000" />
                <Text style={{color:'white'}}> Loading.. </Text>
            </View>
        );
    }
}

const mapDispatchProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators({ getUser }, dispatch)
}

const mapStateToProps = (state: { user: any }) => {
    return {
        user: state.user,
    }
}

export default connect (mapStateToProps, mapDispatchProps)(Login)


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#131212',
        justifyContent:'center',
        alignItems:'center',

    },

})