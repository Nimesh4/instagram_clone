import React, { Component } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import * as firebase from 'firebase'
import moment from 'moment'
import OptionsMenu from 'react-native-option-menu'

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

interface props {
    item:any,
    user:any,
    unLikePost:any,
    likePost:any,
    savePost:any,
    unSavePost:any,
    navigation:any
}

const MyIcon = (<Ionicons name='ellipsis-vertical' color={'white'} size={25} style={{margin:8}}/>)



export default class PostComponent extends Component  <props>{

    state = {
        liked:undefined,
        numLike:0,
        saved:undefined,
        
    }

    likePost = () => {
        if((this.props.item.likes.includes(this.props.user.uid)) || this.state.liked == true){
            if(this.state.liked == false){
                this.setState({liked:true})
                this.setState({numLike:this.state.numLike+1})
                this.props.likePost(this.props.item)
                
            }
            else{
                this.setState({liked:false})
                this.setState({numLike:this.state.numLike-1})
                this.props.unLikePost(this.props.item)
            }
        }
        else{
            this.setState({liked:true})
            this.props.likePost(this.props.item)
            this.setState({numLike:this.state.numLike+1})

        }
        
    }

    savePost = () => {
        //alert('saved')
        if((this.props.item.savedBy.includes(this.props.user.uid)) || this.state.saved == true){
            if(this.state.saved == false){
                this.setState({saved:true})
                this.props.savePost(this.props.item)
                
            }
            else{
                this.setState({saved:false})
                this.props.unSavePost(this.props.item)
            }
        }
        else{
            this.setState({saved:true})
            this.props.savePost(this.props.item)
            
        }
    }


    // deletePost = () => {
    //     alert('Delete??')
    // }

    
    

    render() {
        return (
            <View style={{marginBottom:10}}>
                <View style={styles.uname_View}>
                    <TouchableOpacity 
                     onPress={() => this.props.navigation.navigate('ProfileScreen', this.props.item.uid )}
                     style={{justifyContent:'center', alignItems:'center', flexDirection:'row',  }}>
                        
                        <Image source={{uri:this.props.item.photo}} style={styles.user_pic}/>
                        <Text style={styles.uname}> {this.props.item.username} </Text>
                    
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {/* <Ionicons name='ellipsis-vertical' color={'white'} size={25} style={{margin:8}}/> */}
                        <OptionsMenu
                            customButton={MyIcon}
                            destructiveIndex={1}
                            options={["Delete"]}
                            //actions={[this.deletePost]}
                        />

                    </TouchableOpacity>
                </View>
                <View>
                    <ScrollView
                        horizontal={true}
                        alwaysBounceHorizontal={true}
                        bounces={true}
                        pagingEnabled={true}
                        >
                            {
                                this.props.item.photos?.map (e =>
                                    <Image source={{uri: e}} style={{width:screenWidth, height:360,}} />
                                )
                            }
                    </ScrollView>
                </View>
                
                <View style={{width:screenWidth, flexDirection:'row',justifyContent:'space-between' , height:50, alignItems:'center'}}>
                    <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity
                         onPress={()=> this.likePost()}>
                            {
                                (this.props.item.likes.includes(this.props.user.uid) && this.state.liked == undefined)?
                               
                                <AntDesign name='heart' color={'red'} size={28} style={{width:28, height:28,margin:8}}/>
                                :
                                    (this.state.liked == true)?

                                    <AntDesign name='heart' color={'red'} size={28} style={{margin:8}}/>
                                    :
                                    <AntDesign name='hearto' color={'white'} size={28} style={{margin:8}}/>
                                }

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CommentScreen')}>
                                { <FontAwesome name='comment-o' color={'white'} size={28} style={{margin:7}}/> }
                            </TouchableOpacity>
                            
                            <TouchableOpacity>
                                { <Ionicons name='paper-plane-outline' color={'white'} size={28} style={{margin:7, marginBottom:2}}/> }
                            </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                     onPress={() => this.savePost()}>

                        {
                            (this.props.item.savedBy.includes(this.props.user.uid) && this.state.saved == undefined)?
                            <FontAwesome name='bookmark' color={'white'} size={28} style={{width:27, height:27, margin:12}} />
                            :
                                (this.state.saved == true)?
                                <FontAwesome name='bookmark' color={'white'} size={28} style={{width:27, height:27, margin:12}} />
                                :
                                
                                <FontAwesome name='bookmark-o' color={'white'} size={28} style={{width:27, height:27, margin:12}} />
                                
                        }
                    </TouchableOpacity>

                </View>

                <Text style={{fontWeight:'bold', marginHorizontal:10,color:'white'}}>{ 
                this.props.item.likes.length + this.state.numLike

                } likes</Text>
                
                
                <View style={{flexDirection:'row', marginTop:3}}>
                    <Text style={{fontWeight:'bold', marginLeft:10, color:'white'}}>{this.props.item.username.toLowerCase()}</Text>
                    <Text style={{color:'white'}}> {this.props.item.description} </Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CommentScreen')}>
                    <Text style={{marginHorizontal:10, color:'grey', marginTop:3}}>Show all {this.props.item.comments.length} comments</Text>
                </TouchableOpacity>
                <View style={{justifyContent:'space-between', alignItems:'center',flexDirection:'row'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image 
                        source={{uri:this.props.user.photo}}
                        style={{width:32, height:32, borderRadius:32/2, marginHorizontal:10, marginTop:5}} />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CommentScreen')}>
                            <Text style={{ color:'grey', marginTop:5}}>Add a new comment...</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Image source={require('../../assets/images/emojis.jpg')} style={{width:80, height:17, margin:10}} /> */}
                </View>
                <Text style={{marginHorizontal:10, color:'grey', marginTop:3, }}>{moment(this.props.item.date).format('ll')}</Text>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    uname:{
        fontWeight:'bold',
        fontSize:16,
        color:'white'
    },
    uname_View:{
        width:screenWidth, 
        height:50, 
        backgroundColor:'#131212',  
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        borderBottomColor:'grey',
        borderBottomWidth:0.08,
    },
    user_pic:{
        width:40,
        height:40,
        borderRadius:20,
        margin:10,
    },

})