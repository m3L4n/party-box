// components/molecules/AddButton.js

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import SquareButton from '../atoms/SquareButton';

const AddButton = ({ onPress }) => {
  return (
    <SquareButton onPress={onPress}
      text={<Text>+</Text>}
      style={{ ...styles.container }}
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
