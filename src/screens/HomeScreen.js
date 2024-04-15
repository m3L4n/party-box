// src/screens/HomeScreen.js

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import ModalComponent from '../../components/organisms/ModalComponent';
import SettingsButton from '../../components/organisms/SettingsButton';
import { loadModes } from '../../services/mode';
import { loadUsers } from '../../services/user';
const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleClick = async () => {
        const users = await loadUsers();
        const modes = await loadModes();
        if (users.length === 0) {
            navigation.navigate('Users');
        }
        else if (modes.length === 0) {
            navigation.navigate('Modes');
        }
        else {
            navigation.navigate('Play');
        }
    }


    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    return (
        <View style={{ ...styles.container }}>
            <SettingsButton onPress={openModal} />
            <>
                <Text style={{ ...styles.title }}>PartyBox</Text>
                <Text>v.1.0.0</Text>
            </>
            <MenuButton color={colors.primary.green} text="Partie Rapide" onPress={() => handleClick()} />
            <MenuButton color={colors.primary.blue} text="Partie Custom" onPress={() => navigation.navigate('Users')} />
            <ModalComponent visible={modalVisible} closeModal={closeModal} />
        </View >
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
        fontSize: 64,
        fontFamily: 'BebasNeue-Regular',
        letterSpacing: 5,
        color: 'black',
    },
});

export default HomeScreen;
