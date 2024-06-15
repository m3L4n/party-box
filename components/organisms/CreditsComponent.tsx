// components/organisms/CreditsComponent.tsx

import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Text from '../atoms/CustomText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { t } from 'i18next';

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
    <>
      <Text style={{ ...styles.title }}>{t('contributors')}</Text>
      <View style={styles.credits}>
        {contributors.map((contributor, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(contributor.url)}>
            <Text style={styles.contributor}>{contributor.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  credits: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contributor: {
    fontSize: 32,
    color: 'blue',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
  title: {
    fontSize: 30,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 5,
    color: 'black',
    marginBottom: 20,
  },
});

export default CreditsComponent;
