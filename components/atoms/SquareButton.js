// components/atoms/SquareButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';

const squareButtonStyles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
});

const SquareButton = ({ text, onPress, style }) => {
  return (
    <Button
      text={text}
      onPress={onPress}
      style={{ ...squareButtonStyles.container, ...style }}
    />
  );
};

export default SquareButton;
