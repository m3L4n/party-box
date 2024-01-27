// components/organisms/ChooseColorComponent.js

import React from 'react';
import { View } from 'react-native';
import { colors } from '../../assets/colors';
import ColorButton from '../molecules/ColorButton';

const ChooseColorComponent = ({ onPress }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <ColorButton onPress={onPress} color={colors.primary.blue} />
      <ColorButton onPress={onPress} color={colors.primary.red} />
      <ColorButton onPress={onPress} color={colors.primary.green} />
      <ColorButton onPress={onPress} color={colors.primary.yellow} />
      <ColorButton onPress={onPress} color={colors.primary.orange} />
      <ColorButton onPress={onPress} color={colors.primary.purple} />
    </View>
  );
}

export default ChooseColorComponent;