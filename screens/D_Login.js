import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { ToastAndroid, Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import Logo from '../components/Logo/Logo.js';
import logo_styles from '../components/Logo/styles.js';
import LoginForm from '../components/LoginForm/LoginForm.js';
import { DeviceEventEmitter } from 'react-native';
import TextButton from '../components/TextInput/InputwithButton.js';
import textbutton_styles from '../components/TextInput/styles.js';
const usr = 'Username';
const pwd = 'Password';
const login = 'Login';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/20;
const BORDER_RADIUS = 10;

console.disableYellowBox = true

class D_Login extends Component {

  render() {
    return (
        <Container>
        <StatusBar barStyle="light-content" backgroundColor = '#316538' />
          <KeyboardAvoidingView style = {{flex: 1}} behavior='padding'
          keyboardVerticalOffset={Header.HEIGHT - imageHeight/10}
          >
                <Logo
                  my_style = {logo_styles}
                />
                  <LoginForm navigation={this.props.navigation}/>
          </KeyboardAvoidingView>
        </Container>
    );
  }
}

export default D_Login;
