// src/screens/HomeScreen.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ ...styles.container }}>
            <Text style={{ ...styles.title }}>Bouar</Text>
            <MenuButton color={colors.primary.green} text="Partie Rapide" onPress={() => navigation.navigate('PlayFast')} />
            <MenuButton color={colors.primary.blue} text="Partie Custom" />
            <MenuButton color={colors.primary.yellow} text="Users" onPress={() => navigation.navigate('Users')} />
            <MenuButton color={colors.primary.orange} text="Modes" onPress={() => navigation.navigate('Modes')} />
            <MenuButton color={colors.primary.red} text="Parametres" onPress={() => navigation.navigate('Settings')} />
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
});

export default HomeScreen;
