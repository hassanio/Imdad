import propTypes from 'prop-types';
import React from 'react';
import { Picker, View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';
import color from 'color';

import styles from './styles';


const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier,
  );



const renderPicker = ({ input: { onChange, value }, meta: {error, touched, active}, label, my_style, children}) =>  {

	const containerStyles = my_style.container;

	return	(
		<View style={containerStyles}>
	        <TouchableHighlight
	          style={my_style.buttonContainer}
	          underlayColor={underlayColor}
	        >
	          <Text style={my_style.buttonText}>{label}</Text>
	        </TouchableHighlight>
	        <View style={my_style.separator} />
		  <Picker style = {my_style.input}
		    selectedValue={ value }
		    onValueChange={ value => onChange(value) }
		  >
		    { children }
		  </Picker>
		  {touched && error && <Text style = {{color: 'red'}}>{error}</Text>}
		</View>
		);
}

export default renderPicker