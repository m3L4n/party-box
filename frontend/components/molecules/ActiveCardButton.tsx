// components/molecules/ActiveCardButton.tsx

import React, { useState } from "react";
import { StyleProp, StyleSheet } from "react-native";
import CardButton from "../atoms/CardButton";
import ButtonProps from "../atoms/Button";

interface ButtonProps {
  onPress: (isActive: boolean) => void;
  content: any;
  style?: StyleProp<any>;
  active?: boolean;
  accessibilityLabel?: string;
}

const ActiveCardButton = ({
  onPress,
  content,
  style,
  active,
  accessibilityLabel,
}: ButtonProps) => {
  const [isActive, setIsActive] = useState(active);

  const handlePress = () => {
    setIsActive(!isActive);
    if (typeof onPress === "function") {
      onPress(!isActive);
    }
  };

  return (
    <CardButton
      accessibilityLabel={accessibilityLabel || "active_card_button"}
      content={content}
      onPress={handlePress}
      style={[styles.container, style, { opacity: isActive ? 1 : 0.3 }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: "black",
  },
});

export default ActiveCardButton;
