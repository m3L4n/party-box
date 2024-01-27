// src/screens/UsersScreen.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../assets/colors';
import Button from '../../components/atoms/RectangleButton';
import BackButton from '../../components/molecules/BackButton';

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
    const [userList, setUserList] = useState([]);

    const loadUsers = async () => {
        try {
            const users = await AsyncStorage.getItem('users');
            console.log('users', users);
            if (users) {
                setUserList(JSON.parse(users));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs : ', error);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const addUser = async (user) => {
        console.log('addUser', user);
        try {
            const users = await AsyncStorage.getItem('users');
            let userList = [];
            if (users) {
                userList = JSON.parse(users);
            }
            userList.push(user);
            await AsyncStorage.setItem('users', JSON.stringify(userList));
            setUserList(userList);
            loadUsers();
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un utilisateur : ', error);
        }
    }

    return (
        <View style={usersStyles.container}>
            <BackButton onPressBack={() => navigation.navigate('Home')} />
            <Button color={colors.primary.green} title="Ajouter un utilisateur" onPress={() => addUser('user')} />
            <Text>{JSON.stringify(userList)}</Text>
            <Text style={usersStyles.title}>Users</Text>
        </View>
    );
};

export default UsersScreen;
