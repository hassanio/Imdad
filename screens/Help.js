import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, Image } from 'react-native';


const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;
const realHeight = imageHeight

class Help extends Component {
	render() {
	    return (
	        <ScrollView contentContainerStyle={styles.container}>
	            <View style ={styles.listItem}>
	                <Image source= {require('../assets/images/add.png')} style={styles.image}/>
	                 <Text style={styles.textStyle}>With this icon the Donation form can be accessed within a click of a button.</Text>
	            </View>
	            <View style ={styles.listItem}>
	                <Image source= {require('../assets/images/pending.png')} style={styles.image}/>
	                <Text style={styles.textStyle}>This status (Pending) on the donation post indicates that one or multiple NGO's have requested for your item.</Text>
	            </View>
	            <View style ={styles.listItem}>
	                <Image source= {require('../assets/images/waiting.png')} style={styles.image}/>
	                 <Text style={styles.textStyle}>This status (Waiting) on the donation post indicates that you have accepted a specific NGO's request and are waiting for it to be picked up.</Text>
	            </View>
	            <View style ={styles.listItem}>
	                <Image source= {require('../assets/images/confirmed.png')} style={styles.image}/>
	                 <Text style={styles.textStyle}>This status (Confirmed) indicates that an item has been picked up from your house and both you and the NGO have confirmed the donation.</Text>
	            </View>
	        </ScrollView>
	        
	    );
  }
}

export default Help;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#316538', 
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  listItem: {
    marginBottom: 2, // marginBottom
    width: '100%',
    height: realHeight/4,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    },
   image: {
    paddingRight: 15,
    height: realHeight / 6,
    width: realHeight / 6, 
    },

   textStyle: {
    paddingLeft: 20,
    fontSize: imageHeight / 45,
    flex: 2
    }
});