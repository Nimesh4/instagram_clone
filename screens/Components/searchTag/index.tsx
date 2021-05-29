import React from 'react'
import {Text, StyleSheet,TouchableOpacity, View} from "react-native";
import {Image} from "react-native-elements";
//import styles from "~/components/searchTag/styles";

const SearchTag = (props: any) => (
    <TouchableOpacity style={{marginLeft: props.id !== 0 ? 5 : 0}}>
        <View style={styles.container}>
            {props.id == 0 ?
                <Image style={{width: 26, height: 26}} source={require('../../../assets/images/share.jpg')}/> : null}
            <Text style={styles.tag}>{props.title}</Text>
        </View>
    </TouchableOpacity>
);

export default SearchTag;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#E1E8ED',
        borderWidth: 2,
        borderRadius: 8,
        padding:8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height:40,
        maxHeight:40
    },
    tag: {
        fontWeight: 'bold'
    }
});