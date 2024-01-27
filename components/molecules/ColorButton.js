// components/molecules/ColorButton.js

import { StyleSheet } from 'react-native';
import Button from '../atoms/Button';

const colorButtonStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 20,
    borderRadius: 10,
  },
});

const ColorButton = ({ onPress, color, isActive }) => {
  return (
    <Button
      onPress={onPress}
      style={{
        ...colorButtonStyles.container, backgroundColor: color, opacity: isActive ? 1 : 0.5,
      }}
    />
  );
}

export default ColorButton;