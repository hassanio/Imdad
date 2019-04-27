import { createSwitchNavigator, createStackNavigator, createAppContainer, DrawerActions } from 'react-navigation';
import Main from '../screens/MAIN'
import D_Login from '../screens/D_Login'
import D_Feed from '../screens/D_Feed'
import D_SignUp from '../screens/D_SignUp'
import DrawerStack from './DrawerNav'
import { Dimensions } from 'react-native'
import React from 'react'
import { Text, View, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;


const renderRightButton = (navigation) => {
	const state = navigation.state
	const currRouteName = state.routes[state.index].routeName

	if(currRouteName !== 'd_form' && currRouteName !== 'cam') {
		return <TouchableOpacity onPress = {() => navigation.navigate('d_form')} style={{flexDirection: 'row', alignItems: 'center' }}>
					<MaterialCommunityIcons name="plus" size={26} color="#316538" style={{marginRight: 15}} />
				</TouchableOpacity>
	}


}

const renderLeftButton = (navigation) => {
	const state = navigation.state
	const currRoute = state.routes[state.index]
	const currRouteName = currRoute.routeName

	//If camera, return back arrow
	if(currRouteName === 'cam') {
		return  <TouchableOpacity onPress={() => navigation.navigate(currRoute.params.returnToRoute.routeName)} style={{flexDirection: 'row', alignItems: 'center' }}>
					<AntDesign name="arrowleft" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
				</TouchableOpacity>
	} 

	//Otherwise return burger menu
	return  <TouchableOpacity onPress={() => navigation.openDrawer()} style={{flexDirection: 'row', alignItems: 'center' }}>
					<MaterialCommunityIcons name="menu" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
				</TouchableOpacity>


}
const MainNavigator= createStackNavigator({
	drawer: {
		screen: DrawerStack
	}
},
{
	initialRouteName: 'drawer',
	defaultNavigationOptions: ({navigation}) => ({
		headerLeft: renderLeftButton(navigation),
		headerRight:  renderRightButton(navigation)
    })

}

)

export default MainNavigator