// components/atoms/Button.js

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const buttonStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'BebasNeue-Regular',
    textAlign: 'center',
  },
});

const Button = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity
      style={{ ...buttonStyles.container, ...style }}
      onPress={onPress}
    >
      <Text style={buttonStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
