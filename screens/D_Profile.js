import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { connect } from 'react-redux'
import { View, Text, ActivityIndicator ,StatusBar, KeyboardAvoidingView,Alert} from 'react-native';
import { Container } from '../components/Container';
import ProfileForm from '../components/ProfileForm/ProfileForm'

const axios = require('axios')

class D_Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: '',
      loading: true,
      profile: {}
    }
  }

  async fetchUserProfile(token) {
    try 
    {
      const res = await axios.get('https://young-castle-56897.herokuapp.com/fetchProfile',{
        headers: { authorization: token } 
      })

      this.setState({ error: '', loading: false, profile: res.data })
      
    }
    catch (err) 
    {
      this.setState({ error: 'Cannot fetch profile at the moment.', loading: false })
    }
  }

  componentDidMount() {
    this.fetchUserProfile(this.props.token)
  }

  render() {

    if (this.state.loading) {
      return (
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#316538'}}>
          <ActivityIndicator color='#CAEEA2' size='large'/>
        </View>
      )
    }
    
    if (this.state.error) {
      return (
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#316538'}}>
          <Text>{this.state.error}</Text>
        </View>
      )
    }
    
    return (
        <Container>
          <StatusBar barStyle="light-content" backgroundColor = '#316538' />
          <ProfileForm fetch_profile = {() => this.fetchUserProfile(this.props.token)} navigation = {this.props.navigation} initialValues = {this.state.profile} enableReinitialize={true} />
        </Container>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

const connectedProfile = connect(mapStateToProps, null)(D_Profile)
export default connectedProfile;

