import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import SignUpForm from '../components/SignUpForm/SignUpForm.js';
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
                  <SignUpForm navigation={this.props.navigation} />
          </KeyboardAvoidingView>
        </Container>
    );
  }
}

export default D_SignUp;
