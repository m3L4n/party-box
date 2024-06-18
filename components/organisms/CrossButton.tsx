// components/molecules/CrossButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';
import IconButton from '../molecules/IconButton';
import { ButtonProps } from '../atoms/Button';

const CrossButton = ({ onPress, style }: ButtonProps) => {


    return (
        <IconButton
            onPress={onPress}
            style={[styles.container, style]}
            content="close"
            accessibilityLabel='Close button'
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
