// src/screens/HomeScreen.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import BackButton from '../../components/BackButton';

const usersStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary.pink,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 60,
    },
});

const UsersScreen = ({ navigation }) => {
    return (
        <View style={usersStyles.container}>
            <BackButton onPressBack={() => navigation.navigate('Home')} />
            <Text style={usersStyles.title}>Users</Text>
        </View>
    );
};

export default UsersScreen;
