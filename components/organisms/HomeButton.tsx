// components/molecules/TrashButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';
import { ButtonProps } from '../atoms/Button';

const HomeButton = ({ navigation, style }: ButtonProps) => {
  const onPress = () => {
    navigation.navigate('Home');
  }

  return (
    <IconButton
      onPress={onPress}
      style={[styles.container, style]}
      content="home"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 99,
    fontSize: 30,
    color: 'black',
    backgroundColor: colors.primary.creme,
  },
});

export default HomeButton;
