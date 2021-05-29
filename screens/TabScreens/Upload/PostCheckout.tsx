import React, { Component, Dispatch } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native'

import {  AnyAction, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateDescription } from '../../../actions/post'
import { SafeAreaView } from 'react-navigation'
import { ScrollView } from 'react-native-gesture-handler'

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
                 placeholderTextColor={'black'}
                 placeholder={'Caption.. '}
                 onChangeText={input=>{this.props.updateDescription(input)}}
                 value={this.props.post.description}
                 style={styles.desc}
                 />

                 <View>
                    <ScrollView
                     horizontal={true}
                     alwaysBounceHorizontal={true}
                     bounces={true}
                     pagingEnabled={true}
                    >
                        {
                         this.props.post.photos?.map (e =>
                            <Image source={{uri: e}} style={{width:screenWidth, height:360,}} />
                         )
                        }
                    </ScrollView>
                 </View>
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
        backgroundColor:'rgba(0,0,0,0.05)',
        fontSize:20,
        paddingVertical:15,
        margin:20,
        width:'95%',
        borderRadius:10,
    }

})