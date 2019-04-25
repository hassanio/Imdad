import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { Container } from '../components/Container';
import CameraComponent from '../components/Camera/Camera.js'

console.disableYellowBox = true

class Cam extends Component {
	componentDidMount(){
		}
	render() {
		return (
				<CameraComponent navigation={this.props.navigation}/>
			)
	}
}


export default Cam