import React from "react"
import { StyleSheet, View } from "react-native"
import LottieView from "lottie-react-native"

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/parrot.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 200,
    height: 200,
  },
})

export default LoadingScreen
