import React from 'react';
import { Header } from "react-navigation";
import { Text, View, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = props => {

  return (
    <View style={{height: 56, marginTop: Platform.OS == "ios" ? 20 : 0 }}>
      <Text>CustomHeader</Text>
    </View>
  );
};

export default CustomHeader;