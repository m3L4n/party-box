// components/organisms/CreditsComponent.tsx

import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Text from '../atoms/CustomText';
import { TouchableOpacity } from 'react-native-gesture-handler';

const contributors = [
  { name: 'Jurichar', url: 'https://github.com/jurichar' },
  { name: 'Mpochard', url: 'https://github.com/m3L4n' },
];

const CreditsComponent = () => {
  const handlePress = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error(`Cannot open url: ${url}`);
    }
  };

  return (
    <View style={styles.credits}>
      {contributors.map((contributor, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(contributor.url)}>
          <Text style={styles.contributor}>{contributor.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  credits: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contributor: {
    fontSize: 20,
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
});

export default CreditsComponent;
