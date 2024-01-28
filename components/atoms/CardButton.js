// components/atoms/CardButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';

const CardButton = ({ text, onPress, style }) => {
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
    width: 82.2,
    height: 112.2,
  },
});

export default CardButton;
