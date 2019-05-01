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
import { ImagePicker } from 'expo';
import { Permissions, ImageManipulator } from 'expo';
import { StyleSheet, ActivityIndicator, ToastAndroid, Item, Image, Dimensions, Platform, View, TextInput, TouchableOpacity, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';

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
		errors.description = '(Required) '
	}

	if (!values.contact) {
		errors.contact = '(Required) '
	} else if (isNaN(values.contact) || (values.contact).toString().indexOf('.') !== -1 || (values.contact).toString().indexOf('-') !== -1) {
		errors.contact = '(Invalid) '
	}

	if (!values.collection_address) {
		errors.collection_address = '(Required) '
	}

	if (!values.location || values.location == 'None') {
		errors.location = '(Required) '
	}

	if (!values.categories || values.categories == 'None') {
		errors.categories = '(Required) '
	}

	return errors
}

class DonationForm extends Component {

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

	// async uploadImage(imageUri) {
	// 	let mime = 'image/jpeg'
	// 	const blob = await new Promise((resolve, reject) => {
	// 	  const xhr = new XMLHttpRequest();
	// 	  xhr.onload = function() {
	// 		resolve(xhr.response);
	// 	  };
	// 	  xhr.onerror = function(e) {
	// 		console.log(e);
	// 		reject(new TypeError('Network request failed'));
	// 	  };
	// 	  xhr.responseType = 'blob';
	// 	  xhr.open('GET', imageUri, true);
	// 	  xhr.send(null);
	// 	});
  
	// 	const imageName = new Date() + "-photo.jpg"
	// 	const ref = firebase.storage().ref().child('images/' + imageName)

	// 	const snapshot = await ref.put(blob, { contentType: mime })
	// 	const url = await snapshot.ref.getDownloadURL()

	// 	return url
	// }

	async submitForm(values) {

		try {

				if ((this.state.image == null)) {
					ToastAndroid.show("Image Missing!", ToastAndroid.LONG)
					return
				}

				console.log(this.state.image)
				img_type = ((this.state.image).split(".").pop())
				if (img_type == "jpg") {
					img_type = "jpeg"
				}
				const type_ = "image/" + img_type;
				const name_ = "photo." + img_type;

				console.log(name_)
				console.log(type_)
				console.log("-------------")

				let formData = new FormData();
				const photo = {
					uri: this.state.image,
					type: type_,
					name: name_
				}
				formData.append('image', photo)
				
				Object.keys(values).forEach(key => {
					if(key !== 'categories'){
						formData.append(key, values[key])
					} else {
						formData.append("categories[]", values[key])
					}
				})

				this.setState({ loading: true })

				const res = await axios.post('https://young-castle-56897.herokuapp.com/donate', formData, {
					headers: { 
						'content-type': `multipart/form-data`,
						authorization: this.props.token
					}
				})
				this.setState( { loading: false })
				ToastAndroid.show("Submitted Successfully!", ToastAndroid.LONG)

				this.props.navigation.state.params = undefined
				this.state.image = null
				this.props.destroy()
			
        this.props.navigation.navigate('feed')
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
				console.log(JSON.stringify(err.request.data))
				ToastAndroid.show("Unable to process! Please check your internet connection!", ToastAndroid.LONG)
			} 
			else {
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

		console.log(JSON.stringify(pickerResult))

		if (!pickerResult.cancelled) {
			const resizedPhoto = await ImageManipulator.manipulateAsync(pickerResult.uri, [
		        {resize: { width: 300, height: 400 }}
					])
			this.setState({ image: resizedPhoto.uri});
		}
		
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

	renderSubmitButton(handleSubmit) {

			modified_SignUpbutton = JSON.parse(JSON.stringify(textbutton_styles))
			modified_SignUpbutton.container.height = imageHeight/15
			modified_SignUpbutton.container.top = imageHeight/50
			modified_SignUpbutton.buttonText.fontSize = imageHeight/30

			return <TextButton
			buttonText={"Submit"}
			onPress={handleSubmit(this.submitForm.bind(this))}
			my_style = {modified_SignUpbutton}
			/>
	}

	render() {

		const { handleSubmit }  = this.props;

		if (this.props.navigation.state.params != undefined) {
			this.setState({image: this.props.navigation.state.params.image})
			this.props.navigation.state.params = undefined
		}

		if (this.state.image == null) {
			src = require('../../assets/images/no_img.png')
		} else {
			src = {uri: this.state.image}
		}

		return(
				<View  style = {{height: imageHeight, width: imageWidth, paddingLeft: imageWidth/20,paddingRight: imageWidth/20, paddingBottom: imageHeight/10, justifyContent:'center', allignItems: 'center'} }>
					<TouchableOpacity disabled={this.state.is_image ? true : false} onPress = {() => {this.setState({is_image: true})}} style = {{ flexDirection: 'row', justifyContent:'center', allignItems: 'center'}}>
						<Image 
						style = {{
							height: imageHeight/5,
							width: imageHeight/5,
							borderRadius: 15,
							borderWidth: 0.5,
							borderColor: 'grey'

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
							<TouchableOpacity 
									onPress = {() => {
										this.setState({is_image: false})
										this.PickImage()

									}}
								   style = {{paddingLeft: imageWidth/50, paddingTop: imageHeight/50, paddingLeft: imageWidth/40, paddingBottom: imageHeight/50}}>
								   <Text style={{fontWeight: '600', fontSize: 20, color: '#696969'}}>Camera</Text>
							</TouchableOpacity>
							<TouchableOpacity 
										onPress= {() => {
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

const mapStateToProps = state => {
	return {
		token: state.auth.token
	}
}
export default reduxForm({
	form: 'DonationForm',
	validate,
})(connect(mapStateToProps, null)(DonationForm))