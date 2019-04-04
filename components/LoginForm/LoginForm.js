import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import TextBox from '../TextBox/TextBox.js';
import textbox_styles from '../TextBox/styles.js';
import formFields from './formFields'
import { Dimensions, Platform, View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';

const login = 'Login';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/12;
const BORDER_RADIUS = 10;

class LoginForm extends Component {

	renderFields() {

		return (
			formFields.map(({label, name}) => {
				return <Field key = {name} component = {TextBox} type='text' name={name} label={label} my_style = {textbox_styles} />
			})
		)
	}

	render() {

    	textbutton_styles.container.height = INPUT_HEIGHT

		return(
				<View>
					{this.renderFields()}
					<TextButton
			        buttonText={login}
			        onPress={this.handle_NGO_press}
			        my_style = {textbutton_styles}
			        />
				</View>


		)
	}
}

export default reduxForm({
	form: 'LoginForm',
	destroyOnUnmount: false,
})(LoginForm)