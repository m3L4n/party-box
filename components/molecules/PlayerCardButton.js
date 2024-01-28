// components/molecules/PlayerCardButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import CardButton from '../atoms/CardButton';

const PlayerCardButton = ({ user, onPlayerPress }) => {
  const { name, isActive } = user;

  const handlePress = (newState) => {
    onPlayerPress(name, newState);
  };

  return (
    <CardButton onPress={handlePress} initialState={isActive} />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});

export default PlayerCardButton;
