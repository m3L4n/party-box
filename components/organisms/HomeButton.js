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
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 99,
    fontSize: 30,
    color: 'black',
    backgroundColor: 'lightblue',
  },
});

export default HomeButton;
