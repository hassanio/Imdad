import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Dimensions, ActivityIndicator, ToastAndroid, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView,Alert} from 'react-native';
import * as actions from '../../actions'
import { Avatar, ListItem, Button } from 'react-native-elements'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
const axios = require('axios')
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const renderStatus = (status) => {
    const h = imageHeight/8
    const w = imageHeight/8
    const styleObj = {height: h, width: w}
    if (status.toUpperCase() === "NONE") {
        return (
        <View>
            <Text style={styles.textDesc}>(None)</Text>
        </View>)
    } else if (status.toUpperCase() ==="PENDING") {
        return (
            <View style={{justifyContent: 'space-around'}}>
                <Image
                source = {require('../../assets/images/pending.png')}
                style = {styleObj}
                />
                <Text style={styles.textDesc}>(Pending)</Text>
            </View>
        )
        
    } else if (status.toUpperCase() ==="WAITING") {
        return (
            <View style={{justifyContent: 'space-around'}}>
                <Image
                source = {require('../../assets/images/waiting.png')}
                style = {styleObj}
                />
                <Text style={styles.textDesc}>(Waiting)</Text>
            </View>
        )
    } else if (status.toUpperCase() ==="CONFIRMED") {
        return (
            <View style={{justifyContent: 'space-around'}}>
                <Image
                source = {require('../../assets/images/confirmed.png')}
                style = {styleObj}
                />
                <Text style={styles.textDesc}>(Confirmed)</Text>
            </View>
        )
    }
}


class D_Details_Donor extends Component {

  constructor(props) {
    super(props)
    this.state = {
        is_image: false,
        loading: false
    }
  }

  renderImage(img_url) {
    if (img_url) {
        return (
            <TouchableOpacity onPress={() => this.setState({ is_image: true })}>
                <Image source={{uri: img_url}} style={styles.imageStyle} />
            </TouchableOpacity>
        )
    } else {
        return (
            <View style={[styles.imageStyle, { backgroundColor: 'grey'}]} />
        )
    }
}
  renderDetails(donation) {
      const { status, collection_address, location, image, description, categories, contact } = donation

    return (
        <View>
            <View style={styles.imageViewStyle}>
                {this.renderImage(image)}
                <View style = {styles.textview}>
                <Text style = {styles.textCat}>Status</Text>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {renderStatus(status)}
                </View>
                </View>
            </View>
            <View style={styles.detailContainer}>
            <View style = {styles.donview}>
                <Text style = {styles.textCat}>Donation Info</Text>
                <Text style = {styles.itemview}>• {categories[0]}</Text>
                <Text style = {styles.itemview}>• {description}</Text>
            </View>
            <View style = {styles.donview}>
                <Text style = {styles.textCat}>Collection Info</Text>
                <Text style = {styles.itemview}>• {collection_address}, {location}</Text>
                <Text style = {styles.itemview}>• {contact}</Text>
            </View>
            </View>
        </View>
        
    )
  }

  renderExtra(donation, onAccept, onConfirm) {
      if(this.state.loading) {
          return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
            <ActivityIndicator color='#CAEEA2' size='small'/>
          </View>
          )
      }

      const status = donation.status.toUpperCase()

      if(status === 'NONE' || status === 'CONFIRMED') {
          return null
      }

      if(status === 'PENDING') {
          const { requestingNGOs } = donation

          if(!requestingNGOs) {
              return null
          }

          return (
              <View style={{ borderWidth: 0.25, borderColor: 'white', borderRadius: 5}}>
                  <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 5}}>
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
                                onPress={() => onAccept(ngo._id, donation.id)}
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
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                    <Text style={{color: 'white', fontSize: 17}}>Waiting for NGO...</Text>
                </View>
              )
          }

          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextButton
                    buttonText={'Confirm Pickup'}
                    my_style = {textbutton_styles}
                    onPress = {() => onConfirm(donation.id)}
                />
            </View>
          )
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

  render() {

      const{ donation, token, navigation } = this.props

      if(!this.state.is_image) {
        return (
            <ScrollView style={styles.scrollView}>
              <View style={{flex: 2}}>
                  {this.renderDetails(donation)}
              </View>
              <View style={{flex: 1}}>
                      {this.renderExtra(
                          donation,
                          (ngoID, donationID) => {this.performAsyncRequest(`https://young-castle-56897.herokuapp.com/approveNGO/${donationID}/${ngoID}`, token, navigation)},
                          (donationID) => {this.performAsyncRequest(`https://young-castle-56897.herokuapp.com/confirmPickup/${donationID}`, token, navigation)}
                          )}
                  </View>         
            </ScrollView>
        )
      } 
      else {
        return (
            <View style={[styles.scrollView, {justifyContent: 'center', alignItems: 'center'}]}>
                <TouchableOpacity onPress = {() => {this.setState({ is_image: false })}}>
                    <Image style = {{height: imageWidth, width: imageWidth, backgroundColor:'grey'}} source = {{uri: donation.image}} />
                </TouchableOpacity>
            </View>
          )
      }

  }
}

const styles = {
    scrollView: {
        flex: 1,
        width: '100%',
        paddingLeft: imageWidth/100,
        paddingRight: imageWidth/100,
        backgroundColor: '#316538'
    },
    imageViewStyle: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        paddingTop: imageHeight/100,
        paddingLeft: imageWidth/80,
        paddingBottom: imageHeight/100,
    },
    imageStyle: {
        height: imageWidth/2,
        width: imageWidth/2,
        borderRadius: 5,
        borderWidth: 0.25,
        borderColor: 'white',
        backgroundColor: 'grey'
    },
    detailContainer: {
        flex:1,
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
        alignItems: 'center',
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
    donview: {
        flexDirection: 'column',
        width: '100%',
        paddingTop: imageHeight/100,
        paddingLeft: imageWidth/80,
        paddingBottom: imageHeight/100,
        marginBottom: imageHeight/100,
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

