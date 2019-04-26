import { createSwitchNavigator, createStackNavigator, createAppContainer, DrawerActions } from 'react-navigation';
import Main from '../screens/MAIN'
import D_Login from '../screens/D_Login'
import D_Feed from '../screens/D_Feed'
import D_SignUp from '../screens/D_SignUp'
import DrawerStack from './DrawerNav'
import { Dimensions } from 'react-native'
import React from 'react'
import { Text, View, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const MainNavigator= createStackNavigator({
	drawer: {
		screen: DrawerStack
	}
},
{
	initialRouteName: 'drawer',
	defaultNavigationOptions: ({navigation}) => ({
		headerLeft: <TouchableOpacity onPress={() => navigation.openDrawer()} 
									style={{flexDirection: 'row', 
									alignItems: 'center' 
					}}>
		              <MaterialCommunityIcons name="menu" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
								</TouchableOpacity>,

		headerRight:  <TouchableOpacity onPress = {() => navigation.navigate('d_form')} style={{flexDirection: 'row', alignItems: 'center' }}>
		              	<MaterialCommunityIcons name="plus" size={26} color="#316538" style={{marginRight: 15}} />
		            </TouchableOpacity>,

    })

}

)

export default MainNavigator