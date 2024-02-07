// src/screens/SettingsScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import MenuButton from '../../components/molecules/MenuButton';
import BackButton from '../../components/organisms/BackButton';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={{ ...styles.container }}>
            <BackButton onPress={() => navigation.navigate('Home')} />
            <Text>Settings</Text>
            <MenuButton color={colors.primary.red} text="Dev" onPress={() => navigation.navigate('Components')} />
            <MenuButton color={colors.primary.orange} text="Modes" onPress={() => navigation.navigate('Modes')} />
            <MenuButton color={colors.primary.yellow} text="Users" onPress={() => navigation.navigate('Users')} />
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
});

export default SettingsScreen;
