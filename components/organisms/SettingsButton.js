// components/molecules/SettingsButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';

const SettingsButton = ({ onPress }) => {

    return (
        <IconButton
            onPress={onPress}
            style={styles.container}
            name="settings"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 99,
        fontSize: 30,
        color: 'black',
        opacity: 0.8,
        backgroundColor: colors.primary.creme,
    },
});

export default SettingsButton;
