import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import {SafeAreaView, ScrollView, Image, View, Text, Alert, Dimensions, TouchableOpacity} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Avatar, Button } from 'react-native-elements'

import TextButton from '../components/TextInput/InputwithButton.js';
import textbutton_styles from '../components/TextInput/styles.js';
const axios = require('axios')
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;


class CustomDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = { img_url: '', name: '' }
    }

    async fetchProfileImage() {
        try {
            const res = await axios.get('https://young-castle-56897.herokuapp.com/fetchProfileImage', {
                headers: { authorization: this.props.token }
            })
            
            this.setState({ img_url: res.data.image, name: res.data.name })
        } catch(err) {
            return
        }
    }

    componentDidMount() {
        this.fetchProfileImage()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.navigation.state.isDrawerOpen === false && this.props.navigation.state.isDrawerOpen === true) {
            this.fetchProfileImage()
        }
    }
    renderLogoutButton = (props) => {
        const { navigation, Logout} = props
        return <TouchableOpacity>
                <Button 
                    title='Logout'
                    type = 'solid'
                    onPress = {() => Logout(navigation)}
                    buttonStyle = {styles.logoutButtonStyle}
                    titleStyle = {styles.logoutText}
                />
            </TouchableOpacity>
    }

    renderDrawerItems(props) {
        const { items, isDonor, ...rest } = props
        const filteredItems = items.filter(item => {
            if (item.key === 'd_form' || (isDonor && item.key === 'Approved Donations') || (!isDonor && item.key === 'Help & Hints')) {
                return false
            }
            return true
        })
        
        return (
            <View style = {styles.drawerItemsContainer}>
                 <DrawerItems items = {filteredItems} {...rest} />
            </View>
        )
    }

    renderImage(img_url, name) {
        if (img_url) {
            return (
                <View style = {styles.avatarViewStyle}>
                <Avatar
                    size = 'xlarge'
                    rounded
                    source = {{ uri: img_url }}
                    imageProps = {{ resizeMode: 'stretch'}}
                    containerStyle = {styles.avatarContainer}
                />
                <Text style = {styles.avatarText}>{name}</Text>

                {/* <Image
                    resizeMode = 'stretch'
                    style = {{width: imageWidth, height: imageHeight/3}}
                    source = {{uri: img_url}}
                /> */}
            </View>
            )
        } else {
            return (
            <View style = {styles.avatarViewStyle}>
                <Avatar
                    size = 'xlarge'
                    rounded
                    icon = {{name: 'user', type: 'font-awesome'}}
                    containerStyle = {styles.avatarContainer}
                />
            </View>
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}} >
            <ScrollView>
                {this.renderImage(this.state.img_url, this.state.name)}
                {this.renderDrawerItems(this.props)}
                {this.renderLogoutButton(this.props)}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = {
    avatarViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#316538'
    },
    avatarContainer: {
        marginVertical: imageHeight/25
    },
    avatarText: {
        color: 'white',
        fontSize: imageHeight/30,
        fontWeight: '400',
        paddingBottom: 10
    },
    drawerItemsContainer: {
        flex: 2
    },
    logoutButtonStyle : {
        height: imageHeight/10, 
        marginHorizontal: imageWidth/30,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 1,
        marginTop: 10
    },
    logoutText : {
        fontWeight: '500',
        fontSize: imageHeight/30,
        color: 'red'
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isDonor: state.auth.isDonor
    }
}
export default connect(mapStateToProps, actions)(CustomDrawer);