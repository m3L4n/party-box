// src/screens/HomeScreen.js

import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import SettingsButton from '../../components/organisms/SettingsButton';

const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    return (
        <View style={{ ...styles.container }}>
            <SettingsButton onPress={openModal} />
            <Text style={{ ...styles.title }}>Glou</Text>
            <MenuButton color={colors.primary.green} text="Partie Rapide" onPress={() => navigation.navigate('Play')} />
            <MenuButton color={colors.primary.blue} text="Partie Custom" onPress={() => navigation.navigate('Users')} />
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={{ ...styles.modal }}>
                    <Text style={{ ...styles.title }}>About</Text>
                    {/* few information like github link, suggestion email address */}
                    <MenuButton color={colors.primary.blue} text="Close" onPress={closeModal} />
                    <Text>Github: linkto.github.project/ </Text>
                    <Text>Email: mailto:mailsupport@glou.fr </Text>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary.pink,
    },
    title: {
        fontSize: 50,
        fontFamily: 'BebasNeue-Regular',
        fontWeight: 'bold',
        color: 'black',
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
});

export default HomeScreen;
