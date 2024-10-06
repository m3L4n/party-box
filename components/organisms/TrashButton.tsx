// components/molecules/TrashButton.tsx

import React from "react"
import { StyleSheet } from "react-native"
import { colors } from "../../assets/colors"
import IconButton from "../molecules/IconButton"
import { ButtonProps } from "../atoms/Button"

const TrashButton = ({ onPress, style, accessibilityLabel }: ButtonProps) => {
  return (
    <IconButton
      accessibilityLabel={`trash_button_${accessibilityLabel}`}
      content="trash"
      onPress={onPress}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 90,
    right: 20,
    zIndex: 99,
    fontSize: 30,
    color: "black",
    opacity: 0.8,
    backgroundColor: colors.primary.red,
  },
})

export default TrashButton
