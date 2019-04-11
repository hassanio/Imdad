import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

const Logo = ({my_style}) => (

  <View style={my_style.container} >
    <ImageBackground
      resizeMode="contain"
      style={my_style.containerImage}
      source={require('./images/background.jpg')}
    >
    </ImageBackground>
  </View>
);

export default Logo;