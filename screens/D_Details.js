import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { View, Text, Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import { DeviceEventEmitter } from 'react-native';

class D_Feed extends Component {

  render() {

    return (
        <Container>
        <StatusBar barStyle="light-content" backgroundColor = '#316538' />
          <Text>D_Details</Text>
        </Container>
    );
  }
}

export default D_Feed;

