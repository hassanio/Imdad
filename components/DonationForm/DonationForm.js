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
import { ToastAndroid, Item, Image, Dimensions, Platform, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';

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

	if (!values.description) {
		errors.description = 'Required!'
	}

	if (!values.contact) {
		errors.contact = 'Required!'
	}

	if (!values.collection_address) {
		errors.collection_address = 'Required!'
	}

	if (!values.location || values.location == 'None') {
		errors.location = 'Required!'
	}

	if (!values.categories || values.categories == 'None') {
		errors.categories = 'Required!'
	}
	return errors
}

class DonationForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: ''
		}
	}

	async submitForm(values) {



		try {

			if (!this.props.navigation.state.params || !this.props.navigation.state.params.image) {
				ToastAndroid.show("Image Missing!", ToastAndroid.LONG)
				return
			}

				let formData = new FormData();
				const photo = {
					uri: this.props.navigation.state.params.image,
					type: 'image/jpeg',
					name: 'photo.jpg'
				}
				formData.append('image', photo)
	        	console.log(JSON.stringify(formData))
            // Submit SignUp credentials to server
         //    const res = await axios.post('https://young-castle-56897.herokuapp.com/auth/donor/signup', values)

         //    //Store token in AsyncStorage
         //    console.log(JSON.stringify(res))

        	// this.setState({error: "Successful" })



        }
        catch(err) {

        	// console.log(JSON.stringify(err.response))
        	if (err.response) {
            	this.setState({error: err.response.data.error })
        	}
            else if (err.request) {
            	this.setState({error: "No network connection!" })
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
					if (name == 'categories') {
						return (
							<Field
							    name={name}
							    label = {label}
							    component={ renderPicker }
							    my_style = {modified_textbox}
							>
								<Item label="None" value="None" />
							    <Item label="Food" value="FOOD" />
							    <Item label="Clothing" value="CLOTHING" />
							    <Item label="HOUSEHOLD" value="HOUSEHOLD" />
							    <Item label="OTHER" value="OTHER" />
							</Field>
							)
					}
					if (name == 'location') {
						return (
							<Field
							    name={name}
							    label = {label}
							    component={ renderPicker }
							    my_style = {modified_textbox}
							>
								<Item label="None" value="None" />
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

	render() {

		const { handleSubmit }  = this.props;

		modified_SignUpbutton = JSON.parse(JSON.stringify(textbutton_styles))
    	modified_SignUpbutton.container.height = imageHeight/15
		modified_SignUpbutton.container.top = imageHeight/50
		modified_SignUpbutton.buttonText.fontSize = imageHeight/30

		// console.log(this.props.navigation.state.params)

		if (this.props.navigation.state.params == undefined) {
			src = require('../no_img.png')
		} else {
			src = {uri: this.props.navigation.state.params.image}
		}

		return(
				<View style = {{flex: 1, paddingTop: imageHeight/22, justifyContent:'flex-end'} }>
					<TouchableOpacity onPress = {() => {this.props.navigation.navigate('cam')}} style = {{ flexDirection: 'row', justifyContent:'center', allignItems: 'center', paddingTop: imageHeight/40}}>
					<Image 
					style = {{
						height: imageHeight/5,
						width: imageHeight/5,
						borderRadius: 15
					}}
			          source={src}
			        />
			        <Text
			        style = {{
			        	paddingTop: imageHeight/11,
			        	paddingLeft: imageWidth/20,
			        	color: '#FFFFFF',
			        }}
			        >
			        	(Click to upload image)
			        </Text>
			        </TouchableOpacity>
					{this.renderFields()}
					<Text>{this.state.error}</Text>
					<TextButton
			        buttonText={"Submit"}
			        onPress={handleSubmit(this.submitForm.bind(this))}
			        my_style = {modified_SignUpbutton}
			        />
				</View>


		)
	}
}

export default reduxForm({
	form: 'DonationForm',
	validate,
	destroyOnUnmount: false,
})(DonationForm)