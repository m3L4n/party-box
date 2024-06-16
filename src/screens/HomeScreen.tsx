// src/screens/HomeScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import ModalComponent from '../../components/organisms/ModalComponent';
import SettingsButton from '../../components/organisms/SettingsButton';
import { loadModes } from '../../services/mode';
import { loadUsers } from '../../services/user';
import { t } from 'i18next';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const version = require('../../package.json').version;
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
        <View style={styles.container}>
            <SettingsButton onPress={openModal} />
            <>
                <Text style={{ ...styles.title }}>Party Box</Text>
                <Text>v.{version}</Text>
            </>
            <MenuButton color={colors.primary.green} text={t("quick_play")} onPress={() => handleClick()} />
            <MenuButton color={colors.primary.blue} text={t("custom_game")} onPress={() => navigation.navigate('Users')} />
            <ModalComponent visible={modalVisible} closeModal={closeModal} />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 64,
        fontFamily: 'BebasNeue-Regular',
        letterSpacing: 2,
        color: 'black',
    },
});

export default HomeScreen;
