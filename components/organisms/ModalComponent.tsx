// components/molecules/ModalComponent.tsx

import React, { useState } from 'react';
import { Image, Linking, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../atoms/CustomText';
import MenuButton from '../molecules/MenuButton';
import CrossButton from './CrossButton';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

const ModalComponent = ({ visible, closeModal }: { visible: boolean, closeModal: () => void }) => {
  const { t, i18n } = useTranslation();
  const [rulesOpen, setRulesOpen] = useState(false);

  const handlePressRules = async () => {
    setRulesOpen(true);
  }

  const handlePressRulesClose = async () => {
    setRulesOpen(false);
  }

  const handlePressCredits = async () => {
    const url = "https://www.github.com/jurichar/"
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error(`Cannot open url: ${url}`);
    }
  };

  const handlePressJoin = async () => {
    const email = '';
    const subject = 'Joining the game';
    const body = 'I want to join the game';
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error(`Cannot open url: ${url}`);
    }
  }

  const handlePressReport = async () => {
    const email = '';
    const subject = 'Reporting a bug';
    const body = 'I want to report a bug';
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error(`Cannot open url: ${url}`);
    }
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ ...styles.modal }}>
        <CrossButton onPress={rulesOpen ? handlePressRulesClose : closeModal} />
        {rulesOpen ?
          <Text style={{ ...styles.title }}>{t('options')}</Text> :
          <Text style={{ ...styles.title }}>{t('how_to_play')}</Text>
        }
        {!rulesOpen &&
          <View>
            <MenuButton text="How to play ?" onPress={handlePressRules} />
            <MenuButton text="Want to join ?" onPress={handlePressJoin} />
            <MenuButton text="Report a bug" onPress={handlePressReport} />
            <MenuButton text="Credits" onPress={handlePressCredits} />
            <View style={styles.language}>
              <TouchableOpacity onPress={() => changeLanguage('fr')} >
                <Image source={require('../../assets/fr.png')} style={styles.language.image} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeLanguage('en')}>
                <Image source={require('../../assets/uk.png')} style={styles.language.image} />
              </TouchableOpacity>
            </View>
          </View>
        }
        {rulesOpen &&
          <View style={{ ...styles.rules }}>
            <Text>- Select and create players</Text>
            <Text>- Select game modes</Text>
            <Text>- Start the game</Text>
          </View>
        }
      </View>
    </Modal >
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 5,
    color: 'black',
    marginBottom: 20,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary.pink,
    margin: 30,
    borderRadius: 10,
    borderStyle: 'solid',
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: 'black',
  },
  rules: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
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

export default ModalComponent;