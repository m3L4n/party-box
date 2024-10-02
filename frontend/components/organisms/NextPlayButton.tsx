// components/molecules/ModeButton.tsx

import React from "react"
import { StyleProp, StyleSheet } from "react-native"
import Text from "../atoms/CustomText"
import RectangleButton from "../atoms/RectangleButton"
import LottieView from "lottie-react-native"
import { colors } from "../../assets/colors"
import { useTranslation } from "react-i18next"

interface NextPlayButtonProps {
  onPress: () => void
  style?: StyleProp<any>
  accessibilityLabel?: string
}

const NextPlayButton = ({
  onPress,
  style,
  accessibilityLabel,
}: NextPlayButtonProps) => {
  const { t } = useTranslation()

  return (
    <RectangleButton
      accessibilityLabel={accessibilityLabel || "ModeButton"}
      content={
        <>
          <Text style={{ ...styles.text }}>{t("play")}</Text>
          <LottieView
            source={require("../../assets/arrow.json")}
            autoPlay
            rotation={-90}
            style={styles.lottieAnimation}
          />
        </>
      }
      onPress={onPress}
      style={[styles.container, style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingLeft: 20,
    width: 200,
    color: "black",
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.primary.green,
  },
  text: {
    fontSize: 30,
  },
  lottieAnimation: {
    width: 42,
    height: 42,
  },
})

export default NextPlayButton