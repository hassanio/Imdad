import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;
const thumbnailHeight = imageHeight/6 


const Item = (props) => (
    <TouchableOpacity style = {{allignItems: 'center'}} onPress = {props.onPress}> 
        <View style={styles.listItem}>
            <Image source={{uri: props.DonatedImage}} style={styles.DonatedImage} />
            <View style={styles.Textlist}>
                <Text style={styles.textCategory}>• {props.itemCategory}</Text>
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
        fontSize: imageHeight /35
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
        fontSize: imageHeight / 40,
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