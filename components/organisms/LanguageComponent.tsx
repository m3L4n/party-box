// components/organisms/LanguageComponent.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const LanguageComponent = () => {
  const { i18n } = useTranslation();
  const changeLanguage = async (lng: string) => {
    await AsyncStorage.setItem('lang', lng);
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.language}>
      <TouchableOpacity onPress={() => changeLanguage('fr')} >
        <Image source={require('../../assets/fr.png')} style={[styles.language.image, { opacity: i18n.language === 'fr' ? 1 : 0.5 }
        ]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLanguage('en')}>
        <Image source={require('../../assets/uk.png')} style={[styles.language.image, { opacity: i18n.language === 'en' ? 1 : 0.5 }
        ]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  language: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    image: {
      borderRadius: 10,
      width: 80,
      height: 50,
    }
  },
});

export default LanguageComponent;