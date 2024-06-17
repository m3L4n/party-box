// components/organisms/CreditsComponent.tsx

import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Text from '../atoms/CustomText';
import { t } from 'i18next';
import MenuButton from '../molecules/MenuButton';

const contributors = [
  { name: 'Jurichar', url: 'https://github.com/jurichar' },
  { name: 'Mpochard', url: 'https://github.com/m3L4n' },
];

const CreditsComponent = () => {
  const handlePress = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        console.error(`Cannot open url: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <>
      <Text style={{ ...styles.title }}>{t('contributors')}</Text>
      <View style={styles.credits}>
        {contributors.map((contributor, index) => (
          <MenuButton key={index} onPress={() => handlePress(contributor.url)} text={contributor.name} >
          </MenuButton>
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
