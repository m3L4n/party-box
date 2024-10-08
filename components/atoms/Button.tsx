// components/atoms/Button.js

import React from "react"
import { StyleProp, StyleSheet, TouchableOpacity } from "react-native"

export interface ButtonProps {
  content?: any
  onPress?: () => void
  style?: StyleProp<any>
  active?: boolean
  navigation?: any
  accessibilityLabel?: string
}

const Button = ({
  content,
  onPress,
  style,
  accessibilityLabel,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel || "Button"}
      accessibilityRole="button"
      accessible={true}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {content}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 30,
    fontFamily: "BebasNeue-Regular",
    textAlign: "center",
  },
})

export default Button
