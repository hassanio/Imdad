import propTypes from 'prop-types';
import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import color from 'color';

import styles from './styles';
const LoginButton = (props) => {
	return (
		<View style={styles.button}>
			<Text>   </Text>
			<Button
				onPress={props.onPress}
				title='Login'
				color='#9E9E9E'
			/>
		</View>
		)
}

LoginButton.propTypes = {
  onPress: propTypes.func,
  buttonText: propTypes.string,
  editable: propTypes.bool,
};

export default LoginButton