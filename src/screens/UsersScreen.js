// src/screens/UsersScreen.js

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import AddButton from '../../components/organisms/AddButton';
import AnimatedBackground from '../../components/organisms/AnimatedBackground';
import BackButton from '../../components/organisms/BackButton';
import TrashButton from '../../components/organisms/TrashButton';
import UserCard from '../../components/organisms/UserCard';
import { deleteUser, getActiveUsers, loadUsers, toggleUserStatus } from "../../services/user";
import { getRandomColorBackground } from '../../services/utils';

const UsersScreen = ({ navigation }) => {
    const [userList, setUserList] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(getRandomColorBackground());

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setBackgroundColor(getRandomColorBackground());
        });
        return unsubscribe;
    }, [navigation]);

    const handleUserPress = async (userName) => {
        if (deleteMode) {
            const updatedUsers = await deleteUser(userName);
            setUserList(updatedUsers);
        } else {
            const updatedUsers = await toggleUserStatus(userName);
            setUserList(updatedUsers);
        }
    };

    const toggleDeleteMode = async () => {
        setDeleteMode(!deleteMode);
    }

    const handleNextButtonPress = async () => {
        const list = await getActiveUsers();
        if (list.length <= 1) {
            alert('Veuillez sélectionner au moins deux joueurs !');
            return;
        }
        navigation.navigate('Modes');
    }

    return (
        <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
            <AnimatedBackground />
            <BackButton navigation={navigation} />
            <TrashButton onPress={toggleDeleteMode} />
            <Text style={{ ...styles.title }}>Users</Text>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
                {userList.map((user, index) => (
                    <View key={index} style={{ position: 'relative', }}>
                        {deleteMode && (
                            <TrashButton onPress={() => handleUserPress(user.name)} style={{ ...styles.trashButton }} />
                        )}
                        <UserCard key={index} user={user} onPress={(userName, isActive) => handleUserPress(userName, isActive)} />
                    </View>
                ))}
                <AddButton onPress={() => navigation.navigate('CreateUser')} style={{ ...styles.addButton }} />
            </ScrollView>
            <MenuButton color={colors.primary.green} text="Suivant" onPress={handleNextButtonPress} />
        </View >
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
    },
    title: {
        fontSize: 50,
        letterSpacing: 5,
        color: 'black',
        marginBottom: 30,
    },
    addButton: {
        marginHorizontal: 16.1,
        marginVertical: 40,
    }
});

export default UsersScreen;
