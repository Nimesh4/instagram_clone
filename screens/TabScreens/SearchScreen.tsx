import React from 'react';
import {
    Dimensions,
    ScrollView,
    TouchableOpacity, View, StyleSheet, StatusBar
} from "react-native";
import MasonryList from '@appandflow/masonry-list';
import {
    Button,
    Container,
    Icon,
    Header,
    Item, Input, Text, Left, Right, Footer
} from "native-base";
//import {colors} from "~/utils/theme";
import NestedCell from '../Components/nestedCell/index'
import CameraRoll from '@react-native-community/cameraroll';
import SearchTag from "../Components/searchTag";
import tags from "../utils/datas/tag";
import Modal from 'react-native-modalbox';
import {RNCamera} from "react-native-camera";
//import styles from "~/screens/Search/styles";

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default class SearchScreen extends React.PureComponent<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            refreshing: false,
            setRefreshing: false,
            isModalOpen: false,
            orderedStories: null,
            selectedStory: null,
            tmpImages: null,
            images: [],
            search: '',
            camera: {
                type: RNCamera.Constants.Type.back,
                orientation: RNCamera.Constants.Orientation.auto,
                flashMode: RNCamera.Constants.FlashMode.auto,
            },
        };
    }

    wait = (timeout: number) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };


    closeModal = () => {
        this.setState({isModalOpen: false});
    };

    openModal = () => {
        this.setState({isModalOpen: true});
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

    updateSearch = (search: any) => {
        this.setState({search});
    };


    componentDidMount() {
        const fetchParams = {
            first: 25,
        };


        // CameraRoll.getPhotos(fetchParams).then((data: any) => {
        //     const assets = data.edges;
        //     const images = assets.map((asset: any) => asset.node.image);
        //     this.setState({
        //         tmpImages: images,
        //     });
        //     const imgArray: any = [];
        //     this.state.tmpImages.forEach(function (image: any, index: number) {
        //         imgArray.push({uri: image.uri, id: index, height: Math.round(Math.random() * 50 + 100)})
        //     });
        //     this.setState({images: imgArray});
        // }).catch((err: any) => {
        //     console.log("Error retrieving photos");
        // });

    }

    render() {
        const {isModalOpen} = this.state;
        return (
            <Container>
                <Header rounded searchBar style={styles.headerSearch}>
                    <Item style={{borderRadius: 8, backgroundColor: '#E1E8ED'}}>
                        <Icon name="ios-search"/>
                        <Input placeholder="Search"/>
                    </Item>
                    <Button transparent>
                        <TouchableOpacity onPress={this.openModal}>
                            <Icon type={"AntDesign"} fontSize={32} style={{color: 'black'}}
                                  name='scan1'/>
                        </TouchableOpacity>
                    </Button>
                </Header>
                <View style={{padding: 10}}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                        <StatusBar barStyle="light-content" backgroundColor="#000" />
                            {
                                tags.map(tag => (
                                    <SearchTag key={tag.id} id={tag.id} title={tag.text}/>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
                <MasonryList
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    data={this.state.images}
                    renderItem={({item}) => <NestedCell item={item}/>}
                    getHeightForItem={({item}) => item.height + 2}
                    numColumns={3}
                    keyExtractor={item => item.id}
                />
                <Modal
                    style={styles.modal}
                    isOpen={isModalOpen}
                    onClosed={this.closeModal}
                    position="center"
                    swipeToClose
                    swipeArea={250}
                    backButtonClose>
                    <RNCamera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.modal}
                        aspect={this.state.camera.aspect}
                        type={this.state.camera.type}
                        flashMode={this.state.camera.flashMode}
                        onFocusChanged={() => {
                        }}
                        onZoomChanged={() => {
                        }}
                        defaultTouchToFocus
                        mirrorImage={false}
                    >
                        <View style={{flex: 1, backgroundColor: 'rgba(193,53,132,0.2)'}}>
                            <Header rounded searchBar style={styles.headerCamera}>
                                <Left>
                                    <TouchableOpacity onPress={this.closeModal}>
                                        <Icon type={"AntDesign"} fontSize={32} style={{color: 'white'}}
                                              name='close'/>
                                    </TouchableOpacity>
                                </Left>
                                <Right>
                                    <TouchableOpacity>
                                        <Icon type={"AntDesign"} fontSize={32} style={{color: 'white'}}
                                              name='scan1'/>
                                    </TouchableOpacity>
                                </Right>
                            </Header>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon type={"AntDesign"} style={{color: "#657786", fontSize: 52}}
                                      name='instagram'/>
                                <Text style={styles.textUsername}>Username</Text>
                            </View>
                            <Footer style={styles.footer}>
                                <View style={styles.footerView}>
                                    <TouchableOpacity>
                                        <Icon type={"AntDesign"} fontSize={32} style={{color: 'white'}}
                                              name='scan1'/>
                                    </TouchableOpacity>
                                    <Text style={styles.nameTag}>Go to your
                                        nametag</Text>
                                </View>
                            </Footer>
                        </View>
                    </RNCamera>
                </Modal>
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
    modal: {
        height: screenHeight,
        width: screenWidth,
        flex: 1
    },
    headerSearch: {
        borderRadius: 8,
        backgroundColor:'white',
        borderBottomWidth: 0,
        paddingLeft: 8
    },
    headerCamera:{
        borderRadius: 8,
        backgroundColor:'rgba(100, 100, 100,0)',
        borderBottomWidth: 0,
        paddingLeft: 8
    },
    textUsername:{
        fontWeight: 'bold',
        marginTop: 9,
        color: "#657786",
        textTransform: 'uppercase',
        fontSize: 32
    },
    footer:{
        height: 20,
        backgroundColor: 'rgba(100, 100, 100,0)',
        borderTopWidth: 0
    },
    footerView:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },
    nameTag:{color: 'white', fontWeight: 'bold', marginLeft: 10},
});

