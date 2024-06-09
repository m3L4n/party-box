// services/user.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/User';

export const loadUsers = async (): Promise<User[]> => {
  try {
    const users = await AsyncStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs : ', error);
    return [];
  }
};

export const addUser = async (user: User) => {
  try {
    const users = await loadUsers();
    user.isActive = true;
    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    return;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un utilisateur : ', error);
    return;
  }
};

export const deleteUser = async (userName: string) => {
  try {
    const users = await loadUsers();
    const updatedUsers = users.filter((user: { name: string; }) => user.name !== userName);
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    return;
  } catch (error) {
    console.error('Erreur lors de la suppression d\'un utilisateur : ', error);
    return;
  }
}

export const toggleUserStatus = async (userName: string) => {
  try {
    const users: User[] = await loadUsers();
    const userIndex: number = users.findIndex((user: User) => user.name === userName);

    if (userIndex !== -1) {
      users[userIndex].isActive = !users[userIndex].isActive;
      await AsyncStorage.setItem('users', JSON.stringify(users));
      return;
    } else {
      console.error('Utilisateur non trouvé.');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la modification du statut de l\'utilisateur : ', error);
    return;
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Erreur lors de la suppression des données : ', error);
  }
}

export const getActiveUsers = async (): Promise<User[]> => {
  try {
    const users = await loadUsers();
    return users.filter((user: User) => user.isActive);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs actifs : ', error);
    return [];
  }
}