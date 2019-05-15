import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import TextBox from '../TextBox/TextBox.js';
import textbox_styles from '../TextBox/styles.js';
import renderPicker from '../Picker/Picker.js'
import formFields from './formFields'
const axios = require('axios')
import { Item, Dimensions, ToastAndroid, ActivityIndicator, View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';

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

const validate = values => {
	const errors = {}

	if (!values.name) {
		errors.name = '(Required) '
	}

	if (!values.username) {
		errors.username = '(Required) '
	}

	if (!values.password) {
		errors.password = '(Required) '
	}

	if (!values.contact) {
		errors.contact = '(Required) '
	}
	else if (isNaN(values.contact) || (values.contact).toString().indexOf('.') !== -1 || (values.contact).toString().indexOf('-') !== -1) {
		errors.contact = '(Invalid) '
	} else if ((values.contact).toString().length > 11) {
		errors.contact = '(Too long) '
	} 

	if (!values.address) {
		errors.address = '(Required) '
	}

	return errors
}

class SignUpForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: '',
			loading: false
		}
	}

	async submitForm(values) {

		try {
        	this.setState({loading: true })

            // Submit SignUp credentials to server
            const res = await axios.post('https://young-castle-56897.herokuapp.com/auth/donor/signup', values)

			this.setState({error: "Successful", loading: false })

			ToastAndroid.show('Signup Successful! Please login again.', ToastAndroid.LONG)
			this.props.navigation.navigate('d_login', { isDonor: true })
			
        }
        catch(err) {

			console.log(JSON.stringify(err))

			this.setState({loading: false })
			
			if (err.response) {
				if (err.response.status === 422) {
					ToastAndroid.show(err.response.data.error, ToastAndroid.LONG)
	
				} else {
					ToastAndroid.show("Unexpected Error Occurred. Try again later", ToastAndroid.LONG)
				}

			}
            else if (err.request) {
            	ToastAndroid.show("Unable to process! Please check your internet connection!", ToastAndroid.LONG)

            } else {
				ToastAndroid.show("Unexpected Error Occurred. Try again later", ToastAndroid.LONG)
			}

        }
	}


	renderFields() {

		return (
			formFields.map(({label, name}) => {
				if (name == 'password') {
					return <Field key = {name} component = {TextBox} type='text' name={name} secure = {true} label={label} my_style = {modified_textbox} />

				} else {
					type = 'text'
					if (name == 'contact') {
						type = 'numeric'
					} 
					if (name == 'location') {
						return (
							<Field
							    name={name}
							    label = {label}
							    component={ renderPicker }
							    my_style = {modified_textbox}
							>
							    <Item label="Karachi" value="Karachi" />
							    <Item label="Lahore" value="Lahore" />
							    <Item label="Islamabad" value="Islamabad" />
							    <Item label="Multan" value="Multan" />
							    <Item label="Quetta" value="Quetta" />
							</Field>
							)
					}
					return <Field key = {name} component = {TextBox} type={type} name={name} secure = {false} label={label} my_style = {modified_textbox} />	
				}
			})
		)
	}

	renderSubmitButton({ handleSubmit }) {
		if(this.state.loading) {
			return <ActivityIndicator color='#CAEEA2' size='small'/>
		} else {
			let modified_SignUpbutton = JSON.parse(JSON.stringify(textbutton_styles))
			modified_SignUpbutton.container.height = imageHeight/10
			modified_SignUpbutton.container.top = imageHeight/50
			
			return <TextButton
			buttonText={login}
			onPress={handleSubmit(this.submitForm.bind(this))}
			my_style = {modified_SignUpbutton}
			/>
		}
	}

	render() {
		let modified_button = JSON.parse(JSON.stringify(textbutton_styles))
		modified_button.container.height = INPUT_HEIGHT
		modified_button.buttonText.fontWeight = '200'
		modified_button.buttonText.fontSize = imageHeight/40
		modified_button.container.marginVertical = 0
		modified_button.container.top = 0
		modified_button.container.backgroundColor = '#316538'
		modified_button.buttonText.color = '#FFFFFF'

		return(
				<View style = {{flex: 1, paddingTop: imageHeight/22, justifyContent:'flex-end'} }>
					{this.renderFields()}
					{this.renderSubmitButton(this.props)}
					<TextButton
					onPress = {() => this.props.navigation.navigate('d_login', { isDonor: true })}
                    buttonText={login_text}
                    my_style = {modified_button}
                    />
				</View>


		)
	}
}

export default reduxForm({
	form: 'SignUpForm',
	validate
})(SignUpForm)