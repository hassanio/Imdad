import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet"
import Navigator from "./config/routes"
import {Alert} from "react-native";
import { DeviceEventEmitter } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

EStyleSheet.build({
  $primaryGreen: "#316538",
  $white: "#FFFFFF",
  $lightGray: "#F0F0F0",
  $border: "#979797",
  $inputText: "#797979",
})

class HelloWorldApp extends Component {
  componentDidMount(){ 
  }
  render(){
      return (
        <Provider store = {store}>
          <Navigator />
        </Provider>
      )
    }
}

export default HelloWorldApp