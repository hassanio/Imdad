import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Image, View, Text, Dimensions, ActivityIndicator, Linking, ScrollView, StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import * as actions from '../../actions'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import { Container } from '../Container';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class D_Details_Donor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      is_image: false,
      has_requested: false,
    }
  }

  renderButton() {
    if (!this.state.has_requested) {
      return(
          <TextButton
          buttonText="Request"
          my_style = {textbutton_styles}
          />
        )
    } else {
      return(
            <Text style = {{
            color: 'white',
            paddingTop: imageHeight/70,
            paddingBottom: imageHeight/100,
            textAlign: 'center',
            fontSize: imageHeight /35,
            }}>*Awaiting request approval</Text>
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
              {this.renderButton()}
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
    console.log(JSON.stringify(this.props.donation))
      return (
      <Container>
        {this.renderDonationDetail()}
      </Container>
      )
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

export default connect(mapStateToProps, actions)(D_Details_Donor);