import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import Logo from '../components/Logo/Logo.js';
import logo_styles from '../components/Logo/styles.js';
import TextButton from '../components/TextInput/InputwithButton.js';
import textbutton_styles from '../components/TextInput/styles.js';
import TextBox from '../components/TextBox/TextBox.js';
import textbox_styles from '../components/TextBox/styles.js';
import { DeviceEventEmitter } from 'react-native';
const usr = 'Username';
const pwd = 'Password';
const login = 'Login';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/12;
const BORDER_RADIUS = 10;

class D_Login extends Component {
  componentDidMount(){
  }
  componentDidUnmount(){
  }

  handleChangeUsr = () => {

  }

  handleChangePwd = () => {
    
  }

  render() {

    textbutton_styles.container.height = INPUT_HEIGHT

    return (
      <Container>
        <StatusBar backgroundColor="grey" barStyle="light-content" />
        <Logo
          my_style = {logo_styles}
        />
        <TextBox
          buttonText={usr}
          //defaultValue={TEMP_BASE_PRICE}
          keyboardType="numeric"
          onChangeText={this.handleChangeUsr}
          my_style = {textbox_styles}
        />
        <TextBox
          buttonText={pwd}
          //defaultValue={TEMP_BASE_PRICE}
          keyboardType="numeric"
          onChangeText={this.handleChangePwd}
          my_style = {textbox_styles}
        />
        <TextButton
          buttonText={login}
          onPress={this.handle_NGO_press}
          my_style = {textbutton_styles}
        />
      </Container>
    );
  }
}

export default D_Login;
