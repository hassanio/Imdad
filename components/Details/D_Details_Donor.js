import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Dimensions, ActivityIndicator, Image, ScrollView, StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import * as actions from '../../actions'
import { Avatar, ListItem, Button } from 'react-native-elements'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
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

  renderExtra(donation) {
      const status = donation.status.toUpperCase()

      if(status === 'NONE' || status === 'CONFIRMED') {
          return null
      }

      if(status === 'PENDING') {
          const { requestingNGOs } = donation

          return (
              <View>
                  <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 5}}>
                    <Text style={[styles.defaultText, {fontSize: 17}]}>
                        {`List of requesting NGOs (${requestingNGOs.length})`}
                    </Text>
                  </View>
                  {
                      requestingNGOs.map((ngo, i) => (
                          <ListItem
                            key={i}
                            title={'• ' + ngo.name}
                            rightElement = {
                            <Button 
                                title={'Accept'}
                                type='solid'
                                raised
                                buttonStyle = {styles.acceptButton}
                                titleStyle = {styles.acceptButtonTitle}
                            />}
                            bottomDivider={true}
                            topDivider = {true}
                            containerStyle = {styles.NGOListContainer}
                            titleStyle= {styles.NGOListName}
                          />
                      ))
                  }
              </View>
          )
      }
      else if (status === 'WAITING') {
          const { hasDonorConfirmed } = donation

          if(hasDonorConfirmed) {
              return (
                <View  style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 17}}>Waiting for NGO...</Text>
                </View>
              )

          }

          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextButton
                    buttonText={'Confirm Pickup'}
                     my_style = {textbutton_styles}
                />
            </View>
          )

      }

  }

  render() {

      const{ donation } = this.props

      return (
          <ScrollView style={{flex: 1, backgroundColor: '#316538'}}>
            <View style={{flex: 2}}>
                {this.renderDetails(donation)}
            </View>
            <View style={{flex: 1}}>
                {this.renderExtra(donation)}
            </View>
              
          </ScrollView>
      )
  }
}

const styles = {
    imageViewStyle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: imageHeight/30,
        marginHorizontal: imageHeight/30
    },
    imageStyle: {
        height: imageHeight / 5,
        width: imageHeight / 5,
        borderRadius: 5,
        backgroundColor: 'grey'
    },
    detailContainer: {
        flex:1,
        marginHorizontal: imageHeight/30
    },
    NGOListContainer:{
        backgroundColor: '#316538',
    },
    NGOListName: {
        color:'white'
    },
    acceptButton: {
        backgroundColor: '#CAEEA2'
    },
    acceptButtonTitle: {
        fontWeight: '400',
        color: '#316538',
    },
    defaultText: {
        color: 'white'
    }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, actions)(D_Details_Donor);

