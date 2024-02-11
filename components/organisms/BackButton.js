// components/molecules/BackButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import IconButton from '../molecules/IconButton';

const BackButton = ({ navigation }) => {
    const onPress = () => {
        console.log('BackButton');
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
        zIndex: 99,
        fontSize: 30,
        color: 'black',
        backgroundColor: 'lightblue',
    },
});

export default BackButton;
