// components/molecules/UserCard.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { toggleUserStatus } from '../../services/user';
import Text from '../atoms/CustomText';
import ActiveCardButton from '../molecules/ActiveCardButton';

const UserCard = ({ user }) => {
  const { name, color, isActive } = user;

  const handlePlayerPress = async () => {
    await toggleUserStatus(name);
  };

  return (
    <ActiveCardButton
      onPress={handlePlayerPress}
      content={<Text>{name}</Text>}
      style={{ ...styles.container, backgroundColor: color }}
      active={isActive}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});


export default UserCard;
