import React, { Component } from 'react';
import { Dimensions, View, Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import Logo from '../components/Logo/Logo.js';
import logo_styles from '../components/Logo/styles.js';
import TextButton from '../components/TextInput/InputwithButton.js';
import textbutton_styles from '../components/TextInput/styles.js';
import { DeviceEventEmitter } from 'react-native';
const DONOR_TEXT = 'LOGIN AS DONOR';
const NGO_TEXT = 'LOGIN AS NGO';

import { AsyncStorage } from "react-native"

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;




class Main extends Component {

  
  render() {

    return (
      <Container>
      <StatusBar barStyle="default"/>
        <Logo
         my_style = {logo_styles}
         />
         <View style = {{flex: 2, paddingTop: imageHeight/10}}>
          <TextButton
            buttonText={DONOR_TEXT}
            onPress={() => this.props.navigation.navigate('d_login')}
            my_style = {textbutton_styles}
          />
          <TextButton
            buttonText={NGO_TEXT}
            onPress={this.handle_NGO_press}
            my_style = {textbutton_styles}
          />
        </View>
      </Container>
    );
  }
}

export default Main;
