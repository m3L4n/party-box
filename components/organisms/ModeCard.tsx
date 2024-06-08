// components/molecules/ModeCard.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import { toggleModeStatus } from '../../services/mode';
import Text from '../atoms/CustomText';
import ActiveCardButton from '../molecules/ActiveCardButton';
import { Mode } from '../../models/Mode';

interface ModeCardProps {
  mode: Mode;
  onPress?: () => Promise<void>;
}

const ModeCard: React.FC<ModeCardProps> = ({ mode, onPress }) => {
  const { name, isActive } = mode;

  const handleModePress = async () => {
    await toggleModeStatus(name);
  };

  return (
    <ActiveCardButton
      onPress={handleModePress}
      content={<Text>{name}</Text>}
      style={{ ...styles.container, backgroundColor: colors.primary.creme }}
      active={isActive}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});

export default ModeCard;
