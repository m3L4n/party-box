// components/molecules/ModalComponent.js

import React from 'react';
import { Modal, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../atoms/CustomText';
import CrossButton from './CrossButton';

const ModalComponent = ({ visible, closeModal }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ ...styles.modal }}>
        <CrossButton onPress={closeModal} />
        <Text style={{ ...styles.title }}>About</Text>
        <View>
          <Text style={{ textAlign: 'left' }}>Github: linkto.github.project/ </Text>
          <Text style={{ textAlign: 'left' }}>Email: mailto:mailsupport@glou.fr </Text>
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