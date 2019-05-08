import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Tooltip } from 'react-native-elements';
const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;
const thumbnailHeight = imageHeight/6 

const renderStatus = (status) => {

    const styleObj = {height: imageHeight/25, width: imageHeight/25}
    if (status.toUpperCase() === "NONE") {
        return null
    } else if (status.toUpperCase() ==="PENDING") {
        return (
            <Tooltip width={imageWidth/1.05} backgroundColor='#CAEEA2' popover={<Text style={{fontSize: imageHeight/50}}>You have pending requests from NGO(s)</Text>}>
                <Image
                source = {require('../../assets/images/pending.png')}
                style = {styleObj}
                />
            </Tooltip>
        )
        
    } else if (status.toUpperCase() ==="WAITING") {
        return (
            <Tooltip width={imageWidth/1.05} backgroundColor='#CAEEA2' popover={<Text style={{fontSize: imageHeight/50}}>Waiting for pickup confirmation from both parties</Text>}>
                <Image
                source = {require('../../assets/images/waiting.png')}
                style = {styleObj}
                />
            </Tooltip>
        )
    } else if (status.toUpperCase() ==="CONFIRMED") {
        return (
            <Tooltip width={imageWidth/1.05} backgroundColor='#CAEEA2' popover={<Text style={{fontSize: imageHeight/50}}>Pickup has been confirmed. Thankyou for donating!</Text>}>
                <Image
                source = {require('../../assets/images/confirmed.png')}
                style = {styleObj}
                />
            </Tooltip>
        )
    }
}


const Item = (props) => (
    <TouchableOpacity style = {{allignItems: 'center'}} onPress = {props.onPress}> 
        <View style={styles.listItem}>
            <Image source={{uri: props.DonatedImage}} style={styles.DonatedImage} />
            <View style={styles.Textlist}>
            <View style = {{flexDirection: "row", width: '100%'}}>
                <View style = {{width: '50%'}}>
                    <Text style={styles.textCategory}>• {props.itemCategory}</Text>
                </View>
                <View style = {{flexDirection: "row", width: '70%', justifyContent: 'center', paddingLeft: imageWidth/20, paddingTop: imageHeight/100}}>
                    {renderStatus(props.itemstatus)}
                </View>
            </View>
                <Text style={styles.textDescription}>•  {props.itemdesc}</Text>
                <View style={styles.componentDate}>
                    <Text style={styles.textDate}>{new Date(props.itemDate).toDateString()}</Text>
                </View>
            </View>
            
            
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        marginBottom: 2, // marginBottom
        width: '100%',
        height: imageHeight/6,
        padding: 0,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5,
        paddingTop: imageHeight/150,
        paddingLeft: imageHeight/150,


    },
    textCategory: {
        fontWeight: 'bold',
        fontSize: imageHeight /40,
    },

    textStatus: {
        fontSize: imageHeight /50,
        paddingRight: imageWidth/40,
    },

    componentDate: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: imageHeight/80,
        paddingBottom: imageHeight/100,
        flex: 1
    },
    textDate: {
        fontSize: imageHeight / 45,
        color: 'grey',
    },

    textDescription:{
        fontSize: imageHeight / 45,
        color: 'black'
     },

    DonatedImage: {
        height: imageHeight / 6.5,
        width: imageHeight / 6.5,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.5,
    },

    Textlist: {
        flexDirection: "column",
        flex:2,
        paddingLeft: imageHeight/70,
    }

});

export default Item;  