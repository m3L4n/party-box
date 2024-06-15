// components/organisms/ChooseColorComponent.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import ColorButton from '../molecules/ColorButton';
import { ScrollView } from 'react-native-gesture-handler';

const ChooseColorComponent = ({ onPress, active }: { onPress: (color: string) => void, active: string }) => {
  const [activeColor, setActiveColor] = React.useState(active);

  React.useEffect(() => {
    setActiveColor(active);
  }
    , [active]);

  const handleColorPress = (color: string) => {
    setActiveColor(color);
    onPress(color);
  };

  return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container} >
        {
          Object.values(colors.primary).map((color) => (
            <ColorButton
              key={color}
              onPress={() => handleColorPress(color)}
              color={color}
              isActive={activeColor === color}
            />
          ))
        }
      </View >
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    maxHeight: 60,
    marginHorizontal: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

export default ChooseColorComponent;