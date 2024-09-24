// components/molecules/MenuButton.tsx

import React from "react";
import { StyleProp, StyleSheet } from "react-native";
import Text from "../atoms/CustomText";
import RectangleButton from "../atoms/RectangleButton";
import { ButtonProps } from "../atoms/Button";

interface MenuButtonProps {
  text: string;
  color?: string;
  onPress: () => void;
  style?: StyleProp<any>;
  accessibilityLabel?: string;
}

const MenuButton = ({
  onPress,
  text,
  color,
  style,
  accessibilityLabel,
}: MenuButtonProps) => {
  return (
    <RectangleButton
      accessibilityLabel={accessibilityLabel || "MenuButton"}
      content={<Text style={{ ...styles.text }}>{text}</Text>}
      onPress={onPress}
      style={{ ...styles.container, backgroundColor: color, ...style }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: "black",
  },
  text: {
    fontSize: 30,
  },
});

export default MenuButton;
