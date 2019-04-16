import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Main from '../screens/MAIN'
import D_Login from '../screens/D_Login'
import D_SignUp from '../screens/D_SignUp'
import { Dimensions } from 'react-native'
import CustomHeader from '../components/Header/Header.js'
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
		screen: D_Login
	},

	d_signup: {
		screen: D_SignUp
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
    headerTitleStyle: { color: 'white', }
	}
}



)

export default AuthNavigator