// components/molecules/CrossButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';

const CrossButton = ({ onPress }) => {

    return (
        <IconButton
            onPress={onPress}
            style={styles.container}
            name="close"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 99,
        fontSize: 30,
        color: 'black',
        backgroundColor: colors.primary.red,
    },
});

export default CrossButton;
