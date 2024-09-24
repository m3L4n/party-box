// components/atoms/Input.tsx

import React from "react";
import { StyleSheet, TextInput } from "react-native";

type InputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
};

const Input = ({ placeholder, onChangeText, value }: InputProps) => {
  return (
    <TextInput
      accessibilityRole="text"
      accessible={true}
      editable={true}
      focusable={true}
      maxLength={40}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[styles.container]}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: "black",
    fontFamily: "BebasNeue-Regular",
  },
});

export default Input;
