import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/12;
const BORDER_RADIUS = 10;

const textbox_styles = {
  $buttonBackgroundColorBase: '#FFFFFF',
  $buttonBackgroundColorModifier: 0.1,
  container: {
    //top: imageHeight/15,
    backgroundColor: '#F0F0F0',
    width: imageWidth*0.9,
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    marginVertical: 15,
    borderColor: 'red',
    borderWidth: 0
  },

  buttonContainer: {
    height: INPUT_HEIGHT,
    width: imageWidth/3,
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection: 'row',
    //backgroundColor: '#F0F0F0',
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    //paddingHorizontal: 10,
    color: '#4F6D72',
  },
  separator: {
    height: INPUT_HEIGHT,
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#000000',
  },
  input: {
    flex: 1,
    height: INPUT_HEIGHT,
    borderTopRightRadius: BORDER_RADIUS,
    paddingHorizontal: 8,
    color: '#000000',
    fontSize: 18,
  },
};

export default textbox_styles