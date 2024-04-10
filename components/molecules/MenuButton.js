// components/molecules/MenuButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../atoms/CustomText';
import RectangleButton from '../atoms/RectangleButton';

const MenuButton = ({ onPress, text, color, style }) => {

  return (
    <RectangleButton
      onPress={onPress}
      style={{ ...styles.container, backgroundColor: color, ...style }}
      content={
        <Text>
          {text}
        </Text >
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});

export default MenuButton;