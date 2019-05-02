import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import TextBox from '../TextBox/TextBox.js';
import textbox_styles from '../TextBox/styles.js';
import formFieldsDonor from './formFieldsDonor'
import formFieldsNGO from './formFieldsNGO'
import { ActivityIndicator, Dimensions, Platform, View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';


const login = 'Login';
const signup_text = 'Dont have an account? Sign up'

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/12;
const BORDER_RADIUS = 10;

const validate = values => {
	const errors = {}

	if (!values.username) {
		errors.username = '(Required) '
	}

	if (!values.password) {
		errors.password = '(Required) '
	}

	return errors
}

const required = value => {
	if(!value) {
		return '(Required)'
	}
}

const isEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  '(Invalid email)' : undefined

class LoginForm extends Component {
	constructor(props) {
    super(props);
  }

	submitForm(values) {
		this.props.login(values, this.props.isDonor, this.props.navigation)
	}
	renderFields(formFields) {

		return (
			formFields.map(({label, name}) => {
				if (name == 'password') {
					return <Field key = {name} component = {TextBox} type='text' name={name} label={label} validate={[required]} my_style = {textbox_styles} secure = {true} />
				}
				if (name == 'email') {
					return <Field key = {name} component = {TextBox} type='text' name={name} label={label} validate={[required, isEmail]} my_style = {textbox_styles} secure = {false} />
				}

				return <Field key = {name} component = {TextBox} type='text' name={name} label={label} validate={[required]} my_style = {textbox_styles} secure = {false} />
			})
		)
	}

	renderLoginButton(props) {
		if (props.isLoading) {
			return <ActivityIndicator color='#CAEEA2' size='small'/>
		} else {
			return <TextButton
			buttonText={login}
			onPress={props.handleSubmit(this.submitForm.bind(this))}
			my_style = {textbutton_styles}
			/>

		}
	}

	render() {

		const { isDonor }  = this.props;
		const formFields = isDonor ? formFieldsDonor : formFieldsNGO

		modified_button = JSON.parse(JSON.stringify(textbutton_styles))
		modified_button.container.height = INPUT_HEIGHT
		modified_button.buttonText.fontWeight = '200'
		modified_button.buttonText.fontSize = imageHeight/40
		modified_button.container.marginVertical = 2
		modified_button.container.backgroundColor = '#316538'
		modified_button.buttonText.color = '#FFFFFF'

		return(
				<View style={{flex: 2, justifyContent: 'space-evenly', paddingTop: 20}}>
					{this.renderFields(formFields)}
					{this.renderLoginButton(this.props)}
					{isDonor && <TextButton
						buttonText={signup_text}
						onPress = {() => this.props.navigation.navigate('d_signup')}
						my_style = {modified_button}
						/>}
				</View>


		)
	}
}

const mapStateToProps = (state) => {
	return { 
		errorMsg: state.auth.error,
		authState: state.auth.isAuth,
		isLoading: state.auth.loading
	}
}

export default reduxForm({
	form: 'LoginForm',
})(connect(mapStateToProps, actions)(LoginForm))