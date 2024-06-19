// src/screens/HomeScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import ModalComponent from '../../components/organisms/ModalComponent';
import SettingsButton from '../../components/organisms/SettingsButton';
import { getActiveModes } from '../../services/mode';
import { getActiveUsers } from '../../services/user';
import { t } from 'i18next';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleClick = async () => {
        if ((await getActiveUsers()).length < 2) {
            navigation.navigate('Users');
        }
        else if ((await getActiveModes()).length < 1) {
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
            <Text style={styles.title}>Party Box</Text>
            <MenuButton color={colors.primary.green} text={t("quick_play")} accessibilityLabel="quick_play" onPress={() => handleClick()} />
            <MenuButton color={colors.primary.blue} text={t("custom_game")} accessibilityLabel="custom_game" onPress={() => navigation.navigate('Users')} />
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
