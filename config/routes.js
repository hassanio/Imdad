import { StackNavigator } from 'react-navigation'
import Main from '../screens/MAIN'
import D_Login from '../screens/D_Login'
import D_SignUp from '../screens/D_SignUp'

const Navigator=StackNavigator({
	home: {
		screen: D_SignUp,
		path:'login/:user',
		navigationOptions: {
			header: null
		}
	},
})

export default Navigator
