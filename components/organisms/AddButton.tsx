// components/molecules/AddButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
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
    backgroundColor: colors.primary.blue,
  },
});

export default AddButton;
