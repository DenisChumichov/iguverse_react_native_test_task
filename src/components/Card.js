import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import Draggable from 'react-native-draggable';
import qrcode from '../assets/qrcode.png';
import useScreenSize from '../effects/useScreenSize';

const Card = ({ imageUri, color, title, description }) => {
    const [cardHeight, setCardHeight] = useState(0);
    const screenSize = useScreenSize();
  return (
    <Draggable y={screenSize.height - cardHeight - 100}>
      <View
        onLayout={(event) => {
          setCardHeight(event.nativeEvent.layout.height);
        }}
        style={[
          styles.cardContainer,
          { width: screenSize.width - 20, backgroundColor: color },
        ]}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Image source={qrcode} style={styles.qrcode} />
        <View style={{ width: '65%' }}>
          <Text style={styles.title}>{title}</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </Draggable>
);
  };

  const styles = StyleSheet.create({
    cardContainer: {
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
  });

  Card.propTypes = {
    imageUri: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  export default Card;
