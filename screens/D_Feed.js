import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { ActivityIndicator, View, Text, Linking,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import { DeviceEventEmitter } from 'react-native';
import ItemList from '../components/Feed/Feed.js';
import * as actions from '../actions'
import { connect } from 'react-redux'

class D_Feed extends Component {
	componentDidMount() {
		const { navigation, token } = this.props
		//Whenever Feed screen comes into view, fetch the donations from the backend
		this.focusListener = navigation.addListener('didFocus', () => {
			this.props.FetchDonations(token)
		})
		
	}

	componentWillUnmount() {
		//Remove event listener
		this.focusListener.remove()
	}

	renderDonationsList(props) {
  	donationList = []
  	if(props.donations) {
    	donationList = Object.values(props.donations)
		}
	
		return <ItemList items={donationList} onPress={(donationID) => this.props.navigation.navigate('d_details', {donationID: donationID})}/>
	}

  render() {
    return (
        <Container>
        	<StatusBar barStyle="light-content" backgroundColor = '#316538' />
          {this.renderDonationsList(this.props)}
        </Container>
    );
  }
}

const mapStateToProps = (state) => {
	return { 
		donations: state.all_donations.donations,
		isLoading: state.all_donations.loading,
		token: state.auth.token
	}
}

export default connect(mapStateToProps, actions)(D_Feed);

