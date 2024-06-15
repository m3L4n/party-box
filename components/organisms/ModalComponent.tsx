// components/organisms/ModalComponent.tsx

import React, { useState } from 'react';
import { Linking, Modal, StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../atoms/CustomText';
import MenuButton from '../molecules/MenuButton';
import CrossButton from './CrossButton';
import { useTranslation } from 'react-i18next';
import LanguageComponent from './LanguageComponent';
import RulesComponent from './RulesComponent';
import CreditsComponent from './CreditsComponent';

const ModalComponent = ({ visible, closeModal }: { visible: boolean, closeModal: () => void }) => {
  const { t } = useTranslation();
  const [rulesOpen, setRulesOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);

  const handlePressRules = () => {
    setRulesOpen(true);
    setCreditsOpen(false);
  };
  const handlePressCredits = () => {
    setCreditsOpen(true);
    setRulesOpen(false);
  };

  const handlePressClose = () => {
    if (rulesOpen || creditsOpen) {
      setRulesOpen(false);
      setCreditsOpen(false);
    } else {
      closeModal();
    }
  };

  const handlePressJoin = async () => {
    const email = 'partybox.contactus@gmail.com';
    const subject = 'Joining the game';
    const body = 'I want to join the game';
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error(`Cannot open url: ${url}`);
    }
  };

  const handlePressReport = async () => {
    const email = 'partybox.contactus@gmail.com';
    const subject = 'Reporting a bug';
    const body = 'I want to report a bug';
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.error(`Cannot open url: ${url}`);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ ...styles.modal }}>
        <CrossButton onPress={handlePressClose} />
        <Text style={{ ...styles.title }}>{t(rulesOpen || creditsOpen ? 'options' : 'settings')}</Text>
        {!rulesOpen && !creditsOpen &&
          <View>
            <MenuButton text={t("how_to_play")} onPress={handlePressRules} />
            <MenuButton text={t("want_to_join")} onPress={handlePressJoin} />
            <MenuButton text={t("report_bug")} onPress={handlePressReport} />
            <MenuButton text={t("credits")} onPress={handlePressCredits} />
            <LanguageComponent />
          </View>
        }
        {rulesOpen && <RulesComponent />}
        {creditsOpen && <CreditsComponent />}
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
    backgroundColor: colors.secondary.creme,
    margin: 30,
    borderRadius: 10,
    borderStyle: 'solid',
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default ModalComponent;