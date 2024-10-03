// src/components/organisms/Background.tsx

import React from "react"
import { ImageBackground, StyleSheet, View } from "react-native"

interface BackgroundProps {
  backgroundColor: string
  children: React.ReactNode
  style?: any
}

const Background: React.FC<BackgroundProps> = ({
  backgroundColor,
  children,
  style = {},
}) => {
  return (
    <View style={[style, styles.color, { backgroundColor: backgroundColor }]}>
      {children}
      <ImageBackground
        resizeMode="repeat"
        source={require("../../assets/images/image.png")}
        style={styles.background}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  color: {
    position: "absolute",
    opacity: 1,
    top: 0,
    width: "100%",
    height: "100%",
  },
  background: {
    zIndex: -1,
    position: "absolute",
    opacity: 0.15,
    width: "100%",
    height: "100%",
  },
})

export default Background
