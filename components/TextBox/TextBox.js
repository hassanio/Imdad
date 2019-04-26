import propTypes from 'prop-types';
import React from 'react';
import { Picker, View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';
import color from 'color';

import styles from './styles';

const TextBox = ({ input, my_style, secure, type, label, meta: {error, touched, active} }) => {
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
        <TextInput {...input} value={input.value.toString()}keyboardType = {type} style={my_style.input} secureTextEntry={secure} underlineColorAndroid="transparent"/>
        {touched && error && <Text>{error}</Text>}
      </View>
  );
};

export default TextBox;
