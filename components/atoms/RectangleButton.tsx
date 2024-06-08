// components/atoms/RectangleButton.tsx

import React from 'react';
import { StyleSheet } from 'react-native';
import Button, { ButtonProps } from './Button';

const RectangleButton = ({ content, onPress, style }: ButtonProps) => {
    return (
        <Button
            content={content}
            onPress={onPress}
            style={[styles.container, style]}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: 230,
        height: 50
    },
});

export default RectangleButton;