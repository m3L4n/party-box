// components/molecules/ActiveCardButton.tsx

import React, { useState } from "react"
import { StyleProp, StyleSheet } from "react-native"
import CardButton from "../atoms/CardButton"
import { ButtonProps as BaseButtonProps } from "../atoms/Button"

interface ActiveCardButtonProps extends BaseButtonProps {
  onPress: () => void
  content: any
  style?: StyleProp<any>
  active?: boolean
  accessibilityLabel?: string
}

const ActiveCardButton = ({
  onPress,
  content,
  style,
  active,
  accessibilityLabel,
}: ActiveCardButtonProps) => {
  const [isActive, setIsActive] = useState(active)

  const handlePress = () => {
    setIsActive(!isActive)
    if (typeof onPress === "function") {
      onPress()
    }
  }

  return (
    <CardButton
      accessibilityLabel={accessibilityLabel || "active_card_button"}
      content={content}
      onPress={handlePress}
      style={[styles.container, style, { opacity: isActive ? 1 : 0.3 }]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    color: "black",
  },
})

export default ActiveCardButton
