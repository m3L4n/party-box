// src/screens/HomeScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import Button from '../../components/atoms/RectangleButton';

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
    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.title}>Bouar</Text>
            <Button color={colors.primary.green} text="Partie Rapide" onPress={() => navigation.navigate('PlayFast')} />
            <Button color={colors.primary.blue} text="Partie Custom" />
            <Button color={colors.primary.yellow} text="Users" onPress={() => navigation.navigate('Users')} />
            <Button color={colors.primary.red} text="Parametres" onPress={() => navigation.navigate('Settings')} />
            <Button color={colors.primary.red} text="Components" onPress={() => navigation.navigate('Components')} />
        </View>
    );
};

export default HomeScreen;
