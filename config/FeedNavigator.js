import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Main from '../screens/MAIN'
import D_Login from '../screens/D_Login'
import D_Feed from '../screens/D_Feed'
import D_SignUp from '../screens/D_SignUp'
import D_Form from '../screens/D_Form'
import D_Details from '../screens/D_Details'
import Cam from '../screens/Cam'
import DrawerStack from './DrawerNav'
import { Dimensions } from 'react-native'
import React from 'react'
import { Text, View, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation'
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const FeedStack = createStackNavigator({
  feed: { screen: D_Feed },

  d_details: { screen: D_Details },
}, {
    initialRouteName: 'feed',
    defaultNavigationOptions: {
      header: null
    }
})

export default FeedStack