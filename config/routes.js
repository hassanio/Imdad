import { StackNavigator } from 'react-navigation'
import Main from '../screens/MAIN'
import D_Login from '../screens/D_Login'

const Navigator=StackNavigator({
	home: {
		screen: D_Login,
        path:'login/:user',
	},
})

export default Navigator;
