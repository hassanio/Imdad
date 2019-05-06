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
import { ImagePicker } from 'expo';
import { Permissions, ImageManipulator } from 'expo';
import { StyleSheet, Item, ToastAndroid, ActivityIndicator, Dimensions, View, Text, TouchableOpacity} from 'react-native';
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
			loading: false,
			is_image: false,
			image: null,
			hasCameraPermission: null,
		}
    }

    renderImage(img_url) {

		if (this.state.image == null) {
			src = { uri: img_url }
		} else {
			src = {uri: this.state.image}
		}

        return (
            <TouchableOpacity disabled={this.state.is_image ? true : false}  onPress = {() => {this.setState({is_image: true})}} style = {styles.avatarViewStyle}>
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

	async submitForm(values) {

		try {

			let photo = {}

			if (!this.state.image) {

				if (this.props.initialValues.image !== undefined) {

					img_type = ((this.props.initialValues.image).split(".").pop())
					if (img_type == "jpg") {
						img_type = "jpeg"
					}
					const type_ = "image/" + img_type;
					const name_ = "photo." + ((this.props.initialValues.image).split(".").pop());
					
					photo = {
						uri: this.props.initialValues.image,
						type: type_,
						name: name_
					}

				}

			} else {

				img_type = ((this.state.image).split(".").pop())
				if (img_type == "jpg") {
					img_type = "jpeg"
				}
				const type_ = "image/" + img_type;
				const name_ = "photo." + ((this.state.image).split(".").pop());
				
				photo = {
					uri: this.state.image,
					type: type_,
					name: name_
				}

			}

			let formData = new FormData();

			console.log(this.props.initialValues.image)

			if (this.props.initialValues.image != null || this.state.image != null) {
				console.log("HERE")
				formData.append('image', photo)
			} 
						
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

        	this.props.navigation.navigate('My Donations')

        	this.props.fetch_profile()
        }
        catch(err) {

			this.setState({ loading: false })
			
			console.log(JSON.stringify(err))

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

	_pickImage = async () => {

	    let result = await ImagePicker.launchImageLibraryAsync({
	      allowsEditing: true,
	      aspect: [4, 3],
	    });

	if (!result.cancelled) {
      const resizedPhoto = await ImageManipulator.manipulateAsync(result.uri, [
        { resize: { width: 300, height: 400 }}
	  ])
	  this.setState({ image: resizedPhoto.uri });

    }
	}

	PickImage = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    	this.setState({ hasCameraPermission: status === 'granted' })
    	const { hasCameraPermission } = this.state

	    if (hasCameraPermission === null) {
	      return null
	    }
	    else if (hasCameraPermission === false) {
	      return null
	    }

		let pickerResult = await ImagePicker.launchCameraAsync({
		  allowsEditing: false,
		});

		if (!pickerResult.cancelled) {
			const resizedPhoto = await ImageManipulator.manipulateAsync(pickerResult.uri, [
		        { resize: { width: 300, height: 400 }}
			  ])
			this.setState({image: resizedPhoto.uri});
		}

		console.log(this.state.image)
		
	};






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
				<View style = {{height: imageHeight, width: imageWidth, paddingTop: imageHeight/10 ,paddingLeft: imageWidth/20,paddingRight: imageWidth/20, paddingBottom: imageHeight/10, justifyContent:'center', allignItems: 'center'} }>
                    {this.renderImage(initialValues.image)}
					{this.renderFields()}
					{this.renderSubmitButton(handleSubmit)}
					{this.state.is_image && <View pointerEvents={'auto'} style = {{
												height: imageHeight,
												width: imageWidth,
												position: 'absolute',
											    alignItems: 'center',
											    justifyContent: 'center',
											    paddingBottom: imageHeight/4,


											}}>
							<View style = {{
								height: imageHeight/3,
								width: imageWidth/1.2,
								backgroundColor: 'white',
								flexDirection: 'column',
								borderRadius: 10,
								borderWidth: 2,
								borderColor: 'grey'
							}}>
							<Text style = {{paddingTop: imageHeight/50, paddingBottom: imageHeight/50, fontWeight: '600', fontSize: 20, paddingLeft: imageWidth/40}}>Add image from..</Text>
							<View style = {{height: StyleSheet.hairlineWidth,
										    width: imageWidth/1.2,
										    backgroundColor: '#dcdcdc',}}/>
							<TouchableOpacity onPress = {() => {
								this.setState({is_image: false})
								this.PickImage()

							}}
								   style = {{paddingLeft: imageWidth/50, paddingTop: imageHeight/50, paddingLeft: imageWidth/40, paddingBottom: imageHeight/50}}>
								   <Text style={{fontWeight: '600', fontSize: 20, color: '#696969'}}>Camera</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress= {() => {
													this.setState({is_image: false})
													this._pickImage()
												}}
								   style = {{paddingLeft: imageWidth/50, paddingTop: imageHeight/50, paddingLeft: imageWidth/40, paddingBottom: imageHeight/50}}>
								   <Text style={{fontWeight: '600', fontSize: 20, color: '#696969'}}>Gallery</Text>
							</TouchableOpacity>
							<View style = {{height: StyleSheet.hairlineWidth,
										    width: imageWidth/1.2,
										    backgroundColor: '#dcdcdc',}}/>
							<TouchableOpacity onPress= {() => {
													this.setState({is_image: false})
													console.log("FALSED")
												}}
								   style = {{paddingTop: imageHeight/50, paddingLeft: imageWidth/40, paddingBottom: imageHeight/50}}>
								   <Text style={{fontWeight: '600', fontSize: 20, textAlign: 'center' , color: 'red'}}>Close</Text>
								   </TouchableOpacity>

							</View>
					</View>}
					{this.state.loading && <View style = {{
												height: imageHeight,
												width: imageWidth,
												marginLeft: 0,
												position: 'absolute',
											    alignItems: 'center',
											    justifyContent: 'center',
									            opacity: 0.6,
									            backgroundColor: '#808080',
											}}>
							<ActivityIndicator color='#CAEEA2' size='large'/>
					</View>}
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
		token: state.auth.token,
		isDonor: state.auth.isDonor
	}
}

export default reduxForm({
    form: 'ProfileForm',
    validate,
})(connect(mapStateToProps, null)(ProfileForm))