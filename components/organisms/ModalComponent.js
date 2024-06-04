// components/molecules/ModalComponent.js

import React from 'react';
import { Linking, Modal, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../atoms/CustomText';
import MenuButton from '../molecules/MenuButton';
import CrossButton from './CrossButton';

const ModalComponent = ({ visible, closeModal }) => {

  const handlePress = async () => {
    const url = "https://www.github.com/jurichar/"
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
        <CrossButton onPress={closeModal} />
        <Text style={{ ...styles.title }}>Options</Text>
        <View>
          <MenuButton text="Rules" onPress={handlePress} />
          <MenuButton text="Want to join?" onPress={handlePress} />
          <MenuButton text="Report a bug" onPress={handlePress} />
          <MenuButton text="Credits" onPress={handlePress} />
        </View>
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