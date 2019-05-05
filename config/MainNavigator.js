import { createSwitchNavigator, createStackNavigator, createAppContainer, DrawerActions } from 'react-navigation';
import Cam from '../screens/Cam'
import D_Details from '../screens/D_Details'
import DrawerStack from './DrawerNav'
import { Dimensions } from 'react-native'
import React from 'react'
import { connect } from 'react-redux' 
import { Image, Text, View, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;


const renderRightButton = ({navigation, isDonor}) => {
	const state = navigation.state

	if(state.routeName === 'drawer' && state.routes[state.index].routeName !== 'd_form' && isDonor) {
		return ( <TouchableOpacity onPress = {() => navigation.navigate('d_form')} style={{flexDirection: 'row', alignItems: 'center' }}>
					<MaterialCommunityIcons name="plus" size={26} color="#316538" style={{marginRight: 15}} />
		</TouchableOpacity> )
	} else if(state.routeName === 'd_details' && !isDonor) {
		return (
			<TouchableOpacity onPress = {() => navigation.navigate('d_form')} style={{flexDirection: 'row', alignItems: 'center' }}>
					<Image source = {require('../assets/images/call.png')} style={{ height: 25, width: 25, marginRight: 15}} />
			</TouchableOpacity>
		)

	} else {
		return <View/>
	}

}

const mapStateToProps = (state) => {
	return {
		isDonor: state.auth.isDonor
	}
}
const ConnectedRightButton = connect(mapStateToProps)(renderRightButton)

const renderLeftButton = (navigation) => {
	//return burger menu
	return  <TouchableOpacity onPress={() => navigation.openDrawer()} style={{flexDirection: 'row', alignItems: 'center' }}>
					<MaterialCommunityIcons name="menu" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
				</TouchableOpacity>
}

const get_title = ({navigation, isDonor}) => {
	const state = navigation.state
	if(state.routeName === 'drawer' && state.routes[state.index].routeName === 'd_form') {
			return <Text style = {{fontWeight: 'bold', fontSize: 20, color: '#316538', alignSelf: 'center', flex: 1, textAlign:"center" }}>Donation Form</Text>
	}
	if(state.routeName === 'drawer') {
		if (state.routes[state.index].routeName === "My Donations" && !isDonor) {
			return <Text style = {{fontWeight: 'bold', fontSize: 20, color: '#316538', alignSelf: 'center', flex: 1, textAlign:"center" }}>Donations</Text>
		}
		return <Text style = {{fontWeight: 'bold', fontSize: 20, color: '#316538', alignSelf: 'center', flex: 1, textAlign:"center" }}>{state.routes[state.index].routeName}</Text>

	}

	return <Text style = {{fontWeight: 'bold', fontSize: 20, color: '#316538', alignSelf: 'center', flex: 1, textAlign:"center" }}>Donation Details</Text>
}

const ConnectedTitle = connect(mapStateToProps)(get_title)



const MainNavigator= createStackNavigator({
	drawer: {
		screen: DrawerStack
	},

	cam: { 
		screen: Cam,
		navigationOptions: ({ navigation }) => {
			return {
				headerRight: <View/>,
				headerLeft: <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center' }}>
													<AntDesign name="arrowleft" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
										</TouchableOpacity>
			}
		}
	},
	
	d_details: { 
    screen: D_Details,
    navigationOptions: ({ navigation }) =>	{
			return {
				headerRight: <ConnectedRightButton navigation = {navigation}/>,
				headerLeft: <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center' }}>
													<AntDesign name="arrowleft" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
										</TouchableOpacity>
			}
    }

  }
},
{
	initialRouteName: 'drawer',
	defaultNavigationOptions: ({navigation}) => ({
		headerTitle: <ConnectedTitle navigation = {navigation}/>,
		headerLeft: renderLeftButton(navigation),
		headerRight:  <ConnectedRightButton navigation = {navigation}/>,
    })

}

)

export default MainNavigator