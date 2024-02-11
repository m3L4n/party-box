// components/molecules/TrashButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';

const TrashButton = ({ onPress }) => {
  return (
    <IconButton
      onPress={onPress}
      style={styles.container}
      name="trash"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 30,
    color: 'black',
    backgroundColor: colors.primary.red,
  },
});

export default TrashButton;