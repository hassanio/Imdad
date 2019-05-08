import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Image, View, Text, Dimensions, ActivityIndicator, Linking, ScrollView, ToastAndroid, KeyboardAvoidingView,Alert} from 'react-native';
import * as actions from '../../actions'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import { Container } from '../Container';
const axios = require('axios')
import DonationsReducer from '../../reducers/DonationsReducer';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class D_Details_NGO extends Component {

  constructor(props) {
    super(props)
    this.state = {
      is_image: false,
      has_requested: false,
      loading: false
    }
  }

  async performAsyncRequest(url, token, nav) {
    try 
    {
        this.setState({ loading: true })
        const res = await axios.get(url, {
            headers: {
                authorization: token
            }
        })
        this.setState({ loading: false})
        ToastAndroid.show("Your request was successful!", ToastAndroid.LONG)
        nav.goBack()
    }
    catch(err) {
        console.log(err)
        this.setState({ loading: false })
        if (err.response) {
            if (err.response.status === 422) {
                ToastAndroid.show(err.response.data.error, ToastAndroid.LONG)
            } else {
                ToastAndroid.show("Unexpected Error Occurred. Try again later", ToastAndroid.LONG)
            }
        }
        else if (err.request) {
            ToastAndroid.show("Unable to process! Please check your internet connection!", ToastAndroid.LONG)
        } else {
            ToastAndroid.show("Unexpected Error Occurred. Try again later", ToastAndroid.LONG)
        }
      }
    }   

  renderButton({ donation, token }) {

    if(this.state.loading) {
      return (
        <View style = {{flex: 1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator color='#CAEEA2' size='small'/>
        </View>
      )
    }

    if(!donation.status) {
      return null
    }

    const status = donation.status.toUpperCase()
    if(status === 'CONFIRMED') {
      return null
    }

    if(status === 'NONE' || status === 'PENDING') {
      modified_RequestButton = JSON.parse(JSON.stringify(textbutton_styles))
      modified_RequestButton.container.height = imageHeight/15
      modified_RequestButton.container.top = imageHeight/50
      modified_RequestButton.buttonText.fontSize = imageHeight/30

      return (
        <View style = {{paddingTop: imageHeight/15}}>
          <TextButton
          buttonText="Request Item"
          my_style = {modified_RequestButton}
          onPress = {() => this.performAsyncRequest(`https://young-castle-56897.herokuapp.com/requestDonation/${donation.id}`, token, this.props.navigation)}
          />
        </View>
      )
    }

    if(status === 'WAITING') {
      const { hasNGOConfirmed } = donation

      if(hasNGOConfirmed) {
        return (
          <View  style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{paddingTop: imageHeight/15, color: 'white', fontSize: 17}}>*Waiting for Donor to confirm collection</Text>
          </View>
        )
      }

      modified_ConfirmButton = JSON.parse(JSON.stringify(textbutton_styles))
      modified_ConfirmButton.container.height = imageHeight/15
      modified_ConfirmButton.container.top = imageHeight/50
      modified_ConfirmButton.buttonText.fontSize = imageHeight/30

      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{paddingTop: imageHeight/35,textAlign: 'center', color: 'white', fontSize: 15}}>*Press the button below once the donation is collected</Text>
              <TextButton
                  buttonText={'Confirm Pickup'}
                  my_style = {modified_ConfirmButton}
                  onPress = {() => this.performAsyncRequest(`https://young-castle-56897.herokuapp.com/confirmPickup/${donation.id}`, token, this.props.navigation)}
              />
        </View>
      )
    }
  }

  renderDonationDetail() {
    if (!this.state.is_image) {
      return(
        <ScrollView style = {styles.scrollview}>
            <View style = {styles.imageview}>
              <TouchableOpacity onPress = {() => {
                this.setState({is_image: true})
              }}>
                <Image style = {styles.image} source = {{uri: this.props.donation.image}}/>
              </TouchableOpacity>
              <View style = {styles.textview}>
                  <Text style = {styles.textCat}>Donor Info</Text>
                  <Text style = {styles.textDesc}>• {this.props.donation.donorName}</Text>
                  <Text style = {styles.textDesc}>• 0{this.props.donation.contact}</Text>
            </View>
            </View>
            <Text style = {styles.textCat}>Donation Info</Text>
            <View style = {styles.donview}>
              <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.itemheadview}> Category: </Text>
                <Text style = {styles.itemview}>{this.props.donation.categories[0]}</Text>
              </View>
              <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.itemheadview}>Description: </Text>
                <Text style = {styles.itemview}>{this.props.donation.description}</Text>
              </View>
            </View>
            <Text style = {styles.textCat}>Collection Info</Text>
            <View style = {styles.donview}>
            <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.itemheadview}>Address: </Text>
                <Text style = {styles.itemview}>{this.props.donation.collection_address}, {this.props.donation.location}</Text>
            </View>
            </View>  
            <View style = {{justifyContent: 'center', allignItems: 'center', flexDirection: 'row'}}>
              {this.renderButton(this.props)}
            </View>            
          </ScrollView>
      )
    } else {
      return (
        <TouchableOpacity onPress = {() => {this.setState({is_image: false})}}>
           <Image style = {{height: imageWidth, width: imageWidth}} source = {{uri: this.props.donation.image}} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    if(this.props.donation) {
      return (
        <Container>
          {this.renderDonationDetail()}
        </Container>
        )
    }

    return null

  }
}

const styles = {
  scrollview: {
    width: '100%',
    paddingLeft: imageWidth/100,
    paddingRight: imageWidth/100,
  },


  imageview: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: imageHeight/100,
    paddingLeft: imageWidth/80,
    paddingBottom: imageHeight/100,
    
  },
  donview: {
    flexDirection: 'column',
    width: '100%',
    paddingTop: imageHeight/100,
    paddingLeft: imageWidth/80,
    paddingBottom: imageHeight/100,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    
  },
  itemview: {
    color: 'white',
    paddingTop: imageHeight/100,
    paddingBottom: imageHeight/100,
    paddingLeft: imageWidth/50,
    fontSize: imageHeight /35,
    width: '80%'
  },

  itemheadview: {
        color: 'white',
        fontWeight: 'bold',
        paddingTop: imageHeight/100,
        paddingBottom: imageHeight/100,
        paddingLeft: imageWidth/50,
        fontSize: imageHeight /35,
    },

  textview: {
    flexDirection: 'column',
    marginHorizontal: imageWidth/50,
    borderWidth: 1,
    borderColor: 'white',
    width: '45%',
    borderRadius: 5,
  },
  textCat: {
    color: 'white',
    fontSize: imageHeight /30,
    paddingTop: imageHeight/100,
    paddingBottom: imageHeight/100,
    paddingLeft: imageWidth/50,
    textAlign: 'center',
    fontWeight: 'bold',

  },

  textDesc: {
    color: 'white',
    paddingTop: imageHeight/40,
    paddingBottom: imageHeight/100,
    paddingLeft: imageWidth/50,
    fontSize: imageHeight /40,
  },

  image: {
    height: imageWidth/2,
    width: imageWidth/2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white'
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, actions)(D_Details_NGO);