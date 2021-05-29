import React from 'react'
import { StyleSheet , Image , Text, View, TouchableOpacity, Dimensions ,TextInput, ScrollView, StatusBar} from 'react-native'
import { AnyAction, bindActionCreators, Dispatch }  from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword , login} from '../../actions/user'
import { IconButton } from 'react-native-paper'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


interface props {
    type:any;
    updateEmail:any
    updatePassword:any
    user:any
    login:any
    navigation:any
}


class Login extends React.Component <props>  {

    render(){

    return (
        <View style={styles.maincontainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
        <TouchableOpacity
         style={{ alignItems: "center", paddingTop: 20 }}
         onPress={() => this.setState({ modalVisible: true })}
        >

        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titleText}> Photograam </Text>

            <View style={{marginTop:20}}>
                <TextInput
                style={styles.textinput}
                placeholderTextColor={'grey'}
                placeholder={'example@example.com'}
                onChangeText={ input => this.props.updateEmail(input)}
                value={this.props.user.email}
                />
            </View>

            <View style={{marginTop:20}}>
                <TextInput
                style={styles.textinput}
                placeholderTextColor={'grey'}
                placeholder={'passcode@123'}
                onChangeText={input => this.props.updatePassword(input)}
                value= {this.props.user.password}
                secureTextEntry={true}
                />
            </View>
            
            <TouchableOpacity style={styles.button} 
             onPress={() => this.props.login()}>
               <Text style={{color:'white', fontWeight:'bold', fontSize:20}}> Sign Up </Text>
            </TouchableOpacity>

            <View style={{marginTop:20}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                  <Text style={{ fontSize: 12, color: "white", fontFamily: "Roboto" }}>
                  Forgotten your login details?{" "}
                  <Text style={{ color: "#fff" }}>Get help with signing in.</Text>
                  </Text>
            </TouchableOpacity>
            </View>
        
            <View style={[styles.inputWrapper, styles.textWrapper]}>
                <View style={styles.line} />
                <Text style={styles.textStyle}>OR</Text>
            </View>

            {/* <View style={styles.inputWrapper}>
                <IconButton
                title="Log in as"
                onPress={() => this.props.navigation.navigate("AppStack")}
                />
            </View> */}

            </ScrollView>
        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => this.props.navigation.navigate("ProfilePicture")}
        >
          <Text style={{ color: "white", fontFamily: "Roboto" }}>
            Don't have an account?<Text style={{ color: "#fff" }}>
              Sign up.
            </Text>
          </Text>
        </TouchableOpacity> 
        </View>
    )
    }
}

const mapDispatchToProps = (dispach: Dispatch<AnyAction>) => {
    return bindActionCreators({ updateEmail, updatePassword, login }, dispach)
}

const mapstateToProps = (state: { user: any }) => {
    return {
        user: state.user,
        
    }
}
export default connect (mapstateToProps, mapDispatchToProps)(Login)

//export default Login


const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:'#131212',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
    textinput:{
        height:50,
        width:screenWidth*0.9,
        backgroundColor:'#FAFAFA',
        color:'black',
        paddingHorizontal:20,
        margin:0,
        borderRadius:10,
        borderColor:'grey',
        borderWidth:1,
    },
    button:{
        width:screenWidth*0.6,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0095f6',
        margin:10,
        height:50,
        paddingEnd:10,
        borderRadius:30,
        marginBottom:20
    },
    logo:{
        fontSize:35,
        fontFamily:'logo-font',
        marginVertical:60,
    },
    img:{
        position:'absolute',
        zIndex:-1,
        width:screenWidth,
        height:screenHeight+50
    },
    titleText: {
        fontFamily: "logo-font",
        fontSize: 56,
        color: 'white'
      },
      inputWrapper: {
        marginTop: 20,
        
      },
      textWrapper: {
        width: screenWidth * 0.9,
        alignItems: "center",
        position: "relative"
      },
      line: {
        height: 1,
        backgroundColor: "#A9A9A9",
        position: "absolute",
        top: 7,
        width: screenWidth * 0.9
      },
      textStyle: {
        fontSize: 16,
        textAlign: "center",
        backgroundColor: "white",
        paddingHorizontal: 8,
        fontFamily: "logo-font",
        color: "gray"
      },
      footerContainer: {
        borderTopWidth: 1,
        borderColor: "gray",
        alignItems: "center",
        paddingVertical: 18
      },
})
