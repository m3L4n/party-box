// components/Header.js

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const Header = ({ onPressSettings }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={onPressSettings}>
                <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
