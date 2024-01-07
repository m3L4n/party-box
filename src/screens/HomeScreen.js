// src/screens/HomeScreen.js

import React from 'react';
import { Button, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Play Fast" onPress={() => navigation.navigate('PlayFast')} />
        </View>
    );
};

export default HomeScreen;
