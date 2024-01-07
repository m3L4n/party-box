// components/BackButton.js

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../assets/colors';

const buttonStyles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'rgb(255, 198, 255)',
    },
    icon: {
        textAlign: 'center',
        fontSize: 30,
        color: colors.primary.yellow,
    },
});


const BackButton = ({ onPressBack }) => {
    return (
        <TouchableOpacity
            style={{ ...buttonStyles.container }}
            onPress={onPressBack}
        >
            <Ionicons name="arrow-back-outline" style={buttonStyles.icon} />
        </TouchableOpacity>
    );
}

export default BackButton;