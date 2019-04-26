import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height

  },
  capture: {
    flex: 0,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    borderWidth:8,
    borderColor:'rgba(0,0,0,0.5)',
    alignItems:'center',
    justifyContent:'center',
    width:75,
    height:75,
    backgroundColor:'#fff',
    borderRadius:75,
  }
};

export default styles