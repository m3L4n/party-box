// components/molecules/TrashButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';

const TrashButton = ({ onPress, style }) => {
  return (
    <IconButton
      onPress={onPress}
      style={{ ...styles.container, ...style }}
      name="trash"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 99,
    fontSize: 30,
    color: 'black',
    backgroundColor: colors.primary.red,
  },
});

export default TrashButton;
