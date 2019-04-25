import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Main from '../screens/MAIN'
import D_Login from '../screens/D_Login'
import D_Feed from '../screens/D_Feed'
import D_SignUp from '../screens/D_SignUp'
import D_Form from '../screens/D_Form'
import Cam from '../screens/Cam'
import DrawerStack from './DrawerNav'
import { Dimensions } from 'react-native'
import React from 'react'
import { Text, View, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation'
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const FeedNavigator=createStackNavigator({
	feed: {
		screen: D_Feed,
	},

	drawer: {
		screen: DrawerStack
	},

	d_form: {
		screen: D_Form,
	},
	cam: {
		screen: Cam,
		navigationOptions: {
			header: null,
		}
	}



},

{
	initialRouteName: 'd_form',
	defaultNavigationOptions: ({navigation}) => ({
        headerLeft: <TouchableOpacity onPress={() => navigation.navigate('drawer')} style={{flexDirection: 'row', alignItems: 'center' }}>
		              <MaterialCommunityIcons name="menu" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
		            </TouchableOpacity>,
		headerRight:  <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center' }}>
		              	<MaterialCommunityIcons name="plus" size={26} color="#316538" style={{marginRight: 15}} />
		            </TouchableOpacity>,

    })

}

)

export default FeedNavigator