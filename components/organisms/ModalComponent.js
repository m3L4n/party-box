// components/molecules/ModalComponent.js

import React, { useState } from 'react';
import { Linking, Modal, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../atoms/CustomText';
import MenuButton from '../molecules/MenuButton';
import CrossButton from './CrossButton';

const ModalComponent = ({ visible, closeModal }) => {
  const [rulesOpen, setRulesOpen] = useState(false);

  const handlePressRules = async () => {
    setRulesOpen(true);
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

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ ...styles.modal }}>
        <CrossButton onPress={closeModal} />
        <Text style={{ ...styles.title }}>Options</Text>
        {!rulesOpen &&
          <View>
            <MenuButton text="Rules" onPress={handlePressRules} />
            <MenuButton text="Want to join?" onPress={handlePressJoin} />
            <MenuButton text="Report a bug" onPress={handlePressReport} />
            <MenuButton text="Credits" onPress={handlePressCredits} />
            {false && <MenuButton text="Log out" onPress={handlePressLogout} />}
          </View>
        }
        {rulesOpen &&
          <View>
            <Text>Rules</Text>
            <Text>1. Don't cheat</Text>
            <Text>2. Have fun</Text>
            <MenuButton text="Back" onPress={() => setRulesOpen(false)} />
          </View>
        }
      </View>
    </Modal>
  );
}

const styles = {
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
};

export default ModalComponent;