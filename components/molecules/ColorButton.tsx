// components/molecules/ColorButton.tsx

import { StyleSheet } from 'react-native';
import Button from '../atoms/Button';

interface ColorButtonProps {
  onPress: () => void;
  color: string;
  isActive: boolean;
}

const ColorButton = ({ onPress, color, isActive }: ColorButtonProps) => {
  return (
    <Button
      onPress={onPress}
      content={''}
      style={{
        ...styles.container, backgroundColor: color, opacity: isActive ? 1 : 0.5,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
});

export default ColorButton;