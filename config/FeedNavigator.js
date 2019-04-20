import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import D_Feed from '../screens/D_Feed'
import D_Details from '../screens/D_Details'
import D_Form from '../screens/D_Form'

const FeedStack = createSwitchNavigator({
  feed: { screen: D_Feed },
  d_details: { screen: D_Details },
}, {
    initialRouteName: 'feed',
})

export default FeedStack