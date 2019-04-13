import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthNavigator from './authroutes'
import Main from '../screens/MAIN'
import AuthLoadingScreen from '../screens/AuthLoading'
import D_Login from '../screens/D_Login'
import D_SignUp from '../screens/D_SignUp'
import D_Feed from '../screens/D_Feed'

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
    Feed: D_Feed,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

