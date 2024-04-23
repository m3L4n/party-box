import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';

const SpinButton = ({ onPress }) => (
  <MenuButton
    text="Spin"
    onPress={onPress}
    style={{
      backgroundColor: 'green',
      bottom: 77,
      width: 100,
      height: 50,
      alignSelf: 'center',
      position: 'fixed',
      bottom: -40,
    }}
  />
);

const SpinWheel = ({ players, onSpin, color }) => {
  const [spinValue] = useState(new Animated.Value(0));
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      const randomValue = Math.random() * players.length * 2;
      Animated.timing(spinValue, {
        toValue: randomValue,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        setIsSpinning(false);
        onSpin && onSpin();
      });
    }
  }, [isSpinning, onSpin]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const playerSegments = players.map((player, index) => {
    const angle = Math.PI * 2 * (index / players.length);
    const radius = 60;

    const styles = StyleSheet.create({
      playerText: {
        position: 'absolute',
        transform: [
          { translateX: radius * Math.cos(angle) },
          { translateY: radius * Math.sin(angle) },
          { rotate: `${angle}rad` },
        ],
      },
    });

    return (
      <Text key={player} style={styles.playerText}>
        {player}
      </Text>
    );
  });

  return (
    <View style={{ position: 'relative' }}>
      <Animated.View style={{ ...styles.wheel, transform: [{ rotate: spin }], backgroundColor: color }}>
        {playerSegments}
      </Animated.View>
      <View style={styles.centerDot} />
      <Ionicons name={"arrow-up"} style={{ ...styles.icon }} />
      <SpinButton onPress={() => setIsSpinning(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  wheel: {
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: 'lightgray',
    borderBlockColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    top: 110,
    left: 110,
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    left: 115 - 25,
    fontSize: 50,
    color: 'black',
  },
});

export default SpinWheel;
