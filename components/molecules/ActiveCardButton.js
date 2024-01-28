// components/molecules/ActiveCardButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import CardButton from '../atoms/CardButton';

const ActiveCardButton = ({ onPress }) => {

  return (
    <CardButton
      text={text}
      onPress={onPress}
      style={{ ...styles.container, backgroundColor: color, opacity: isActive ? 1 : 0.3 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
  },
});

export default ActiveCardButton;
