// components/molecules/PlayerCardButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { toggleUserStatus } from '../../services/user';
import Text from '../atoms/CustomText';
import ActiveCardButton from '../molecules/ActiveCardButton';

const PlayerCardButton = ({ user }) => {
  const { name, color } = user;

  const handlePlayerPress = async (isActive) => {
    await toggleUserStatus(name);
  };

  return (
    <ActiveCardButton
      onPress={handlePlayerPress}
      content={<Text>{name}</Text>}
      style={{ ...styles.container, backgroundColor: color }}
      active={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});


export default PlayerCardButton;
