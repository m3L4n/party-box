import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../atoms/CustomText';
import ActiveCardButton from '../molecules/ActiveCardButton';
import { User } from '../../models/User';

interface UserCardProps {
  user: User;
  onPress: () => Promise<void>;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const { name, color, isActive } = user;

  return (
    <ActiveCardButton
      onPress={onPress}
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
