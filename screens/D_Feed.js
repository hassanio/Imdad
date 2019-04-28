import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { Item, Image, Picker, ActivityIndicator, View, Text, Linking,StatusBar, KeyboardAvoidingView,Alert, TouchableHighlight} from 'react-native';
import { Container } from '../components/Container';
import { DeviceEventEmitter } from 'react-native';
import ItemList from '../components/Feed/Feed.js';
import * as actions from '../actions'
import { connect } from 'react-redux'
import renderPicker from '../components/Picker/Picker.js'
import color from 'color';
import styles from '../components/Picker/styles.js'

const underlayColor = color(styles.$buttonBackgroundColorBase).darken(
    styles.$buttonBackgroundColorModifier,
  );

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

class D_Feed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filter: ''
		}
	}

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
        	<View style = {{ marginRight: imageWidth/40, flexDirection: 'row', justifyContent: 'flex-end', height: imageHeight/10, width: imageWidth}}>
        		<View style={{
        			backgroundColor: '#F0F0F0',
				    width: imageWidth*0.53,
				    height: imageHeight/15,
				    flexDirection: 'row',
				    alignItems: 'center',
				    justifyContent: 'center',
				    borderRadius: 8,
				    marginVertical: 10,
        		}}>
			        <TouchableHighlight
			          style={{
			          	height: imageHeight/12,
					    width: imageWidth/7,
					    alignItems: 'center',
					    justifyContent: 'center',
					    borderTopLeftRadius: 5,
					    borderBottomLeftRadius: 5,
			          }}
			          underlayColor={underlayColor}
			        >
			          <Image source = {require('../filter.png')} style = {{height: imageHeight/15, width: imageHeight/15}} />
			        </TouchableHighlight>
			        <View style={modified_textbox.separator} />
				  <Picker style = {{
				  	flex: 1,
				    height: imageHeight/12,
				    width: imageWidth/3,
				    borderTopRightRadius: 5,
				    paddingHorizontal: 5,
				    color: '#000000',
				    fontSize: 18,
				  }}
				  	selectedValue = {this.state.filter}
				    onValueChange={(value) =>
					    this.setState({filter: value})
					  }
					
				  >
				    <Picker.Item label="Show all" value='All' enabled={false} />
				    <Picker.Item label="Waiting" value="Waiting" />
				    <Picker.Item label="Pending" value="Pending" />
				    <Picker.Item label="Confirmed" value="Confirmed" />
				  </Picker>
				</View>
        	</View>
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

