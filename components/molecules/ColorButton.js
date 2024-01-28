// components/molecules/ColorButton.js

import { StyleSheet } from 'react-native';
import Button from '../atoms/Button';

const ColorButton = ({ onPress, color, isActive }) => {
  return (
    <Button
      onPress={onPress}
      style={{
        ...styles.container, backgroundColor: color, opacity: isActive ? 1 : 0.5,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 20,
    borderRadius: 10,
  },
});

export default ColorButton;