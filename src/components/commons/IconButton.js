import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const IconButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>{icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onPress: PropTypes.func
};

IconButton.defaultProps = {
  onPress: () => {}
};

export default IconButton;
