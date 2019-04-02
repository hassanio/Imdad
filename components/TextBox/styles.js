import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

const INPUT_HEIGHT = imageHeight/12;
const BORDER_RADIUS = 10;

export default EStyleSheet.create({
  $buttonBackgroundColorBase: '$white',
  $buttonBackgroundColorModifier: 0.1,
  container: {
    top: imageHeight/10,
    backgroundColor: '#F0F0F0',
    width: '90%',
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    marginVertical: 18,
  },

  buttonContainer: {
    height: INPUT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 20,
    color: '#4F6D72',
  },
  separator: {
    height: INPUT_HEIGHT,
    width: StyleSheet.hairlineWidth,
    backgroundColor: '$border',
  },
  input: {
    flex: 1,
    height: INPUT_HEIGHT,
    borderTopRightRadius: BORDER_RADIUS,
    paddingHorizontal: 8,
    color: '#000000',
    fontSize: 18,
  },
});