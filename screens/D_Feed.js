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
		this.props.FetchDonations(this.props.token)
	}

  render() {

  	donationList = []

  	if(this.props.donations) {
    	donationList = Object.values(this.props.donations)
  	}

    return (
        <Container>
        <StatusBar barStyle="light-content" backgroundColor = '#316538' />
          <ItemList items={donationList}/>
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

