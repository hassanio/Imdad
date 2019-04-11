import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
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

const validate = values => {
	const errors = {}

	if (!values.username) {
		errors.username = 'Required!'
	}

	if (!values.password) {
		errors.password = 'Required!'
	}

	return errors
}

class LoginForm extends Component {

	submitForm(values) {
		this.props.loginDonor(values)
	}
	renderFields() {

		return (
			formFields.map(({label, name}) => {
				return <Field key = {name} component = {TextBox} type='text' name={name} label={label} my_style = {textbox_styles} />
			})
		)
	}

	render() {

		const { handleSubmit, errorMsg, authState }  = this.props;

    	//textbutton_styles.container.height = INPUT_HEIGHT

		return(
				<View style={{flex: 2, justifyContent: 'space-evenly', paddingTop: 20}}>
					{this.renderFields()}
					<TextButton
			        buttonText={login}
			        onPress={handleSubmit(this.submitForm.bind(this))}
			        my_style = {textbutton_styles}
			        />
					<Text>{errorMsg}</Text>
					<Text>{authState}</Text>
				</View>


		)
	}
}

const mapStateToProps = (state) => {
	return { 
		errorMsg: state.auth.error,
		authState: state.auth.isAuth
	}
}

export default reduxForm({
	form: 'LoginForm',
	validate,
	destroyOnUnmount: false,
})(connect(mapStateToProps, actions)(LoginForm))