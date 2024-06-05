// components/atoms/CustomText.tsx

import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Text = ({ children, style }: { children: React.ReactNode, style?: object }) => {
  return <RNText style={[styles.text, style]}>{children}</RNText>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: 'BebasNeue-Regular',
    textAlign: 'center',
  },
});

export default Text;