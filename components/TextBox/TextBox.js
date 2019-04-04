import propTypes from 'prop-types';
import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';
import color from 'color';

import styles from './styles';

const TextBox = ({keyboardType, buttonText, my_style}) => {
  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier,
  );

  const containerStyles = my_style.container;

  return (
    <View style={containerStyles}>
      <TouchableHighlight
        //onPress={props.onPress}
        style={my_style.buttonContainer}
        underlayColor={underlayColor}
      >
        <Text style={my_style.buttonText}>{buttonText}</Text>
      </TouchableHighlight>
      <View style={styles.separator} />
      <TextInput style={my_style.input} underlineColorAndroid="transparent" {...{...keyboardType, ...buttonText ,...my_style}} />
    </View>
  );
};

export default TextBox;
