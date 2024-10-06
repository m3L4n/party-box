// components/molecules/LikeButton.tsx

import React from "react"
import { StyleSheet } from "react-native"
import { colors } from "../../assets/colors"
import { ButtonProps } from "../atoms/Button"
import LottieButton from "../molecules/LottieButton"

const LikeButton = ({ onPress, style, accessibilityLabel }: ButtonProps) => {
  return (
    <LottieButton
      accessibilityLabel={accessibilityLabel}
      animationSource={require("../../assets/happy_face.json")}
      onPress={onPress}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    fontSize: 30,
    color: "black",
    opacity: 0.8,
    backgroundColor: colors.primary.green,
  },
})

export default LikeButton
