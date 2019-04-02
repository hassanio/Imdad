import propTypes from 'prop-types';
import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';
import color from 'color';

import styles from './styles';

const TextButton = (props) => {
  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier,
  );

  const containerStyles = [styles.container];

  return (
    <View style={containerStyles}>
      <TouchableHighlight
        //onPress={props.onPress}
      >
        <Text style={styles.buttonText}>{props.buttonText}</Text>
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