// src/screens/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import AnimatedBackground from '../../components/organisms/AnimatedBackground';
import ModalComponent from '../../components/organisms/ModalComponent';
import SettingsButton from '../../components/organisms/SettingsButton';
import { loadModes } from '../../services/mode';
import { loadUsers } from '../../services/user';
import { getRandomColorBackground } from '../../services/utils';
import { t } from 'i18next';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const version = require('../../package.json').version;
    const [modalVisible, setModalVisible] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(getRandomColorBackground());

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setBackgroundColor(getRandomColorBackground());
        });
        return unsubscribe;
    }, [navigation]);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    return (
        <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
            <AnimatedBackground />
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
