import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import TextBox from '../TextBox/TextBox.js';
import textbox_styles from '../TextBox/styles.js';
import formFields from './formFields'
import { ToastAndroid, Dimensions, Platform, View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';


const login = 'Login';
const signup_text = 'Dont have an account? Sign up'

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
	constructor(props) {
    super(props);
  }

	submitForm(values) {
		this.props.loginDonor(values,this.props.navigation)
	}
	renderFields() {

		return (
			formFields.map(({label, name}) => {
				if (name == 'password') {
					return <Field key = {name} component = {TextBox} type='text' name={name} label={label} my_style = {textbox_styles} secure = {true} />
				} else {
					return <Field key = {name} component = {TextBox} type='text' name={name} label={label} my_style = {textbox_styles} secure = {false} />
				}
				
			})
		)
	}

	render() {

		const { handleSubmit, errorMsg, authState}  = this.props;
		
		modified_button = JSON.parse(JSON.stringify(textbutton_styles))
		modified_button.container.height = INPUT_HEIGHT
		modified_button.buttonText.fontWeight = '200'
		modified_button.buttonText.fontSize = imageHeight/40
		modified_button.container.marginVertical = 2
		modified_button.container.backgroundColor = '#316538'
		modified_button.buttonText.color = '#FFFFFF'
	

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
					<TextButton
                    buttonText={signup_text}
                    onPress = {() => this.props.navigation.navigate('d_signup')}
                    my_style = {modified_button}
                    />
				</View>


		)
	}
}

const mapStateToProps = (state) => {
	return { 
		errorMsg: state.auth.error,
		authState: state.auth.isAuth,
	}
}

export default reduxForm({
	form: 'LoginForm',
	validate
})(connect(mapStateToProps, actions)(LoginForm))