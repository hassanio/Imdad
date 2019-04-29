import { Camera, Permissions } from 'expo';
import React, { Component } from 'react'
import { ActivityIndicator, Icon, Item, Dimensions, Platform, View, TextInput, TouchableOpacity, TouchableHighlight, Text, KeyboardAvoidingView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { ImageManipulator } from 'expo';


const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;


class CameraComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
		    hasCameraPermission: null,
		    type: Camera.Constants.Type.back,
        loading: false
		  }
	}

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  async snapPhoto() {       
    // console.log('Button Pressed');
    if (this.camera) {
      this.camera.stopRecording()
      this.setState({ loading: true })
      // console.log('Taking photo');
      const options = { quality: 0 };
      const data = await this.camera.takePictureAsync(options)
      const resizedPhoto = await ImageManipulator.manipulateAsync(data.uri, [
        { resize: { width: 300, height: 400 }}
      ])

      this.setState({ loading: false })
      const { routeName, key } = this.props.navigation.getParam('returnToRoute'); 

      this.props.navigation.navigate(routeName,{image: resizedPhoto.uri})
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
          {this.state.loading && <View style = {{
                                  height: imageHeight,
                                  width: imageWidth,
                                  position: 'absolute',
                                  paddingLeft: 0,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  opacity: 0.6,
                                  backgroundColor: '#808080',
                                }}>
            <ActivityIndicator style= {{paddingBottom: imageHeight/4}} color='#316538' size='large'/>
          </View>}
        </View>
      );
    }
  }
}

export default CameraComponent