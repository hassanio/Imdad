import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Main from '../screens/MAIN'
import D_Login from '../screens/D_Login'
import D_Feed from '../screens/D_Feed'
import D_SignUp from '../screens/D_SignUp'
import DrawerStack from './DrawerNav'
import { Dimensions } from 'react-native'
import CustomHeader from '../components/Header/Header.js'
import React from 'react'

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const FeedNavigator=createStackNavigator({
	feed: {
		screen: D_Feed,
	},

	drawer: {
		screen: DrawerStack
	}

},

{
	initialRouteName: 'feed',
	defaultNavigationOptions: {
		header: ({navigation}) => {<CustomHeader navigation={navigation}/>},
	}
}

)

export default FeedNavigator