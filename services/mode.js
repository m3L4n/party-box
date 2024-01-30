// services/mode.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadModes = async () => {
  try {
    const modes = await AsyncStorage.getItem('modes');
    return modes ? JSON.parse(modes) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des modes : ', error);
    return [];
  }
};

export const addMode = async (mode) => {
  try {
    const modes = await loadModes();
    mode.isActive = true;
    modes.push(mode);
    await AsyncStorage.setItem('modes', JSON.stringify(modes));
    return modes;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un mode : ', error);
    return [];
  }
};

export const toggleModeStatus = async (modeName) => {
  try {
    const modes = await loadModes();
    const modeIndex = modes.findIndex(mode => mode.name === modeName);

    if (modeIndex !== -1) {
      modes[modeIndex].isActive = !modes[modeIndex].isActive;
      await AsyncStorage.setItem('modes', JSON.stringify(modes));
      return modes;
    } else {
      console.error('Mode non trouvé.');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la modification du statut du mode : ', error);
    return [];
  }
}

export const deleteAllModes = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Erreur lors de la suppression des modes : ', error);
  }
}
