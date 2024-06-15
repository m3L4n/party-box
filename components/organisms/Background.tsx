// src/components/organisms/Background.tsx

import { ImageBackground, StyleSheet } from 'react-native';
import backgroundImage from '../../assets/images/image.png'

const Background = () => {
  return (
    <ImageBackground
      resizeMode={"repeat"}
      style={styles.background}
      source={backgroundImage} />
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: 1200,
    height: 1200,
    top: 0,
    opacity: 0.2,
  },
});

export default Background;