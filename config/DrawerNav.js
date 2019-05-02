import React from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Text, View, Platform, Image, StyleSheet, TouchableOpacity } from "react-native";
import FeedStack from './FeedNavigator.js'
import D_Profile from '../screens/D_Profile'
import Help from '../screens/Help'
import D_Form from '../screens/D_Form'
import CustomDrawer from '../screens/CustomDrawer.js'
import ApprovedDonations from '../screens/ApprovedDonations.js';


const DrawerStack = createDrawerNavigator({
  'My Donations': { screen: FeedStack },
  'My Profile': { screen: D_Profile },
  'Approved Donations': { screen: ApprovedDonations },
  'Help and Hints': { screen: Help },
  d_form: { screen: D_Form },
}, {
  contentComponent: CustomDrawer,
  contentOptions: {
    activeTintColor: '#316538',
  },
})


export default DrawerStack