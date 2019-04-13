import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthNavigator from './authroutes'
import Main from '../screens/MAIN'
import AuthLoadingScreen from '../screens/AuthLoading'
import D_Login from '../screens/D_Login'
import D_SignUp from '../screens/D_SignUp'

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

