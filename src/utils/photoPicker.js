import { launchImageLibrary } from 'react-native-image-picker';

const photoPicker = async () => {
  const image = await launchImageLibrary();
  return image.assets[0].uri;
};
export default photoPicker;
