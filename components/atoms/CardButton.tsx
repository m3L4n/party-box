// components/atoms/CardButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import Button, { ButtonProps } from './Button';

const CardButton = ({ content, onPress, style }: ButtonProps) => {
  return (
    <Button
      content={content}
      onPress={onPress}
      style={[styles.container, style]}
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
