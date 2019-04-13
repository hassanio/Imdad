import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import Logo from '../components/Logo/Logo.js';
import logo_styles from '../components/Logo/styles.js';
import SignUpForm from '../components/SignUpForm/SignUpForm.js';
import { DeviceEventEmitter } from 'react-native';
import TextButton from '../components/TextInput/InputwithButton.js';
import textbutton_styles from '../components/TextInput/styles.js'

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/20;
const BORDER_RADIUS = 10;

console.disableYellowBox = true




class D_SignUp extends Component {

  render() {

    return (
        <Container>
        <StatusBar barStyle="light-content" backgroundColor='#316538' />
          <KeyboardAvoidingView style = {{flex: 1}}
          behaviour = 'padding'
          keyboardVerticalOffset={Header.HEIGHT}
          >
                  <SignUpForm />
          </KeyboardAvoidingView>
        </Container>
    );
  }
}

export default D_SignUp;
