// components/organisms/ModalComponent.tsx

import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { colors } from "../../assets/colors";
import Text from "../atoms/CustomText";
import MenuButton from "../molecules/MenuButton";
import CrossButton from "./CrossButton";
import { useTranslation } from "react-i18next";
import LanguageComponent from "./LanguageComponent";
import RulesComponent from "./RulesComponent";
import CreditsComponent from "./CreditsComponent";
import * as Linking from "expo-linking";

const ModalComponent = ({
  visible,
  closeModal,
}: {
  visible: boolean;
  closeModal: () => void;
}) => {
  const version = require("../../package.json").version;
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
    try {
      const email = "partybox.contactus@gmail.com";
      const subject = encodeURIComponent("Joining the game");
      const body = encodeURIComponent("I want to join the game");
      const url = `mailto:${email}?subject=${subject}&body=${body}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      } else {
        console.error(`Cannot open url: ${url}`);
      }
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  const handlePressReport = async () => {
    try {
      const email = "partybox.contactus@gmail.com";
      const subject = encodeURIComponent("Reporting a bug");
      const body = encodeURIComponent("I want to report a bug");
      const url = `mailto:${email}?subject=${subject}&body=${body}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        console.log(`Opening URL: ${url}`);
        Linking.openURL(url);
      } else {
        console.error(`Cannot open url: ${url}`);
      }
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ ...styles.modal }}>
        <CrossButton onPress={handlePressClose} />
        {!rulesOpen && !creditsOpen ? <>
            <Text style={{ ...styles.title }}>{t('settings')}</Text>
            <View>
              <MenuButton text={t("how_to_play")} onPress={handlePressRules} accessibilityLabel='how_to_play' />
              <MenuButton text={t("want_to_join")} onPress={handlePressJoin} accessibilityLabel='want_to_join' />
              <MenuButton text={t("report_bug")} onPress={handlePressReport} accessibilityLabel='report_bug' />
              <MenuButton text={t("credits")} onPress={handlePressCredits} accessibilityLabel='credits' />
              <LanguageComponent />
              <Text style={styles.version}>v.{version}</Text>
            </View>
          </> : null
        )}
        {rulesOpen ? <RulesComponent /> : null}
        {creditsOpen ? <CreditsComponent /> : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "BebasNeue-Regular",
    letterSpacing: 5,
    color: "black",
    marginBottom: 20,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary.creme,
    margin: 30,
    borderRadius: 10,
    borderStyle: "solid",
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderWidth: 2,
    borderColor: "black",
  },
  version: {
    fontSize: 20,
    fontFamily: "BebasNeue-Regular",
    letterSpacing: 5,
    color: "black",
    marginTop: 40,
  },
});

export default ModalComponent;
