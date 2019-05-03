import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Dimensions, ActivityIndicator, Image, ScrollView, StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import * as actions from '../../actions'
import { Avatar } from 'react-native-elements'
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class D_Details_Donor extends Component {

  constructor(props) {
    super(props)
  }

  renderImage(img_url) {
    if (img_url) {
        return (
        <View style = {styles.imageViewStyle}>
            <Image source={{uri: img_url}} style={styles.imageStyle} />
        </View>
        )
    } else {
        return (
        <View style = {styles.imageViewStyle}>
            <View style={[styles.imageStyle, { backgroundColor: 'grey'}]} />
        </View>
        )
    }
}
  renderDetails(donation) {
      const { status, collection_address, location, image, description, categories } = donation

      return (
          <View>
              {this.renderImage(image)}
              <View style={styles.detailContainer}>
                <Text>{description}</Text>
              </View>
          </View>
          
      )
  }

  render() {

      const{ donation } = this.props

      return (
          <ScrollView style={{flex: 1, backgroundColor: '#316538'}}>
              {this.renderDetails(donation)}
          </ScrollView>
      )
  }
}

const styles = {
    imageViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: imageHeight/25
    },
    imageStyle: {
        height: imageHeight / 5,
        width: imageHeight / 5,
        borderRadius: 5,
    },
    detailContainer: {
        flex:1,
        marginHorizontal: imageHeight/25
    }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, actions)(D_Details_Donor);

