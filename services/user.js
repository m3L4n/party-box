// services/user.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadUsers = async () => {
  try {
    const users = await AsyncStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs : ', error);
    return [];
  }
};

export const addUser = async (user) => {
  try {
    const users = await loadUsers();
    user.isActive = true;
    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    return users;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un utilisateur : ', error);
    return [];
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Erreur lors de la suppression des données : ', error);
  }
}