import React from 'react'
import { Text } from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'
import FeedStack from './FeedNavigator.js'
import D_Profile from '../screens/D_Profile'
import Help from '../screens/Help'
import D_Form from '../screens/D_Form'

const DrawerStack = createDrawerNavigator({
  feed: { screen: FeedStack },
  profile: { screen: D_Profile },
  help: { screen: Help },
  d_form: {
    screen: D_Form,
    navigationOptions: {
      drawerLabel: () => null,
      drawerIcon: () => null
    }
  }
}, {
  contentComponent: (props) =>
    {
      return <DrawerItems {...props} />
    }
})

export default DrawerStack