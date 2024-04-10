// components/molecules/BackButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton from '../molecules/IconButton';

const BackButton = ({ navigation }) => {
    const onPress = () => {
        navigation.goBack();
    }

    return (
        <IconButton
            onPress={onPress}
            style={styles.container}
            name="arrow-back"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 99,
        fontSize: 30,
        color: 'black',
        backgroundColor: 'lightblue',
    },
});

export default BackButton;
