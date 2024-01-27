// src/screens/HomeScreen.js

import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import Button from '../../components/Button';

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary.pink,
    },
    title: {
        fontSize: 50,
        fontFamily: 'BebasNeue-Regular',
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 60,
    },
});

const HomeScreen = ({ navigation }) => {

    const loadFonts = async () => {
        try {
            await Font.useFonts({
                'BebasNeue-Regular': require('../../assets/fonts/BebasNeue-Regular.ttf'),
            });
        }
        catch (error) {
            console.error('Erreur lors du chargement des polices : ', error);
        }
    }

    loadFonts();

    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.title}>Bouar</Text>
            <Button color={colors.primary.green} title="Partie Rapide" onPress={() => navigation.navigate('PlayFast')} />
            <Button color={colors.primary.blue} title="Partie Custom" />
            <Button color={colors.primary.yellow} title="Users" onPress={() => navigation.navigate('Users')} />
            <Button color={colors.primary.red} title="Parametres" onPress={() => navigation.navigate('Settings')} />
        </View>
    );
};

export default HomeScreen;
