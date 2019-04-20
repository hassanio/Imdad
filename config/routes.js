import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthNavigator from './authroutes'
import MainNavigator from './MainNavigator'
import AuthLoadingScreen from '../screens/AuthLoading'


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

