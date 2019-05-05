import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Image, View, Text, Dimensions, ActivityIndicator, Linking, ScrollView, StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import * as actions from '../actions'
import D_Details_Donor from '../components/Details/D_Details_Donor';
import D_Details_NGO from '../components/Details/D_Details_NGO';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';


const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;
let c = 0

class D_Details extends Component {

  constructor(props) {
    super(props)
  }

  static navigationOptions = ({ navigation, isDonor}) => {
    if (navigation.getParam('tele') !== undefined) {
      const phone = navigation.getParam('tele')
      return {
        headerRight: <TouchableOpacity onPress = {() => {Linking.openURL(`tel:+92${phone}`)}} style={{flexDirection: 'row', alignItems: 'center' }}>
                        <Image source = {require('../assets/images/call.png')} style={{ height: 25, width: 25, marginRight: 15}} />
                    </TouchableOpacity>,
        headerLeft: <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center' }}>
                          <AntDesign name="arrowleft" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
                    </TouchableOpacity>
      }
    } else {
      return {
        headerRight:<View/>,
        headerLeft: <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center' }}>
                          <AntDesign name="arrowleft" size={26} color="#316538" style={{fontWeight: '200', marginLeft: 15}} />
                    </TouchableOpacity>

        }
    }
  }

  componentWillMount() {
    const { navigation, token, fetchDonation } = this.props
    const donationID = navigation.getParam('donationID')
    fetchDonation(donationID, token)
  }

  renderDetails({ isDonor, navigation, donations }) {
    const donationID = navigation.getParam('donationID')
    if (isDonor) {
      return (
          <D_Details_Donor donation={donations[donationID]} navigation={navigation} />
                )
    } else {

      if (this.props.navigation.getParam('tele') === undefined && donations[donationID] !== undefined) {
          this.props.navigation.setParams({ tele: donations[donationID].contact })
      }

      return (
          <D_Details_NGO donation={donations[donationID]} navigation={navigation} />
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

