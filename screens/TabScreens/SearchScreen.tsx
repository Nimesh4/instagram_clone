import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


export class SearchScreen extends Component {
    render() {
        return (
            <View style={{alignItems:'center', flex:1, padding:25, justifyContent:'center'}}>
            <Image source={require('../../assets/backgrounds/back4.jpeg')} style={styles.img}/>
                <Text style={{color:'blue' , fontSize:25}}> Search Screen  </Text>
            </View>
        );
    }
}

export default SearchScreen



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        //justifyContent:'center',
    },
    img:{
        position:'absolute',
        zIndex:-1,
        width:screenWidth,
        height:screenHeight+50
    }
})