import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { View, Text, Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import { DeviceEventEmitter } from 'react-native';

class Help extends Component {

  render() {

    return (
        <Container>
        <StatusBar barStyle="light-content" backgroundColor = '#316538' />
          <Text>Help</Text>
        </Container>
    );
  }
}

export default Help;

