import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Item, Image, Picker, ActivityIndicator, View, Text, Linking,StatusBar, KeyboardAvoidingView,Alert, TouchableHighlight} from 'react-native';
import { Container } from '../components/Container';
import ItemList from '../components/Feed/Feed.js';

class ApprovedDonations extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <View>
                    <Text>Approved Donations</Text>
                </View>
            </Container>
        )
    }
}

export default ApprovedDonations