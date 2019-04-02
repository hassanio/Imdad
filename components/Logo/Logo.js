import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';

import styles from './styles';

const Logo = () => (
  <View style={styles.container} >
    <ImageBackground
      resizeMode="contain"
      style={styles.containerImage}
      source={require('./images/background.jpg')}
    >
    </ImageBackground>
  </View>
);

export default Logo;