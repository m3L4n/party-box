// components/molecules/IconButton.tsx

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import SquareButton from '../atoms/SquareButton';
import { ButtonProps } from '../atoms/Button';

const IconButton = ({ content, onPress, style, accessibilityLabel }: ButtonProps) => {
  return (
    <SquareButton onPress={onPress}
      style={[styles.container, style]}
      content={
        <Ionicons name={content} style={styles.icon} />
      }
      accessibilityLabel={accessibilityLabel}
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
