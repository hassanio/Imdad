import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/8;
const BORDER_RADIUS = 10;


const textbutton_styles =  {
  buttonBackgroundColorBase: '#FFFFFF',
  buttonBackgroundColorModifier: 0.1,
  container: {
    top: imageHeight/10,
    backgroundColor: '#CAEEA2',
    width: imageWidth*0.9,
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    marginVertical: 20,
  },
  buttonText: {
    fontWeight: '600',
    alignItems: 'center',
    fontSize: INPUT_HEIGHT/2.5,
    color: '#316538',
  },
};

export default textbutton_styles