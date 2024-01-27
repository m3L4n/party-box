// components/atoms/Input.js

import React from 'react';

import { StyleSheet, TextInput } from 'react-native';

const inputStyles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
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