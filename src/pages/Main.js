import React, {useState} from 'react';
import {
  BackHandler,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import IconButton from '../components/commons/IconButton';

const Main = () => {
  const [chosenImageUri, setChosenImageUri] = useState();

  const onChooseImage = async () => {
    await launchImageLibrary({}, response => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (!response.didCancel) {
          setChosenImageUri(response.assets[0].uri);
        }
      }
    });
  };

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      {chosenImageUri && (
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={{uri: chosenImageUri}}
        />
      )}

      <View style={styles.header}>
        <IconButton
          onPress={() => BackHandler.exitApp()}
          icon={<Icon name="arrowleft" size={25} />}
        />
        <IconButton
          onPress={onChooseImage}
          icon={<Icon name="upload" size={25} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 25,
  },
});

export default Main;
