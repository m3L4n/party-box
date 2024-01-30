// components/molecules/AddButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../atoms/CustomText';
import SquareButton from '../atoms/SquareButton';

const AddButton = ({ onPress }) => {
  return (
    <SquareButton
      onPress={onPress}
      style={styles.container}
      content={<Text>OK</Text>}
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
