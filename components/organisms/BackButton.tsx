// components/molecules/BackButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';

const BackButton = ({ navigation }: { navigation: any }) => {
    const onPress = () => {
        navigation.goBack();
    }

    return (
        <IconButton
            onPress={onPress}
            style={styles.container}
            content="arrow-back"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 99,
        fontSize: 30,
        color: 'black',
        opacity: 0.8,
        backgroundColor: colors.primary.creme,
    },
});

export default BackButton;
