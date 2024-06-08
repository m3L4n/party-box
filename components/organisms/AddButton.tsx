// components/molecules/AddButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';
import { ButtonProps } from '../atoms/Button';

const AddButton = ({ onPress, style }: ButtonProps) => {
  return (
    <IconButton
      onPress={onPress}
      style={[styles.container, style]}
      content="add"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 30,
    color: 'black',
    backgroundColor: colors.primary.blue,
  },
});

export default AddButton;
