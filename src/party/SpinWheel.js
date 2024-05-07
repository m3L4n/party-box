import React, { useState } from 'react';
import { Animated, Button, StyleSheet, View } from 'react-native';
import WheelOfFortune from "react-native-wheel-of-fortune";

const SpinWheel = ({ players, onSpin, color }) => {
  const [spinValue] = useState(new Animated.Value(0));
  const [isSpinning, setIsSpinning] = useState(false);

  console.log(players)

  const participants = [
    '%10',
    '%20',
    '%30',
    '%40',
    '%50',
    '%60',
    '%70',
    '%90',
    'FREE',
  ];
  const wheelOptions = {
    rewards: participants,
    knobSize: 50,
    borderWidth: 5,
    borderColor: '#000',
    innerRadius: 50,
    duration: 4000,
    backgroundColor: 'transparent',
    textAngle: 'horizontal',
    knobSource: require('../../assets/images/knob.png'),
    getWinner: (value, index) => {
      this.setState({ winnerValue: value, winnerIndex: index });
    },
    onRef: ref => (this.child = ref),
  };
  return (
    <View style={{ position: 'relative' }}>
      <WheelOfFortune
        options={wheelOptions}
      />
      <Button title="Press me" onPress={() => { this.child._onPress() }} />
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
  icon: {
    position: 'absolute',
    bottom: 20,
    left: 115 - 25,
    fontSize: 50,
    color: 'black',
  },
});

export default SpinWheel;
