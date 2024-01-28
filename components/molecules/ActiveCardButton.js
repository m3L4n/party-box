// components/molecules/ActiveCardButton.js

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import CardButton from '../atoms/CardButton';

const ActiveCardButton = ({ onPress, content, style }) => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
    if (typeof onPress === 'function') {
      onPress(!isActive);
    }
  };

  return (
    <CardButton
      onPress={handlePress}
      style={{ ...styles.container, ...style, opacity: isActive ? 1 : 0.3 }}
      content={content}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});

export default ActiveCardButton;