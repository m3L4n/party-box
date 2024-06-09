// src/screens/UsersScreen.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import MenuButton from '../../components/molecules/MenuButton';
import AddButton from '../../components/organisms/AddButton';
import BackButton from '../../components/organisms/BackButton';
import TrashButton from '../../components/organisms/TrashButton';
import UserCard from '../../components/organisms/UserCard';
import { deleteUser, getActiveUsers, loadUsers, toggleUserStatus } from "../../services/user";
import { getRandomColorBackground } from '../../services/utils';
import { User } from '../../models/User';
import { t, use } from 'i18next';

interface UsersScreenProps {
    navigation: any;
}

const UsersScreen: React.FC<UsersScreenProps> = ({ navigation }) => {
    const [userList, setUserList] = useState<User[]>([]);
    const [deleteMode, setDeleteMode] = useState<boolean>(false);
    const [backgroundColor, setBackgroundColor] = useState<string>(getRandomColorBackground());

    const fetchData = useCallback(async () => {
        const users: User[] = await loadUsers();
        setUserList(users);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation, fetchData]);

    useEffect(() => {
        setBackgroundColor(getRandomColorBackground());
    }, []);

    const handleUserPress = async (userName: string) => {
        if (deleteMode) {
            const updatedUsers = await deleteUser(userName);
            setUserList(updatedUsers);
        } else {
            const updatedUsers = await toggleUserStatus(userName);
            setUserList(updatedUsers);
        }
    };

    const toggleDeleteMode = () => {
        setDeleteMode(!deleteMode);
    };

    const handleNextButtonPress = async () => {
        const list: User[] = await getActiveUsers();
        if (list.length <= 1) {
            Alert.alert(t('alert_players'));
            return;
        }
        navigation.navigate('Modes');
    };

    return (
        <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
            <BackButton navigation={navigation} />
            <TrashButton onPress={toggleDeleteMode} />
            <Text style={{ ...styles.title }}>{t('users')}</Text>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
                {userList.map((user, index) => (
                    <View key={index} style={{ position: 'relative', }}>
                        {deleteMode && (
                            <TrashButton onPress={() => handleUserPress(user.name)} style={{ ...styles.trashButton }} />
                        )}
                        <UserCard key={index} user={user} onPress={() => handleUserPress(user.name)} />
                    </View>
                ))}
                <AddButton onPress={() => navigation.navigate('CreateUser')} style={{ ...styles.addButton }} />
            </ScrollView>
            <MenuButton color={colors.primary.green} text={t('next')} onPress={handleNextButtonPress} />
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
    },
    title: {
        fontSize: 50,
        letterSpacing: 5,
        color: 'black',
        marginBottom: 30,
        marginTop: 30,
    },
    addButton: {
        marginHorizontal: 16.1,
        marginVertical: 40,
    }
});

export default UsersScreen;
