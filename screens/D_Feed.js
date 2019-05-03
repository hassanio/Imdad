import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation'
import { Item, Image, Picker, ActivityIndicator, View, Text, Linking,StatusBar, KeyboardAvoidingView,Alert, TouchableHighlight} from 'react-native';
import { Container } from '../components/Container';
import { DeviceEventEmitter } from 'react-native';
import ItemList from '../components/Feed/Feed.js';
import * as actions from '../actions'
import { connect } from 'react-redux'
import color from 'color';

const $buttonBackgroundColorBase = '#FFFFFF'
const $buttonBackgroundColorModifier = 0.1
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;
const underlayColor = color($buttonBackgroundColorBase).darken(
	$buttonBackgroundColorModifier,
);

let is_Donor = false

const Filter = ({ src, children, filterImageContainerStyle }) => {
	return (
		<View style={[styles.filterImageContainer, filterImageContainerStyle]}>
		<TouchableHighlight style={styles.filterImageButton}underlayColor={underlayColor}>
			<Image source = {src} style = {styles.filterButton} />
		</TouchableHighlight>
		<View style={modified_textbox.separator} />
		{children}
	</View>
	)
}

const RenderPicker = ({style, selectedValue, onValueChange, children }) => {
	return (
		<Picker
			style = {[styles.pickerStyle, style]}
			selectedValue = {selectedValue}
			onValueChange = {onValueChange}
		>
			{children}
		</Picker>
	)
}

const statusFilters = [
	{'label': 'Show All', value: ''},
	{'label': 'Pending', value: 'Pending'},
	{'label': 'Waiting', value: 'Waiting'},
	{'label': 'Confirmed', value: 'Confirmed'}
]

const categoryFilters = [
	{'label': 'Show All', value: ''},
	{'label': 'Food', value: 'Food'},
	{'label': 'Clothing', value: 'Clothing'},
	{'label': 'Household', value: 'Household'},
	{'label': 'Other', value: 'Other'}
]

const locationFilters = [
	{'label': 'Show All', value: ''},
	{'label': 'Karachi', value: 'Karachi'},
	{'label': 'Lahore', value: 'Lahore'},
	{'label': 'Islamabad', value: 'Islamabad'},
	{'label': 'Multan', value: 'Multan'},
	{'label': 'Quetta', value: 'Quetta'}
]

class D_Feed extends Component {

	constructor(props) {
		super(props)
		this.state = {
			statusfilter: '',
			categoryFilter: '',
			locationFilter: ''
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

	renderFilters({ isDonor }) {
		if(isDonor) {
			is_Donor = true
			return (
				<View style={styles.filterContainer}>
					<Filter src={require('../assets/images/filter.png')}>
						<RenderPicker 
							selectedValue = {this.state.statusFilter}
							onValueChange={(value) => this.setState({statusFilter: value})}
						>
							<Picker.Item label="All" value="Show all" />
							<Picker.Item label="Pending" value="Pending" />
							<Picker.Item label="Waiting" value="Waiting" />
							<Picker.Item label="Confirmed" value="Confirmed" />
						</RenderPicker>
					</Filter>
				</View>
			)
		} else {

			is_Donor = false

			return (
				<View style={[styles.filterContainer, { justifyContent: 'space-around'}]}>
					<Filter src={require('../assets/images/filter.png')} filterImageContainerStyle = {{ width: imageWidth * 0.48 }}>
						<RenderPicker 
							selectedValue = {this.state.categoryFilter}
							onValueChange={(value) => this.setState({categoryFilter: value})}
						>
							<Picker.Item label="All" value="" />
							<Picker.Item label="Food" value="Food" />
							<Picker.Item label="Clothing" value="Clothing" />
							<Picker.Item label="Household" value="Household" />
							<Picker.Item label="Other" value="Other" />
						</RenderPicker>
					</Filter>
					<Filter src={require('../assets/images/location.png')} filterImageContainerStyle = {{ width: imageWidth * 0.48 }}>
						<RenderPicker 
							selectedValue = {this.state.locationFilter}
							onValueChange={(value) => this.setState({locationFilter: value})}
						>
							<Picker.Item label="All" value="" />
							<Picker.Item label="Karachi" value="Karachi" />
							<Picker.Item label="Lahore" value="Lahore" />
							<Picker.Item label="Islamabad" value="Islamabad" />
							<Picker.Item label="Quetta" value="Quetta" />
							<Picker.Item label="Multan" value="Multan" />

						</RenderPicker>
				</Filter>
			</View>
			)
		}
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
					{this.renderFilters(this.props)}
          {this.renderDonationsList(this.props)}
        </Container>
    );
  }
}

const mapStateToProps = (state) => {
	return { 
		donations: state.all_donations.donations,
		isLoading: state.all_donations.loading,
		token: state.auth.token,
		isDonor: state.auth.isDonor
	}
}

const styles = {
	filterContainer: { 
		marginRight: is_Donor ? imageWidth/40 : imageWidth/50, 
		flexDirection: 'row', 
		justifyContent: 'flex-end', 
		height: imageHeight/10, 
		width: imageWidth
	},
	filterImageContainer: {
		backgroundColor: '#F0F0F0',
		width: imageWidth*0.53,
		height: imageHeight/15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		marginVertical: 10,
	},
	filterImageButton: {
		height: imageHeight/12,
		width: imageWidth/7,
		alignItems: 'center',
		justifyContent: 'center',
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
	},
	filterButton: {
		height: imageHeight/15, 
		width: imageHeight/15
	},
	pickerStyle: {
		flex: 1,
		height: imageHeight/12,
		width: imageWidth/3,
		borderTopRightRadius: 5,
		paddingHorizontal: 5,
		color: '#000000',
		fontSize: 18,
	}
}

export default connect(mapStateToProps, actions)(D_Feed);

