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

const ColorButton = ({ onPress, color }) => {
  return (
    <Button
      onPress={onPress}
      style={{ ...colorButtonStyles.container, backgroundColor: color }}
    />
  );
}

export default ColorButton;