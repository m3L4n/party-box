// src/screens/SettingsScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import BackButton from '../../components/molecules/BackButton';
import MenuButton from '../../components/molecules/MenuButton';

const settingsStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary.pink,
    },
});

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={settingsStyles.container}>
            <BackButton onPress={() => navigation.navigate('Home')} />
            <Text>Settings</Text>
            <MenuButton color={colors.primary.red} text="Dev" onPress={() => navigation.navigate('Components')} />
        </View>
    );
};

export default SettingsScreen;
