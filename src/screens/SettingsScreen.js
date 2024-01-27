// src/screens/SettingsScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import BackButton from '../../components/BackButton';

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
            <BackButton onPressBack={() => navigation.navigate('Home')} />
            <Text>Settings</Text>
        </View>
    );
};

export default SettingsScreen;