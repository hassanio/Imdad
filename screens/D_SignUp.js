import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import Logo from '../components/Logo/Logo.js';
import logo_styles from '../components/Logo/styles.js';
import SignUpForm from '../components/SignUpForm/SignUpForm.js';
import { DeviceEventEmitter } from 'react-native';
import TextButton from '../components/TextInput/InputwithButton.js';
import textbutton_styles from '../components/TextInput/styles.js';

const usr = 'Username';
const pwd = 'Password';
const login = 'Login';
const login_text = 'Already have an account? Login'

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/20;
const BORDER_RADIUS = 10;

console.disableYellowBox = true


modified_button = JSON.parse(JSON.stringify(textbutton_styles))



class D_SignUp extends Component {
  componentDidMount(){
  }
  componentDidUnmount(){
  }

  handleChangeUsr = () => {

  }

  handleChangePwd = () => {
    
  }

  render() {

    modified_button.container.height = INPUT_HEIGHT
    modified_button.buttonText.fontWeight = '200'
    modified_button.buttonText.fontSize = INPUT_HEIGHT/2
    modified_button.container.marginVertical = 0
    modified_button.container.top = 0
    modified_button.container.backgroundColor = '#316538'
    modified_button.buttonText.color = '#FFFFFF'





    return (
        <Container>
          <StatusBar backgroundColor="grey" barStyle="light-content" />
          <KeyboardAvoidingView style = {{flex: 0}}
          behavior='padding'
          keyboardVerticalOffset={imageHeight/5}
          >
                  <SignUpForm />
                  <TextButton
                    buttonText={login_text}
                    onPress={this.handle_NGO_press}
                    my_style = {modified_button}
                    />
          </KeyboardAvoidingView>
        </Container>
    );
  }
}

export default D_SignUp;
