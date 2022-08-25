import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Draggable from 'react-native-draggable';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import IconButton from '../components/commons/IconButton';
import qrcode from '../assets/qrcode.png';

const Main = () => {
  const [chosenImageUri, setChosenImageUri] = useState();
  const sizeScreen = Dimensions.get('screen');
  const [screenSize, setScreenSize] = useState({
    width: sizeScreen.width,
    height: sizeScreen.height,
  });
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({screen}) =>
      setScreenSize({width: screen.width, height: screen.height}),
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const onChooseImage = async () => {
    await launchImageLibrary({}, response => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (!response.didCancel && response.assets[0].uri !== chosenImageUri) {
          setChosenImageUri(response.assets[0].uri);
        }
      }
    });
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
      <StatusBar translucent backgroundColor={'transparent'} />
      {console.log('contentHeight', contentHeight)}
      {chosenImageUri ? (
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={{uri: chosenImageUri}}>
          <Draggable y={screenSize.height - contentHeight - 20}>
            <View
              onLayout={event => {
                setContentHeight(event.nativeEvent.layout.height);
              }}
              style={[styles.contentContainer, {width: screenSize.width - 20}]}>
              <Image source={{uri: chosenImageUri}} style={styles.image} />
              <Image source={qrcode} style={styles.qrcode} />
              <View style={{width: '65%'}}>
                <Text style={styles.title}>#QE9310</Text>
                <Text>
                  ❤️ I play IguVerse and donate to Friends and Animals
                </Text>
              </View>
            </View>
          </Draggable>
        </ImageBackground>
      ) : (
        <Text style={[styles.selectImage, {top: screenSize.height / 2}]}>
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
  contentContainer: {
    padding: 15,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 16,
    marginRight: 15,
  },
  qrcode: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 0,
    right: 0,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  selectImage: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default Main;
