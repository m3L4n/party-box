// src/screens/PartyEnd.js

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PartyEndScreen = ({ navigation }) => {
  return (
    <TouchableOpacity style={{ ...styles.container }} onPress={() => navigation.navigate('Home')}>
      <View>
        <Text> SESSION FINISH</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default PartyEndScreen;


