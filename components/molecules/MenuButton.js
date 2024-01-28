// components/molecules/MenuButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import RectangleButton from '../atoms/RectangleButton';

const MenuButton = ({ onPress, text, color }) => {
  return (
    <RectangleButton
      text={text}
      onPress={onPress}
      style={{ ...styles.container, backgroundColor: color }} />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});

export default MenuButton;