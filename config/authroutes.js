import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Main from '../screens/MAIN'
import React from 'react'
import { Text, View, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import D_Login from '../screens/D_Login'
import D_SignUp from '../screens/D_SignUp'
import { Dimensions } from 'react-native'
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const AuthNavigator=createStackNavigator({
	main: {
		screen: Main,
		navigationOptions: {
			header: null,
		}
	},

	d_login: {
		screen: D_Login,
		navigationOptions: {
			title: 'Login',
			headerRight: <View/>
		}
	},

	d_signup: {
		screen: D_SignUp,
		navigationOptions: {
			title: 'Sign Up',
			headerRight: <View/>
		}
	},
},

{
	initialRouteName: 'main',
	defaultNavigationOptions: {
	headerTintColor: 'white',
    headerStyle: {
    	backgroundColor: '#316538',
        shadowOffset: {
            height: 0,
          },
        shadowRadius: 0,
        elevation: 0,
        shadowOpacity: 0
     },
    headerTitleStyle: { color: 'white', alignSelf: 'center', flex: 1, textAlign:"center" },
	}
}



)

export default AuthNavigator