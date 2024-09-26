import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import LottieView from "lottie-react-native"

interface LottieMenuButtonProps {
  animationSource: any
  onPress: () => void
  style?: object
  accessibilityLabel?: string
}

const LottieMenuButton = ({
  onPress,
  animationSource,
  style,
  accessibilityLabel,
}: LottieMenuButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel || "LottieMenuButton"}
    >
      <LottieView source={animationSource} autoPlay style={styles.lottie} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    margin: -40,
    width: 300,
    height: 200,
  },
})

export default LottieMenuButton
