// components/molecules/BackButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import SquareButton from '../atoms/SquareButton';

const BackButton = ({ onPress }) => {
    return (
        <SquareButton
            text={'Back'}
            onPress={onPress}
            style={{ ...styles.container }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        color: 'black',
    },
});

export default BackButton;
