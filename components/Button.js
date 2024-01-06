import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            style={{ backgroundColor: 'blue', padding: 10, marginVertical: 10 }}
            onPress={onPress}
        >
            <Text style={{ color: 'white', textAlign: 'center' }}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
