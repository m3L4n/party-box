// components/organisms/DefaultCards.tsx

import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../atoms/CustomText";
import { User } from "../../models/User";
import { Question } from "../../models/Question";

export const AllCard = () => {
  return (
    <View style={styles.allCard}>
      <Text>TOUT LE MONDE JOUE !</Text>
    </View>
  );
};

export const EmptyUserCard = ({ user }: { user: User }) => {
  return (
    <View style={[styles.allCard, { backgroundColor: user.color }]}>
      <Text>{user.name}</Text>
    </View>
  );
};

export const QuestionCard = ({ question }: { question: Question }) => {
  return (
    <View style={{ ...styles.allCard, width: "100%", height: "100%" }}>
      {question.content}
    </View>
  );
};

const styles = StyleSheet.create({
  allCard: {
    width: 82.2,
    height: 112.2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: "black",
  },
});
