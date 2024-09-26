import React from "react"
import { StyleSheet } from "react-native"
import LottieView from "lottie-react-native"
import SquareButton from "../atoms/SquareButton"
import { ButtonProps } from "../atoms/Button"

interface LottieButtonProps extends ButtonProps {
  animationSource: any
}

const LottieButton = ({
  animationSource,
  onPress,
  style,
  accessibilityLabel,
}: LottieButtonProps) => {
  return (
    <SquareButton
      accessibilityLabel={accessibilityLabel}
      content={
        <LottieView
          source={animationSource}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      }
      onPress={onPress}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 50,
    height: 50,
  },
})

export default LottieButton
