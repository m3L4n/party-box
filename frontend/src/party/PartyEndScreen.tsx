// src/screens/PartyEnd.tsx

import React from "react"
import { StyleSheet, View } from "react-native"
import Text from "../../components/atoms/CustomText"
import LottieView from "lottie-react-native"

const PartyEndScreen = () => {
  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.title }}> Fin de la partie !</Text>
      <LottieView
        source={require("../../assets/end.json")}
        autoPlay
        loop={false}
        style={{ width: 400, height: 400, position: "absolute" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 50,
    fontFamily: "BebasNeue-Regular",
    letterSpacing: 5,
    color: "black",
  },
})

export default PartyEndScreen
