import React from 'react'
import { Text } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import D_Feed from '../screens/D_Feed'
import D_Profile from '../screens/D_Profile'
import Help from '../screens/Help'

const DrawerStack = createDrawerNavigator({
  feed: { screen: D_Feed },
  profile: { screen: D_Profile },
  help: { screen: Help },
})

export default DrawerStack