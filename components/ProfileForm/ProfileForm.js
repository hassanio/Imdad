import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import TextBox from '../TextBox/TextBox.js';
import textbox_styles from '../TextBox/styles.js';
import formFields from './formFields'
import renderPicker from '../Picker/Picker.js'
const axios = require('axios')
import { Item, ToastAndroid, ActivityIndicator, Dimensions, View, Text, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements'

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

modified_textbox = JSON.parse(JSON.stringify(textbox_styles))
modified_textbox.container.height = imageHeight/15
modified_textbox.buttonContainer.height = imageHeight/15
modified_textbox.separator.height = imageHeight/15
modified_textbox.container.marginVertical = 10
modified_textbox.container.top = 0

const validate = values => {
	const errors = {}

	if (!values.name) {
		errors.name = 'Required!'
	}

	if (!values.contact) {
		errors.contact = '(Required) '
	} else if (isNaN(values.contact) || (values.contact).toString().indexOf('.') !== -1 || (values.contact).toString().indexOf('-') !== -1) {
		errors.contact = '(Invalid) '
	}

	if (!values.address) {
		errors.address = 'Required!'
	}

	if (!values.location || values.location == 'None') {
		errors.location = 'Required!'
	}

	return errors
}

class ProfileForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: '',
			loading: false
		}
    }

    renderImage(img_url) {

    	if (this.props.navigation.state.params == undefined) {
			src = { uri: img_url }
		} else {
			src = {uri: this.props.navigation.state.params.image}
		}

        return (
            <TouchableOpacity  onPress = {() => {this.props.navigation.navigate('cam',{ returnToRoute: this.props.navigation.state })}} style = {styles.avatarViewStyle}>
                <Avatar
                    size = 'xlarge'
                    rounded
                    source = {src}
                    imageProps = {{ resizeMode: 'stretch'}}
                    containerStyle = {styles.avatarContainer}
                />
                <Text
			        style = {{
			        	paddingBottom: imageHeight/50,
			        	color: '#FFFFFF',

			        }}
			        >
			        	(Tap to edit image)
			    </Text>
            </TouchableOpacity>
        )
    }

    renderSubmitButton(handleSubmit) {
		if (this.state.loading) {
			return <ActivityIndicator color='#CAEEA2' size='large'/>
		} else {

			modified_SignUpbutton = JSON.parse(JSON.stringify(textbutton_styles))
			modified_SignUpbutton.container.height = imageHeight/15
			modified_SignUpbutton.container.top = imageHeight/50
			modified_SignUpbutton.buttonText.fontSize = imageHeight/30

			return <TextButton
			buttonText={"Save Changes"}
			onPress={handleSubmit(this.submitForm.bind(this))}
			my_style = {modified_SignUpbutton}
			/>
		}
	}

	async submitForm(values) {

		try {

			let photo = {}

			if (!this.props.navigation.state.params || !this.props.navigation.state.params.image) {
				
				photo = {
					uri: this.props.initialValues.image,
					type: 'image/jpeg',
					name: 'photo.jpg'
				}

			} else {
				
				photo = {
				uri: this.props.navigation.state.params.image,
				type: 'image/jpeg',
				name: 'photo.jpg'
				}

			}

			let formData = new FormData();
			
			formData.append('image', photo)
			
			Object.keys(values).forEach(key => {
				formData.append(key, values[key])
			})

			this.setState({ loading: true })
			const res = await axios.post('https://young-castle-56897.herokuapp.com/updateProfile', formData, {
				headers: { 
					'content-type': `multipart/form-data`,
					authorization: this.props.token
				}
			})
			this.setState({ loading: false })

			ToastAndroid.show("Changes Saved Successfully!", ToastAndroid.LONG)

        	this.props.navigation.navigate('feed')

        	this.props.fetch_profile()
        }
        catch(err) {

        	this.setState({ loading: false })
        	console.log(JSON.stringify(err.response))
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

        const { handleSubmit, initialValues } = this.props;
        
		modified_SignUpbutton = JSON.parse(JSON.stringify(textbutton_styles))
    	modified_SignUpbutton.container.height = imageHeight/10
		modified_SignUpbutton.container.top = imageHeight/50

		return(
				<View style = {{flex: 1, paddingTop: imageHeight/22, justifyContent:'flex-end'} }>
                    {this.renderImage(initialValues.image)}
					{this.renderFields()}
					{this.renderSubmitButton(handleSubmit)}
				</View>


		)
	}
}

const styles = {
    avatarViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#316538',
        paddingBottom: imageHeight/50,
    },
    avatarContainer: {
        marginVertical: imageHeight/50,
    },
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	}
}

export default reduxForm({
    form: 'ProfileForm',
    validate,
})(connect(mapStateToProps, null)(ProfileForm))