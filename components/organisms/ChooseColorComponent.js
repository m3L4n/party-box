// components/organisms/ChooseColorComponent.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import ColorButton from '../molecules/ColorButton';

const ChooseColorComponent = ({ onPress, active }) => {
  const [activeColor, setActiveColor] = React.useState(active);

  React.useEffect(() => {
    setActiveColor(active);
  }
    , [active]);

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
    gap: 10,
  },
});

export default ChooseColorComponent;