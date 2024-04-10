// components/molecules/AddButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton from '../molecules/IconButton';

const AddButton = ({ onPress, style }) => {
  return (
    <IconButton
      onPress={onPress}
      style={{ ...styles.container, ...style }}
      name="add"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 30,
    color: 'black',
    backgroundColor: 'lightblue',
  },
});

export default AddButton;
