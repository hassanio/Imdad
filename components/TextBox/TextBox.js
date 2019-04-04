import propTypes from 'prop-types';
import React from 'react';
import { View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';
import color from 'color';

import styles from './styles';

const TextBox = ({ my_style, label, meta: {error, touched, active} }) => {
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
          <Text style={my_style.buttonText}>{label}</Text>
        </TouchableHighlight>
        <View style={my_style.separator} />
        <TextInput style={my_style.input} underlineColorAndroid="transparent"/>
      </View>
  );
};

export default TextBox;
