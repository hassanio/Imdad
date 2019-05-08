import React, { Component } from 'react';
import { ToastAndroid, View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import TextButton from '../TextInput/InputwithButton.js';
import textbutton_styles from '../TextInput/styles.js';
import { Container } from '../Container';
const axios = require('axios')
import DonationsReducer from '../../reducers/DonationsReducer';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;
const thumbnailHeight = imageHeight/6 


class ItemNGO extends Component {
    constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  async performAsyncRequest(url, token) {
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
        this.props.FetchDonations(this.props.token)
    }
    catch(err) {
        console.log(err)
        this.setState({ loading: false})
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

    request_icon() {
        if (this.props.is_approved) {
            return null
        } else {
            return (
                <TouchableOpacity onPress = {() => this.performAsyncRequest(`https://young-castle-56897.herokuapp.com/requestDonation/${this.props.itemid}`, this.props.token)} style = {{flexDirection: "row", width: '70%', justifyContent: 'center', paddingLeft: imageWidth/20, paddingTop: imageHeight/100}}>
                     <Image
                    source = {src}
                    style = {{height: imageHeight/30, width: imageHeight/30}}
                    />
                </TouchableOpacity>
                )
        }
    }

  render() {

    if (this.state.loading) {
        src = require('../../assets/images/loading.jpg')
    } else {
        src = require('../../assets/images/request.png')
    }

    return(
            <TouchableOpacity style = {{alignItems: 'center'}} onPress = {this.props.onPress}> 
        <View style={styles.listItem}>
            <Image source={{uri: this.props.DonatedImage}} style={styles.DonatedImage} />
            <View style={styles.Textlist}>
            <View style = {{flexDirection: "row", width: '100%'}}>
                <View style = {{width: '50%'}}>
                    <Text style={styles.textCategory}>• {this.props.itemCategory}</Text>
                </View>
                {this.request_icon()}
            </View>
                <Text style={styles.textDescription}>•  {this.props.itemAddress} </Text>
                <View style={styles.componentLocation}>
                    <Text style={styles.textLocation}>{this.props.itemLocation}</Text>
                </View>
            </View>   
        </View>
    </TouchableOpacity>

        )
  }
    
};

const styles = StyleSheet.create({
    listItem: {
        marginBottom: 2, // marginBottom
        width: '100%',
        height: imageHeight/6,
        padding: 0,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5,
        paddingTop: imageHeight/150,
        paddingLeft: imageHeight/150,


    },
    textCategory: {
        fontWeight: 'bold',
        fontSize: imageHeight /35
    },

    componentLocation: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: imageHeight/80,
        paddingBottom: imageHeight/100,
        flex: 1
    },
    textLocation: {
        fontSize: imageHeight / 45,
        color: 'grey',
    },

    textDescription:{
        fontSize: imageHeight / 40,
        color: 'black'
     },

    DonatedImage: {
        height: imageHeight / 6.5,
        width: imageHeight / 6.5,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.5,
    },

    Textlist: {
        flexDirection: "column",
        flex:2,
        paddingLeft: imageHeight/70,
        
    }

});

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, actions)(ItemNGO);  