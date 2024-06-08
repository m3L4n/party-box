// components/molecules/MenuButton.tsx

import React from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import Text from '../atoms/CustomText';
import RectangleButton from '../atoms/RectangleButton';
import { ButtonProps } from '../atoms/Button';

interface MenuButtonProps {
  text: string;
  color?: string;
  onPress: () => void;
  style?: StyleProp<any>;
}

const
  MenuButton = ({ onPress, text, color, style }: MenuButtonProps) => {

    return (
      <RectangleButton
        onPress={onPress}
        style={{ ...styles.container, backgroundColor: color, ...style }}
        content={
          <Text style={{ ...styles.text }}>
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
  text: {
    fontSize: 30,
  }
});

export default MenuButton;