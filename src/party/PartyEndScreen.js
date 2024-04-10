// src/screens/PartyEnd.js

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../assets/colors";
import Text from "../../components/atoms/CustomText";
import MenuButton from "../../components/molecules/MenuButton";

const PartyEndScreen = ({ navigation }) => {
  return (
    <TouchableOpacity style={{ ...styles.container }} onPress={() => navigation.navigate('Home')}>
      <Text style={{ ...styles.title }}> Fin de la partie !</Text>
      <MenuButton color={colors.primary.green} text="Rejouer ?" onPress={() => navigation.navigate('Play')} />
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
  title: {
    fontSize: 50,
    fontFamily: 'BebasNeue-Regular',
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PartyEndScreen;



