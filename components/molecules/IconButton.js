// components/molecules/IconButton.js

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import SquareButton from '../atoms/SquareButton';

const IconButton = ({ name, onPress }) => {
  return (
    <SquareButton onPress={onPress}
      style={{ ...styles.container }}
      content={
        <Ionicons name={name} style={styles.icon} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 30,
    color: 'black',
    backgroundColor: 'lightblue',
  },
  icon: {
    fontSize: 30,
    color: 'black',
  },
});

export default IconButton;
