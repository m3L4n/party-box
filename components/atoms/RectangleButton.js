// components/atoms/RectangleButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';

const RectangleButton = ({ content, onPress, style }) => {
    return (
        <Button
            content={content}
            onPress={onPress}
            style={{ ...styles.container, ...style }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 50
    },
});

export default RectangleButton;