// components/atoms/Input.js

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const inputStyles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: 'black',
    fontFamily: 'BebasNeue-Regular',
  },
});

const Input = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={inputStyles.container}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default Input;