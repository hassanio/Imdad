import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: imageHeight/6,
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: imageWidth/1.5,
    height: imageHeight/4,
    position: 'absolute',
  },
});
