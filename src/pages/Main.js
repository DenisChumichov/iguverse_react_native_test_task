import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Draggable from 'react-native-draggable';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {BlurView} from '@react-native-community/blur';
import IconButton from '../components/commons/IconButton';
import qrcode from '../assets/qrcode.png';
import colors from '../styles/colors';

const Main = () => {
  const [chosenImageUri, setChosenImageUri] = useState();
  const sizeScreen = Dimensions.get('screen');
  const [screenSize, setScreenSize] = useState({
    width: sizeScreen.width,
    height: sizeScreen.height,
  });
  const [contentHeight, setContentHeight] = useState(0);
  const [contentColor, setContentColor] = useState(Object.values(colors)[0]);

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

  const renderColors = () => (
    <BlurView style={styles.colorsContainer} blurAmount={5} overlayColor="">
      <ScrollView horizontal style={styles.colorsScroll}>
        {Object.values(colors).map(color => (
          <TouchableOpacity onPress={() => setContentColor(color)}>
            <View
              style={[
                styles.border,
                color === contentColor && {
                  ...styles.border,
                  backgroundColor: 'blue',
                },
              ]}>
              <View
                key={color}
                style={[styles.color, {backgroundColor: color}]}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BlurView>
  );

  const renderContent = () => (
    <Draggable y={screenSize.height - contentHeight - 100}>
      <View
        onLayout={event => {
          setContentHeight(event.nativeEvent.layout.height);
        }}
        style={[
          styles.contentContainer,
          {width: screenSize.width - 20, backgroundColor: contentColor},
        ]}>
        <Image source={{uri: chosenImageUri}} style={styles.image} />
        <Image source={qrcode} style={styles.qrcode} />
        <View style={{width: '65%'}}>
          <Text style={styles.title}>#QE9310</Text>
          <Text>❤️ I play IguVerse and donate to Friends and Animals</Text>
        </View>
      </View>
    </Draggable>
  );

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
      {chosenImageUri ? (
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={{uri: chosenImageUri}}>
          {renderContent()}
          {renderColors()}
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
  colorsContainer: {
    position: 'absolute',
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF8F',
    bottom: 0,
  },
  color: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  border: {
    marginHorizontal: 10,
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorsScroll: {
    paddingVertical: 18,
  },
});

export default Main;
