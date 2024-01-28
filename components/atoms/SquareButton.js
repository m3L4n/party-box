// components/atoms/SquareButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';

const SquareButton = ({ text, onPress, style }) => {
  return (
    <Button
      text={text}
      onPress={onPress}
      style={{ ...styles.container, ...style }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
});

export default SquareButton;
