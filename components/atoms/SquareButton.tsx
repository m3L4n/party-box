// components/atoms/SquareButton.tsx

import React from "react"
import { StyleSheet } from "react-native"
import Button, { ButtonProps } from "./Button"

const SquareButton = ({
  content,
  onPress,
  style,
  accessibilityLabel,
}: ButtonProps) => {
  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      content={content}
      onPress={onPress}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
})

export default SquareButton
