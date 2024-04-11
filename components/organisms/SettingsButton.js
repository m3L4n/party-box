// components/molecules/SettingsButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
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
        backgroundColor: 'lightblue',
    },
});

export default SettingsButton;