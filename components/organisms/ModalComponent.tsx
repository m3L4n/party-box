// components/organisms/ModalComponent.tsx

import React, { useState } from 'react';
import { Linking, Modal, StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../atoms/CustomText';
import MenuButton from '../molecules/MenuButton';
import CrossButton from './CrossButton';
import { useTranslation } from 'react-i18next';
import LanguageComponent from './LanguageComponent';

const ModalComponent = ({ visible, closeModal }: { visible: boolean, closeModal: () => void }) => {
  const { t } = useTranslation();
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
  }

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
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ ...styles.modal }}>
        <CrossButton onPress={rulesOpen ? handlePressRulesClose : closeModal} />
        {rulesOpen ?
          <Text style={{ ...styles.title }}>{t('options')}</Text> :
          <Text style={{ ...styles.title }}>{t('settings')}</Text>
        }
        {!rulesOpen &&
          <View>
            <MenuButton text={t("how_to_play")} onPress={handlePressRules} />
            <MenuButton text={t("want_to_join")} onPress={handlePressJoin} />
            <MenuButton text={t("report_bug")} onPress={handlePressReport} />
            <MenuButton text={t("credits")} onPress={handlePressCredits} />
            <LanguageComponent />
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
    backgroundColor: colors.secondary.creme,
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
});

export default ModalComponent;