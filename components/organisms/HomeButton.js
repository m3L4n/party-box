// components/molecules/TrashButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton from '../molecules/IconButton';

const HomeButton = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('Home');
  }

  return (
    <IconButton
      onPress={onPress}
      style={{ ...styles.container }}
      name="home"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    fontSize: 30,
    color: 'black',
    backgroundColor: 'lightblue',
    position: 'fixed',
    top: 0,
    left: 0,
  },
});

export default HomeButton;
