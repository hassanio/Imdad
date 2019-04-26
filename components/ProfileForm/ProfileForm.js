import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import TextBox from '../TextBox/TextBox.js';
import textbox_styles from '../TextBox/styles.js';
import formFields from './formFields'
const axios = require('axios')
import { Dimensions, View, Text} from 'react-native';
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
		errors.contact = 'Required!'
	}

	if (!values.address) {
		errors.address = 'Required!'
	}

	if (!values.location) {
		errors.location = 'Required!'
	}
	return errors
}

class ProfileForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: ''
		}
    }

    renderImage(img_url) {
        return (
            <View style = {styles.avatarViewStyle}>
                <Avatar
                    size = 'xlarge'
                    rounded
                    source = {{ uri: img_url }}
                    imageProps = {{ resizeMode: 'stretch'}}
                    containerStyle = {styles.avatarContainer}
                />
            </View>
        )
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
					return <Field key = {name} component = {TextBox} type={type} name={name} secure = {false} label={label} my_style = {modified_textbox} />	
				}
			})
		)
    }
    

	render() {

        const { handleSubmit, initialValues }  = this.props;
        
		modified_SignUpbutton = JSON.parse(JSON.stringify(textbutton_styles))
    	modified_SignUpbutton.container.height = imageHeight/10
		modified_SignUpbutton.container.top = imageHeight/50

		return(
				<View style = {{flex: 1, paddingTop: imageHeight/22, justifyContent:'flex-end'} }>
                    {this.renderImage(initialValues.image)}
					{this.renderFields()}
					<TextButton
			        buttonText={"Save Changes"}
			        // onPress={handleSubmit(this.submitForm.bind(this))}
			        my_style = {modified_SignUpbutton}
			        />
			        <Text>{this.state.error}</Text>
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
        paddingBottom: imageHeight/25
    },
    avatarContainer: {
        marginVertical: imageHeight/25,
    },
}


export default reduxForm({
    form: 'ProfileForm',
    validate
})(ProfileForm)