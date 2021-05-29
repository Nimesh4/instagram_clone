import React, { Component } from 'react'
import { Text,StatusBar ,SafeAreaView,TouchableOpacity, View , Image, StyleSheet, Dimensions, ScrollView, FlatList, Button} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import { getPost } from '../../actions/post'
import * as firebase from 'firebase'
import { getUser, unFollowUser, followUser } from '../../actions/user'
import { getPosts } from '../../actions/post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';


const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

interface name {
    route:any,
    getUser:any,
    profile:any,
    navigation:any,
    user:any,
    followUser:any,
    unFollowUser:any,
    getPost:any
}

 function LogoutScreen ({navigation})  {
    navigation.openDrawer();
    return (
        <View>
            <Button
                onPress={() => firebase.auth().signOut}
                title="Logout"
            />
            
        </View>
    )
}

const Drawer = createDrawerNavigator();

class ProfileScreen extends React.Component <name>{

    componentDidMount = () => {
        const { params } = this.props.route
        if (params !== undefined){
            this.props.getUser(params, 'PROFILE')
        }
    }

    follow = () => {
        this.props.followUser(this.props.profile?.uid)
    }

    unFollow = () => {
        this.props.unFollowUser(this.props.profile?.uid)
    }

    goToPost = (post) => {
        this.props.getPost(post)
        this.props.navigation.navigate('OnePost')
    }

    

    
    render() {

        

        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Logout">
                <Drawer.Screen name="Logout" component={LogoutScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>

        const { params } = this.props.route
        this.props.navigation.setOptions({
            title:this.props.profile?.username
        })

        if(params == undefined || params == this.props.user.uid){

            return (
                <ScrollView style={{ flex:1,backgroundColor:'#131212', height:screenHeight, }}>

                    <SafeAreaView style={{flex:1}}>

                    <StatusBar barStyle="light-content" backgroundColor="#000" />

                    <View style={{width:'100%', height:125, flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#141414'}} >
                        <TouchableOpacity onPress={() =>firebase.auth().signOut()}>
                            <Image source={{uri: this.props.user?.photo}} style={{width:90, height:90, borderRadius:45, margin:20}} />
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', justifyContent:'space-between', }}>
                            
                            <View style={{justifyContent:'center', alignItems:'center', margin:15,}}>
                                <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>
                                    {this.props.user?.posts?.length}
                                </Text>
                                <Text style={{fontSize:15,color:'white'}}>
                                    Posts
                                </Text>
                            </View>

                            <View style={{justifyContent:'center', alignItems:'center',margin:13}}>
                                <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>
                                    {this.props.user?.followers?.length}
                                </Text>
                                <Text style={{fontSize:15,color:'white'}}>
                                    Followers
                                </Text>
                            </View>

                            <View style={{justifyContent:'center', alignItems:'center',marginRight:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>
                                    {this.props.user?.following?.length}
                                </Text>
                                <Text style={{fontSize:15,color:'white'}}>
                                    Following
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:18, width:'100%', marginBottom:20}}>
                        <Text style={{fontWeight:'bold',fontSize:15,color:'white'}}>{this.props.user?.email}</Text>
                        <Text>{this.props.user?.bio}</Text>
                    </View>
                    
                    <View style={{height:60, width:'100%', flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity
                         onPress={() => this.props.navigation.navigate('Edit')}
                         style={{width:'90%',height:35, justifyContent:'center',alignItems:'center',borderRadius:7, borderWidth:1,borderColor:'white'}}
                        >
                            <Text style={{color:'white', fontSize:19,fontWeight:'bold'}}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                     numColumns={3}
                     data={this.props.user?.posts}
                     keyExtractor={(item) => JSON.stringify(item.date)}
                     style={{flex:1,}}
                     renderItem={({ item }) => 
                        <TouchableOpacity
                        onPress={() => this.goToPost(item)} >
                            <Image source={{uri:item.photos[0]}} style={{width:screenWidth/3,height:screenWidth/3, borderRadius:1,}} />
                        </TouchableOpacity>
                     }
                    />

                </SafeAreaView>
                </ScrollView>
            );
                
        }
        
        
        
        else{
            return (

                <ScrollView style={{ flex:1,backgroundColor:'#131212'}}>

                    <SafeAreaView style={{flex:1}}>

                    <View style={{width:'100%', height:120, flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#131212'}} >
                        <Image source={{uri: this.props.profile?.photo}} style={{width:90, height:90, borderRadius:45, margin:20}} />

                        <View style={{flexDirection:'row', justifyContent:'space-between', }}>
                            
                            <View style={{justifyContent:'center', alignItems:'center', margin:15,}}>
                                <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>
                                    {this.props.profile?.posts?.length}
                                </Text>
                                <Text style={{fontSize:15,color:'white'}}>
                                    Posts
                                </Text>
                            </View>

                            <View style={{justifyContent:'center', alignItems:'center',margin:13}}>
                                <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>
                                    {this.props.profile?.followers?.length}
                                </Text>
                                <Text style={{fontSize:15,color:'white'}}>
                                    Followers
                                </Text>
                            </View>

                            <View style={{justifyContent:'center', alignItems:'center',marginRight:10}}>
                                <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>
                                    {this.props.profile?.following?.length}
                                </Text>
                                <Text style={{fontSize:15,color:'white'}}>
                                    Following
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:18, width:'100%', marginBottom:20}}>
                        <Text style={{fontWeight:'bold',fontSize:15,color:'white'}}>{this.props.profile?.email}</Text>
                        <Text style={{color:'white'}} >{this.props.profile?.bio}</Text>
                    </View>
                    {
                    (this.props.profile?.followers?.includes(this.props.user.uid))?
                        <View style={{height:60, width:'100%',flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                             onPress={() => this.unFollow()}
                            
                             style={{flexDirection:'row',width:screenWidth*0.45, height:35, justifyContent:'center', alignItems:'center',borderWidth:0.5, borderColor:'white', borderRadius:7, margin:screenWidth*0.0125}}> 
                                <Text style={{fontWeight:'bold',fontSize:16, margin:2,color:'white'}}>Following</Text>
                                <Ionicons name='chevron-down' color={'white'} size={24} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DirectScreen')} style={{width:screenWidth*0.45, height:35, justifyContent:'center', alignItems:'center',borderWidth:0.5, borderColor:'white', borderRadius:7, margin:screenWidth*0.0125}}>
                            <Text style={{fontWeight:'bold',fontSize:16,color:'white'}}>Message</Text>
                            </TouchableOpacity>
                        </View>
                    :
                        <View style={{height:60, width:'100%',flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity 
                             onPress={() => this.follow()}
                             style={{width:'90%',backgroundColor:'#0095f8', height:35, justifyContent:'center', alignItems:'center', borderRadius:7}}>
                                <Text style={{color:'white', fontSize:18, fontWeight:'bold' }}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <FlatList
                     numColumns={3}
                     data={this.props.profile?.posts}
                     keyExtractor={(item) => JSON.stringify(item.date)}
                     style={{flex:1,}}
                     renderItem={({ item }) =>
                        <TouchableOpacity
                        onPress={() => this.goToPost(item)} >
                            <Image source={{uri:item.photos[0]}} style={{width:screenWidth/3,height:screenWidth/3, borderRadius:1,}} />
                        </TouchableOpacity>
                     }
                    />

                    </SafeAreaView>
                </ScrollView>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return  bindActionCreators({getUser,followUser, unFollowUser , getPost}, dispatch)
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        profile: state.profile,
    }
}

export default connect ( mapStateToProps, mapDispatchToProps) (ProfileScreen)

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
