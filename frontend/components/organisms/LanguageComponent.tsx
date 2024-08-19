// components/organisms/LanguageComponent.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
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
      <TouchableOpacity onPress={() => changeLanguage('fr')} accessibilityLabel="change_lang_fr" accessible={true}>
        <Image source={require('../../assets/images/fr.png')} style={[styles.image, { opacity: i18n.language === 'fr' ? 1 : 0.5, borderColor: i18n.language === 'fr' ? 'black' : 'white', borderWidth: 3, borderRadius: 10 }
        ]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLanguage('en')} accessibilityLabel="change_lang_en" accessible={true}>
        <Image source={require('../../assets/images/uk.png')} style={[styles.image, { opacity: i18n.language === 'en' ? 1 : 0.5, borderColor: i18n.language === 'en' ? 'black' : 'white', borderWidth: 3, borderRadius: 10 }
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
  },
  image: {
    borderRadius: 10,
    width: 80,
    height: 50,
  }
});

export default LanguageComponent;