// components/Button.js

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const buttonStyles = StyleSheet.create({
    container: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderWidth: 2,
        borderColor: 'black',
    },
    text: {
        color: 'black',
        textAlign: 'center',
    },
});


const Button = ({ color, title, onPress }) => {
    return (
        <TouchableOpacity
            style={{ ...buttonStyles.container, backgroundColor: color }}
            onPress={onPress}
        >
            <Text style={buttonStyles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const SmallButton = ({ color, title, onPress }) => {
    return (
        <TouchableOpacity
            style={{ ...buttonStyles.container, backgroundColor: color, width: 30, height: 30 }}
            onPress={onPress}
        >
            <Text style={buttonStyles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

export { SmallButton };
