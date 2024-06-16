// src/components/organisms/Background.tsx

import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

interface BackgroundProps {
  backgroundColor: string;
  backgroundImage: any;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ backgroundColor, backgroundImage, children }) => {
  return (
    <View
      style={[styles.color, { backgroundColor: backgroundColor }]}
    >
      {children}
      <ImageBackground
        resizeMode="repeat"
        style={styles.background}
        source={backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  color: {
    position: 'absolute',
    opacity: 1,
    top: 0,
    width: "100%",
    height: "100%",
  },
  background: {
    zIndex: -1,
    position: 'absolute',
    opacity: 0.2,
    width: "100%",
    height: "100%",
  },
});

export default Background;