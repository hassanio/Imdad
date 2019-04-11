import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import TextBox from '../TextBox/TextBox.js';
import textbox_styles from '../TextBox/styles.js';
import formFields from './formFields'
import { Dimensions, Platform, View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';

const login = 'Sign Up';
const login_text = 'Already have an account? Login'

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/12;
const BORDER_RADIUS = 10;


modified_textbox = JSON.parse(JSON.stringify(textbox_styles))


modified_textbox.container.height = imageHeight/15
modified_textbox.buttonContainer.height = imageHeight/15
modified_textbox.separator.height = imageHeight/15
modified_textbox.container.marginVertical = 10
modified_textbox.container.top = 0



class SignUpForm extends Component {

	renderFields() {

		return (
			formFields.map(({label, name}) => {
				return <Field key = {name} component = {TextBox} type='text' name={name} label={label} my_style = {modified_textbox} />
			})
		)
	}

	render() {

		modified_SignUpbutton = JSON.parse(JSON.stringify(textbutton_styles))
    	modified_SignUpbutton.container.height = imageHeight/10
		modified_SignUpbutton.container.top = imageHeight/50
		
		let modified_button = JSON.parse(JSON.stringify(textbutton_styles))
		modified_button.container.height = INPUT_HEIGHT
		modified_button.buttonText.fontWeight = '200'
		modified_button.buttonText.fontSize = imageHeight/40
		modified_button.container.marginVertical = 0
		modified_button.container.top = 0
		modified_button.container.backgroundColor = '#316538'
		modified_button.buttonText.color = '#FFFFFF'
		modified_button.c


		return(
				<View style = {{flex: 1, paddingTop: imageHeight/10}}>
					{this.renderFields()}
					<TextButton
			        buttonText={login}
			        onPress={this.handle_NGO_press}
			        my_style = {modified_SignUpbutton}
			        />
					<TextButton
                    buttonText={login_text}
                    onPress={this.handle_NGO_press}
                    my_style = {modified_button}
                    />
				</View>


		)
	}
}

export default reduxForm({
	form: 'SignUpForm',
	destroyOnUnmount: false,
})(SignUpForm)