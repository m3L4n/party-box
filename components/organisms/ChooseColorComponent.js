// components/organisms/ChooseColorComponent.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import ColorButton from '../molecules/ColorButton';

const ChooseColorComponent = ({ onPress }) => {
  const [activeColor, setActiveColor] = React.useState(null);

  const handleColorPress = (color) => {
    setActiveColor(color);
    onPress(color);
  };

  return (
    <View style={{ ...styles.container }}>
      {Object.values(colors.primary).map((color) => (
        <ColorButton
          key={color}
          onPress={() => handleColorPress(color)}
          color={color}
          isActive={activeColor === color}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default ChooseColorComponent;