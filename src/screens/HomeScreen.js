// src/screens/HomeScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 198, 255)',
    },
});

const HomeScreen = ({ navigation }) => {
    return (
        <View style={homeStyles.container}>
            <Text>Bouar</Text>
            <Button color="rgb(202, 255, 191)" title="Partie Rapide" onPress={() => navigation.navigate('PlayFast')} />
            <Button color="rgb(253, 255, 182)" title="Couleurs" onPress={() => navigation.navigate('Color')} />
        </View>
    );
};

export default HomeScreen;
