// components/atoms/Input.js

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={{ ...styles.container }}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
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

export default Input;