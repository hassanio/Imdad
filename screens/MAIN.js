import React, { Component } from 'react';
import { Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { TextButton } from '../components/TextInput';
import { DeviceEventEmitter } from 'react-native';
const DONOR_TEXT = 'LOGIN AS DONOR';
const NGO_TEXT = 'LOGIN AS NGO';

class Main extends Component {
  componentDidMount(){
  }
  componentDidUnmount(){
  }

  handle_donor_press = () => {

  }

  handle_NGO_press = () => {
    
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="grey" barStyle="light-content" />
        <Logo />
        <TextButton
          buttonText={DONOR_TEXT}
          onPress={this.handle_donor_press}
        />
        <TextButton
          buttonText={NGO_TEXT}
          onPress={this.handle_NGO_press}
        />
      </Container>
    );
  }
}

export default Main;
