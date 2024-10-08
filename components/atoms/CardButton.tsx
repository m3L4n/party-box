// components/atoms/CardButton.tsx

import React from "react"
import { StyleSheet } from "react-native"
import Button, { ButtonProps } from "./Button"

const CardButton = ({
  content,
  onPress,
  style,
  accessibilityLabel,
}: ButtonProps) => {
  return (
    <Button
      accessibilityLabel={accessibilityLabel || "card_button"}
      content={content}
      onPress={onPress}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 82.2,
    height: 112.2,
  },
})

export default CardButton
