import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from './TabNavigator'
import PostCheckout from '../screens/TabScreens/Upload/PostCheckout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native';
import { uploadPost } from '../actions/post'
import SavedPosts from '../screens/TabScreens/HeaderScreens/SavedPosts';
import ProfileScreen from '../screens/TabScreens/ProfileScreen';
import { BorderlessButton } from 'react-native-gesture-handler';
import OnePost from '../screens/TabScreens/OnePost';
import Edit from '../screens/TabScreens/Edit';
import CommentScreen from '../screens/TabScreens/CommentScreen';
import DirectScreen from '../screens/TabScreens/DirectScreen';

const Stack = createStackNavigator();

interface props {
    uploadPost:any,
    navigation:any
}

class  MyStack extends React.Component <props> {


    render() {
        return (
            
            <Stack.Navigator>
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false}} />
                <Stack.Screen name="SavedPosts" component={SavedPosts}
                 
                 options={{ 
                     headerStyle:{backgroundColor:'#131212'},
                     headerTitleStyle:{color:'white'},
                     headerTintColor:'white'
                    }}/>

                <Stack.Screen name="OnePost" component={OnePost} 
                 options={{
                    headerStyle:{backgroundColor:'#131212'},
                    headerTitleStyle:{color:'white'},
                    headerTintColor:'white'
                 }}
                />

                <Stack.Screen name="Edit" component={Edit} />

                <Stack.Screen name="CommentScreen" component={CommentScreen}
                 options={{
                    headerStyle: {backgroundColor:'#131212' },
                    headerTitleStyle:{color:'white'},
                    headerTintColor:'white',
                    title:"Comments"
                 }}
                />

                <Stack.Screen name="DirectScreen" component={DirectScreen} 
                options={{
                    headerShown:true,
                    headerTitle:"Direct",
                    headerStyle: {backgroundColor:'#131212' },
                    headerTitleStyle:{color:'white'},
                    headerTintColor:'white'
                    }}/>

                <Stack.Screen name="ProfileScreen" component={ProfileScreen}               
                options={{
                    headerStyle: {backgroundColor:'#131212' },
                    headerTitleStyle:{color:'white'},
                    headerTintColor:'white'
                }} />

                <Stack.Screen name="PostCheckout" component={PostCheckout} 
                options={{
                    headerShown:true,
                    headerTitle:"See Your Post",
                    headerStyle: {backgroundColor:'#131212' },
                    headerTitleStyle:{color:'white'},
                    headerTintColor:'white',
                    headerRight: () => (
                        <TouchableOpacity style={{ margin:18, flexDirection:'row' }}
                         onPress={() => this.props.uploadPost()}
                         onPressIn={() => alert('Uploaded Successfully!')}
                        
                        >
                            <Text style={{ color:'#ffffff', fontWeight:'bold', fontSize:20, marginHorizontal:4, bottom:1 }}>POST</Text>
                            <AntDesign name='arrowright' color={'#366ce9'} size={26}  />
                            
                        </TouchableOpacity>
                    ),

                }} />

                
    
            </Stack.Navigator>
        );
    }
}


const mapDispatchProps = (dispatch) => {
    return bindActionCreators({ uploadPost },dispatch)
}

const mapStateToProps = (state: { user, post }) => {
    return {
        user: state.user,
        post: state.post,
    }
}

export default connect (mapStateToProps, mapDispatchProps)(MyStack)