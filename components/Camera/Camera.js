import { Camera, Permissions } from 'expo';
import React, { Component } from 'react'
import { Icon, Item, Dimensions, Platform, View, TextInput, TouchableOpacity, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

class CameraComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
		    hasCameraPermission: null,
		    type: Camera.Constants.Type.back
		  }
	}

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  componentWillUnmount() {
    console.log("Camera Closing")
  }

  async snapPhoto() {       
    // console.log('Button Pressed');
    if (this.camera) {
    	this.camera.stopRecording()
	    // console.log('Taking photo');
	    const options = { quality: 1, base64: true, fixOrientation: true };
	    const data = await this.camera.takePictureAsync(options)
	    // console.log("HERE")
      const { routeName, key } = this.props.navigation.getParam('returnToRoute');
      // console.log(routeName, key)
	    this.props.navigation.navigate(routeName,{image: data.uri})
     }
    }

  render() {

    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <View />
    }
    else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }
    else {
      return (
        <View style={{ 
        	flex: 1,
		    flexDirection: 'column',
		    backgroundColor: 'black'
         }}>
          <Camera ref={ref => {
              this.camera = ref;
            }} 
            type={this.state.type}
            style = {{
	          	flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
          }}>
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}} >
              <TouchableOpacity
                style={{
                  	flex: 0,
                    padding: 15,
                    paddingHorizontal: 20,
                    alignSelf: 'center',
                    margin: 20,
                    borderWidth:8,
                    borderColor:'rgba(0,0,0,0.5)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:75,
                    height:75,
                    backgroundColor:'#fff',
                    borderRadius:75,
                }}
                onPress={this.snapPhoto.bind(this)}
                >
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default CameraComponent