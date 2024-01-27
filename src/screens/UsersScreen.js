// src/screens/UsersScreen.js

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../assets/colors';
import SquareButton from '../../components/atoms/SquareButton';
import BackButton from '../../components/molecules/BackButton';
import MenuButton from '../../components/molecules/MenuButton';
import PlayerCardButton from '../../components/molecules/PlayerCardButton';
import User from '../../models/User';
import { addUser, clearData, loadUsers } from "../../services/user";

const usersStyles = StyleSheet.create({
    container: {
        paddingTop: 100,
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
    const [userList, setUserList] = useState([User]);

    useEffect(() => {
        const fetchData = async () => {
            const users = await loadUsers();
            setUserList(users);
        };

        fetchData();
    }, []);

    const handleAddUser = async () => {
        console.log('handleAddUser');
        const newUser = new User('Zak', colors.primary.blue);
        const updatedUsers = await addUser(newUser);
        setUserList(updatedUsers);
    };

    const handleClearData = async () => {
        await clearData();
        setUserList([]);
    }

    return (
        <View style={usersStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                <MenuButton color={colors.primary.green} text="Ajouter un utilisateur" onPress={handleAddUser} />
                <BackButton onPress={() => navigation.navigate('Home')} />
                <SquareButton color={colors.primary.red} text="DEL" onPress={handleClearData} />
            </View>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
                {userList.map((user, index) => (
                    <PlayerCardButton key={index} text={user.name} color={user.color} />
                ))}
            </ScrollView>
        </View>
    );
};

export default UsersScreen;
