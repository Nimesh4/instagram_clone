import React, { useEffect, useState } from 'react'
import { View,StyleSheet, RefreshControl ,TouchableOpacity, Dimensions, Image, FlatList, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser } from '../../actions/user'
import { getPosts, likePost, unLikePost, savePost, unSavePost } from '../../actions/post'
import PostComponent from  '../Components/PostComponent' 
import { Container } from 'native-base'


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
    unSavePost:any,
    //refreshing:any
}



class HomeScreen extends React.Component  <name>{

    constructor(props:any) {
        super(props);
        this.state = {
            refreshing:false,
            setRefreshing:false
        }
    }

    

    componentDidMount = () => {
        this.props.getPosts()
    }

    wait = (timeout:number) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        })
    }

    onRefresh = () => {
        this.setState({setRefrshing:true});
        this.wait(3000).then(() => {
            getPosts
            this.setState({setRefreshing:false});
        });
    };
  
    render(){

        const {refreshing} = this.state;
        return (
            <Container style={{flex:1, backgroundColor:'#131212',justifyContent:'center', alignItems:'center'}}>

                <View style={{height:50,width:screenWidth*0.9,paddingTop:25,justifyContent:'space-between', alignItems:'center',flexDirection:'row'}}>
                <StatusBar barStyle="light-content" backgroundColor="#000" />

                    <Image source={require('../../assets/images/instagram-logo.jpg')} style={styles.logo} />
                    <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}> 
                    
                        <TouchableOpacity
                         onPress={() =>this.props.navigation.navigate('SavedPosts') }>
                            <AntDesign name='heart' color={'red'} size={28}/>
                        </TouchableOpacity> 
                         
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DirectScreen')}>
                            <AntDesign name='message1' color={'white'} size={28} style={{paddingLeft:15}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList 
                 style={{marginTop:15,borderBottomColor:'rgba(0,0,0,0.1)', borderBottomWidth:0.9}}
                 data={this.props.post.feed}
                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => this.onRefresh}/>}
                 keyExtractor={(item) => JSON.stringify(item.uid)}
                 renderItem={({item}) =>(

                    <PostComponent
                     item={item} 
                     user={this.props.user} 
                     likePost={(item) => this.props.likePost(item)}
                     unLikePost={(item) => this.props.unLikePost(item)} 
                     savePost={(item) => this.props.savePost(item)}
                     unSavePost={(item) => this.props.unSavePost(item)}
                     navigation={this.props.navigation}                
                    />
                 )}
                />
            </Container>
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
    logo:{
        fontFamily:'logo-font',
        width:130,
        height:40, 
        marginHorizontal:5
    }

})