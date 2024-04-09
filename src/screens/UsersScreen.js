// src/screens/UsersScreen.js

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import BackButton from '../../components/organisms/BackButton';
import TrashButton from '../../components/organisms/TrashButton';
import UserCard from '../../components/organisms/UserCard';
import { deleteUser, loadUsers, toggleUserStatus } from "../../services/user";

const UsersScreen = ({ navigation }) => {
    const [userList, setUserList] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);

    const fetchData = useCallback(async () => {
        const users = await loadUsers();
        setUserList(users);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation, fetchData]);

    const handleUserPress = async (userName) => {
        if (deleteMode) {
            const updatedUsers = await deleteUser(userName);
            setUserList(updatedUsers);
            return;
        }
        const updatedUsers = await toggleUserStatus(userName);
        setUserList(updatedUsers);
    };

    const toggleDeleteMode = async () => {
        setDeleteMode(!deleteMode);
    }

    return (
        <View style={{ ...styles.container }}>
            <Text style={{ ...styles.title }}>Users</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                <BackButton navigation={navigation} />
                <MenuButton color={colors.primary.green} text="Ajouter un utilisateur" onPress={() => navigation.navigate('CreateUser')} />
                <TrashButton onPress={toggleDeleteMode} />
            </View>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
                {userList.map((user, index) => (
                    <View key={index} style={{ position: 'relative' }}>
                        {deleteMode && (
                            <TrashButton onPress={() => handleUserPress(user.name)} style={{ ...styles.trashButton }} />
                        )}
                        <UserCard key={index} user={user} onPress={handleUserPress} />
                    </View>
                ))}
            </ScrollView>
            <MenuButton color={colors.primary.red} text="Suivant" onPress={() => navigation.navigate('ModesCustom')} />
        </View>
    );
};

const styles = StyleSheet.create({
    trashButton: {
        position: 'absolute',
        bottom: -10,
        left: 15,
        zIndex: 99,
    },
    container: {
        paddingTop: 100,
        paddingBottom: 100,
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
