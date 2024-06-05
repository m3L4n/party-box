// components/molecules/TrashButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';
import { ButtonProps } from '../atoms/Button';

const TrashButton = ({ onPress, style }: ButtonProps) => {
  return (
    <IconButton
      onPress={onPress}
      style={{ ...styles.container, ...style }}
      content="trash"
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
    opacity: 0.8,
    backgroundColor: colors.primary.red,
  },
});

export default TrashButton;
