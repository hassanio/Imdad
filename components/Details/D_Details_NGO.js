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
      return (
        <TextButton
        buttonText="Request"
        my_style = {textbutton_styles}
        onPress = {() => this.performAsyncRequest(`https://young-castle-56897.herokuapp.com/requestDonation/${donation.id}`, token, this.props.navigation)}
        />
      )
    }

    if(status === 'WAITING') {
      const { hasNGOConfirmed } = donation

      if(hasNGOConfirmed) {
        return (
          <View  style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 17}}>Waiting for Donor...</Text>
          </View>
        )
      }

      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextButton
                buttonText={'Confirm Pickup'}
                my_style = {textbutton_styles}
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
            <View style = {styles.donview}>
              <Text style = {styles.textCat}>Donation Info</Text>
              <Text style = {styles.itemview}>• {this.props.donation.categories}</Text>
              <Text style = {styles.itemview}>• {this.props.donation.description}</Text>
            </View>
            <View style = {{height: imageHeight/100}}/>
            <View style = {styles.donview}>
              <Text style = {styles.textCat}>Collection Address</Text>
              <Text style = {styles.itemview}>• {this.props.donation.collection_address}, {this.props.donation.location}</Text>
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
    borderWidth: 0.25,
    borderRadius: 5,
    
  },
  itemview: {
    color: 'white',
    paddingTop: imageHeight/100,
    paddingBottom: imageHeight/100,
    paddingLeft: imageWidth/50,
    fontSize: imageHeight /35,
  },

  textview: {
    flexDirection: 'column',
    marginHorizontal: imageWidth/50,
    borderWidth: 0.25,
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
    borderWidth: 0.25,
    borderColor: 'white'
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, actions)(D_Details_NGO);