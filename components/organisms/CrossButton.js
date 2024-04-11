// components/molecules/CrossButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
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
        top: 20,
        right: 20,
        zIndex: 99,
        fontSize: 30,
        color: 'black',
        backgroundColor: 'lightblue',
    },
});

export default CrossButton;
