import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Dimensions, ActivityIndicator, Linking, ScrollView, StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import * as actions from '../actions'
import D_Details_Donor from '../components/Details/D_Details_Donor';
import D_Details_NGO from '../components/Details/D_Details_NGO';



const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class D_Details extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { navigation, token, fetchDonation } = this.props
    const donationID = navigation.getParam('donationID')
    fetchDonation(donationID, token)
  }

  renderDetails({ isDonor, navigation, donations }) {
    const donationID = navigation.getParam('donationID')
    if (isDonor) {
      return (
          <D_Details_Donor donation={donations[donationID]} />
                )
    } else {
      return (
          <D_Details_NGO donation={donations[donationID]} />
                )
    }
  }

  render() {
    const { isLoading } = this.props

    if(isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#316538'}}>
          <ActivityIndicator color='#CAEEA2' size='large'/>
        </View>
      )
    }

    return this.renderDetails(this.props)

    
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isDonor: state.auth.isDonor,
    isLoading: state.all_donations.isFetching,
    donations: state.all_donations.donations
  }
}

export default connect(mapStateToProps, actions)(D_Details);

