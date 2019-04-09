import propTypes from 'prop-types';
import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';
import color from 'color';

const TextButton = ({buttonText, my_style, onPress }) => {

  const containerStyles = my_style.container

  const underlayColor = color(my_style.$buttonBackgroundColorBase).darken(
    my_style.$buttonBackgroundColorModifier,
  );

  return (
    <View style={containerStyles}>
      <TouchableHighlight
        onPress={onPress}
      >
        <Text style={my_style.buttonText}>{buttonText}</Text>
      </TouchableHighlight>
    </View>
  );
};


TextButton.propTypes = {
  onPress: propTypes.func,
  buttonText: propTypes.string,
  editable: propTypes.bool,
};

export default TextButton;