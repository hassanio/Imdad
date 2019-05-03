import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Dimensions, ActivityIndicator, Linking, ScrollView, StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import * as actions from '../../actions'

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class D_Details_Donor extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      return (
          <ScrollView>
              <Text>NGO Details</Text>
          </ScrollView>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, actions)(D_Details_Donor);