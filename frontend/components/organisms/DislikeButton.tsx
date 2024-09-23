// components/molecules/DislikeButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';
import { ButtonProps } from '../atoms/Button';

const DislikeButton = ({ onPress, style, accessibilityLabel }: ButtonProps) => {
  return (
    <IconButton
      onPress={onPress}
      style={[styles.container, style]}
      content="sad"
      accessibilityLabel={`dislike_button_${accessibilityLabel}`}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    fontSize: 30,
    color: 'black',
    opacity: 0.8,
    backgroundColor: colors.primary.red,
  },
});

export default DislikeButton;
