import { launchImageLibrary } from 'react-native-image-picker';

const photoPicker = async (previousImageUri, callback) => {
    await launchImageLibrary({}, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (!response.didCancel && response.assets[0].uri !== previousImageUri) {
        callback(response.assets[0].uri);
        }
    });
  };
export default photoPicker;
