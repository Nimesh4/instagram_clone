import React from 'react';
import {
    StyleSheet,
    View, RefreshControl, ScrollView, StatusBar
} from "react-native";

import {Button, Text, Container, Header, Body, Content, Left, Right, Title} from "native-base";
import {colors} from '../utils/theme'
import FavoriteItem from '../Components/favoriteItem'
import follows from "../utils/datas/follows";

export default class NotificationsScreen extends React.Component {


    constructor(props: any) {
        super(props);
        this.state = {
            refreshing: false,
            setRefreshing: false,
            isModalOpen: false,
            orderedStories: null,
            selectedStory: null,
            
        };
    }

    wait = (timeout: number) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    onRefresh = () => {
        this.setState({setRefreshing: true});
        this.wait(2000).then(() => {
            this.setState({setRefreshing: false});
        });
    };

    goBack = () => {
        this.props.navigation.goBack();
    };

    render() {

        return (
            <Container>
                
                <Header style={{backgroundColor: colors.white}}>
                    <Left></Left>
                    <Body>
                    <Title>Activity</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <ScrollView
                    
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh}/>
                        }
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                            <StatusBar barStyle="light-content" backgroundColor="#000" />
                        <View style={{marginLeft:10, marginRight:10}}>
                            {
                                follows.map(item => (

                                    <FavoriteItem  key={item.id} type={item.type} linesType="multilines" time={item.time}
                                                   text={item.text} category={item.category} avatar={item.avatar}/>

                                ))
                            }

                        </View>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    paddingContainer: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10
    },
    marginContainer: {
        marginTop: 16
    },
    scrollView: {},

});





// import React, { Component } from 'react'
// import { Text, View } from 'react-native'

// export class NotificationsScreen extends Component {
//     render() {
//         return (
//             <View style={{alignItems:'center', flex:1, padding:25, justifyContent:'center'}}>
//                 <Text style={{color:'blue', fontSize:25}}> Notification Screen  </Text>
//             </View>
//         )
//     }
// }

// export default NotificationsScreen


  