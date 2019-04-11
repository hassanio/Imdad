import propTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import color from 'color';

const TextButton = ({onPress, buttonText, my_style }) => {

  const containerStyles = my_style.container

  const underlayColor = color(my_style.$buttonBackgroundColorBase).darken(
    my_style.$buttonBackgroundColorModifier,
  );

  return (
    <View >
      <TouchableOpacity
      onPress={onPress}
      style = {containerStyles}
      >
        <Text style={my_style.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};


TextButton.propTypes = {
  onPress: propTypes.func,
  buttonText: propTypes.string,
  editable: propTypes.bool,
};

export default TextButton;