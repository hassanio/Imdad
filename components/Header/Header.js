import React from 'react';
import { Text, View, Platform, Image, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';


const CustomHeader = ({navigation}) => {

  return (
    <View>
         <Header
		  leftComponent={{ icon: 'menu' , color: '#316538', onPress:  () => {
			  navigation.navigate('DrawerOpen')
			  console.log("LOLOLOL")
		  }
			   }}
		  rightComponent={
		  	 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="plus" size={26} color="#316538" />
            </View>
		  }
		  containerStyle={{
		    backgroundColor: 'white',
		    justifyContent: 'space-around',
		  }}
		/>
    </View>
  );
};

export default CustomHeader;
