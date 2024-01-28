// components/atoms/CustomText.js

import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = ({ children, style }) => {
  return <RNText style={{ ...styles.text, ...style }}>{children}</RNText>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'BebasNeue-Regular',
  },
});

export default Text;