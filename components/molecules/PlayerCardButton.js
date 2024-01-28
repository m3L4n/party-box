// components/molecules/PlayerCardButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import CardButton from '../atoms/CardButton';

const UserCardButton = ({ user, onPress }) => {
  const { name, color, isActive } = user;

  return (
    <CardButton
      text={name}
      onPress={() => onPress(name)}
      style={{ ...styles.container, backgroundColor: color, opacity: isActive ? 1 : 0.3 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});

export default UserCardButton;
