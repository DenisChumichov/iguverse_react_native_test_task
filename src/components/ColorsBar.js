import React from 'react';
import PropTypes from 'prop-types';
import { BlurView } from '@react-native-community/blur';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';

const ColorsBar = ({ onColorChoose, chosenColor }) => (
  <BlurView style={styles.colorsContainer} blurAmount={5} overlayColor="">
    <ScrollView horizontal style={styles.colorsScroll}>
      {Object.values(colors).map((color) => (
        <TouchableOpacity key={color} onPress={() => onColorChoose(color)}>
          <View
            style={[
                styles.border,
                color === chosenColor && {
                  ...styles.border,
                  backgroundColor: 'blue',
                },
              ]}
          >
            <View
              style={[styles.color, { backgroundColor: color }]}
            />
          </View>
        </TouchableOpacity>
        ))}
    </ScrollView>
  </BlurView>
  );

  const styles = StyleSheet.create({
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

  ColorsBar.propTypes = {
    chosenColor: PropTypes.string.isRequired,
    onColorChoose: PropTypes.func
  };

  ColorsBar.defaultProps = {
    onColorChoose: () => {}
  };

  export default ColorsBar;
