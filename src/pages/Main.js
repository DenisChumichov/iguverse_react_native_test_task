import React, { useState } from 'react';
import {
  BackHandler,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconButton from '../components/commons/IconButton';
import colors from '../styles/colors';
import useScreenSize from '../effects/useScreenSize';
import photoPicker from '../utils/photoPicker';
import ColorsBar from '../components/ColorsBar';
import Card from '../components/Card';

const Main = () => {
  const [chosenImageUri, setChosenImageUri] = useState();
  const [cardColor, setCardColor] = useState(Object.values(colors)[0]);

  const screenSize = useScreenSize();

  const onChooseImage = () => {
    photoPicker().then(setChosenImageUri).catch((error) => console.log(error));
  };

  const renderHeader = () => (
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
  );

  return (
    <>
      {chosenImageUri ? (
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={{ uri: chosenImageUri }}
        >
          <Card color={cardColor} imageUri={chosenImageUri} title="#QE9310" description="❤️ I play IguVerse and donate to Friends and Animals" />
          <ColorsBar chosenColor={cardColor} onColorChoose={setCardColor} />
        </ImageBackground>
      ) : (
        <Text style={[styles.selectImageText, { top: screenSize.height / 2 }]}>
          Select image
        </Text>
      )}
      {renderHeader()}
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
  selectImageText: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default Main;
