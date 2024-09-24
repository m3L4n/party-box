// components/molecules/BackButton.tsx

import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../assets/colors";
import IconButton from "../molecules/IconButton";
import { ButtonProps } from "../atoms/Button";

const BackButton = ({ navigation, style }: ButtonProps) => {
  const onPress = () => {
    navigation.goBack();
  };

  return (
    <IconButton
      accessibilityLabel="back_button"
      content="arrow-back"
      onPress={onPress}
      style={[styles.container, style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 99,
    fontSize: 30,
    color: "black",
    opacity: 0.8,
    backgroundColor: colors.primary.creme,
  },
});

export default BackButton;
