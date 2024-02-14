// src/screens/PartyEnd.js

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/colors";
import MenuButton from "../../components/molecules/MenuButton";

const PartyEndScreen = ({ navigation }) => {
  return (
    <TouchableOpacity style={{ ...styles.container }} onPress={() => navigation.navigate('Home')}>
      <View>
        <Text> Session finish !</Text>
        <MenuButton color={colors.primary.green} text="Rejouer ?" onPress={() => navigation.navigate('PlayCustom')} />
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



