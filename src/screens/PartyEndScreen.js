// src/screens/PartyEnd.js

import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/colors";
import Text from "../../components/atoms/CustomText";
import MenuButton from "../../components/molecules/MenuButton";

const PartyEndScreen = ({ navigation }) => {
  return (
    <TouchableOpacity style={{ ...styles.container }} onPress={() => navigation.navigate('Home')}>
      <View>
        <Text> Session finish !</Text>
        <MenuButton color={colors.primary.green} text="Rejouer ?" onPress={() => navigation.navigate('Play')} />
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
    backgroundColor: colors.secondary.pink,
  },
});

export default PartyEndScreen;



