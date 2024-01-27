// components/atoms/RectangleButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';

const rectangleButtonStyles = StyleSheet.create({
    container: {
        width: 200,
        height: 50,
    },
});


const RectangleButton = ({ text, onPress, style }) => {
    return (
        <Button
            text={text}
            onPress={onPress}
            style={{ ...rectangleButtonStyles.container, ...style }}
        />
    );
};

export default RectangleButton;