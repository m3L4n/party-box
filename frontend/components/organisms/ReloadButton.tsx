// components/molecules/AddButton.tsx

import React from "react"
import { StyleSheet } from "react-native"
import { colors } from "../../assets/colors"
import IconButton from "../molecules/IconButton"
import { ButtonProps } from "../atoms/Button"

const ReloadButton = ({ onPress, style }: ButtonProps) => {
  return (
    <IconButton
      accessibilityLabel="Reload button"
      content="refresh"
      onPress={onPress}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 99,
    fontSize: 30,
    color: "black",
    opacity: 0.8,
    backgroundColor: colors.primary.creme,
  },
})

export default ReloadButton
