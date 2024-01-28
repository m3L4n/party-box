// components/molecules/ModeCard.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../atoms/CustomText';
import ActiveCardButton from '../molecules/ActiveCardButton';

const ModeCard = ({ mode }) => {
  const { name } = mode;

  const handlePlayerPress = async (isActive) => {
    console.log('mode pressed');
  };

  return (
    <ActiveCardButton
      onPress={handlePlayerPress}
      content={<Text>{name}</Text>}
      style={{ ...styles.container, backgroundColor: colors.primary.creme }}
      active={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});


export default ModeCard;
