import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Dimensions,Linking, KeyboardAvoidingView,Alert} from 'react-native';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Feed' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style = {{ backgroundColor:'#316538' ,flex: 1, justifyContent: 'center', allignItems:'center'}}>
        <StatusBar barStyle="dark-content" backgroundColor = "blue" />
        <ActivityIndicator color='#CAEEA2' style = {{flex: 1, justifyContent: 'center', allignitems: 'center', height: imageHeight/2}} size='large'/>
      </View>
    );
  }
}

export default AuthLoadingScreen;