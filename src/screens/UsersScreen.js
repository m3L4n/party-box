// src/screens/UsersScreen.js

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../assets/colors';
import SquareButton from '../../components/atoms/SquareButton';
import MenuButton from '../../components/molecules/MenuButton';
import BackButton from '../../components/organisms/BackButton';
import PlayerCardButton from '../../components/organisms/PlayerCardButton';
import User from '../../models/User';
import { clearData, loadUsers, toggleUserStatus } from "../../services/user";

const UsersScreen = ({ navigation }) => {
    const [userList, setUserList] = React.useState([User]);

    const fetchData = React.useCallback(async () => {
        const users = await loadUsers();
        setUserList(users);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation, fetchData]);

    const handleClearData = async () => {
        await clearData();
        setUserList([]);
    }

    const handleUserPress = async (userName) => {
        const updatedUsers = await toggleUserStatus(userName);
        setUserList(updatedUsers);
    };

    return (
        <View style={{ ...styles.container }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                <BackButton onPress={() => navigation.navigate('Home')} />
                <MenuButton color={colors.primary.green} text="Ajouter un utilisateur" onPress={() => navigation.navigate('CreateUser')} />
                <SquareButton color={colors.primary.red} text="DEL" onPress={handleClearData} />
            </View>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
                {userList.map((user, index) => (
                    <PlayerCardButton key={index} user={user} onPress={handleUserPress} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default UsersScreen;
