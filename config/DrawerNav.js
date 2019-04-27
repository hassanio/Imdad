import React from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Text, View, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import FeedStack from './FeedNavigator.js'
import D_Profile from '../screens/D_Profile'
import Help from '../screens/Help'
import D_Form from '../screens/D_Form'
import Cam from '../screens/Cam'
import CustomDrawer from '../screens/CustomDrawer.js'


const DrawerStack = createDrawerNavigator({
  Feed: { screen: FeedStack },
  Profile: { screen: D_Profile },
  'Help and Hints': { screen: Help },
  d_form: { screen: D_Form },
  cam: { screen: Cam }
}, {
  contentComponent: CustomDrawer,
  contentOptions: {
    activeTintColor: '#316538',
  }
})

export default DrawerStack