import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { Item, Image, Picker, ActivityIndicator, View, Text, ToastAndroid, StatusBar, KeyboardAvoidingView, Alert, TouchableHighlight} from 'react-native';
import { Container } from '../components/Container';
const axios = require('axios')
import ItemList from '../components/Feed/Feed.js';

class ApprovedDonations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            donations: [],
        }
    }

    async fetchApprovedDonations(token) {
        try {
            this.setState({ loading: true })
            const res = await axios.get(`https://young-castle-56897.herokuapp.com/getApprovedDonations`, {
                headers: {
                    authorization: token
                }
            })
            const donations = res.data.map(donation => {
                return {
                    ...donation,
                    id: donation._id
                }
            })
            this.setState({ loading: false, donations: donations})
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

    componentDidMount() {
        const { navigation, token } = this.props
		this.focusListener = navigation.addListener('didFocus', () => {
			this.fetchApprovedDonations(token)
		})
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    renderApprovedDonations({ loading, donations }) {
		return <ItemList 
                        is_approved = {true}
						isLoading = {loading} 
						items={donations} 
						onPress={(donationID) => this.props.navigation.navigate('d_details', {donationID: donationID})}
						onRefresh = {() => this.fetchApprovedDonations(this.props.token)}
					/>
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="dark-content" />
                {this.renderApprovedDonations(this.state)}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps, null)(ApprovedDonations)