// services/mode.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mode } from '../models/Mode';

export const loadModes = async (): Promise<Mode[]> => {
  try {
    const modesString = await AsyncStorage.getItem('modes');
    return modesString ? JSON.parse(modesString) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des modes : ', error);
    return [];
  }
};

export const addMode = async (mode: Mode): Promise<Mode[]> => {
  try {
    const modes = await loadModes();
    mode.isActive = false;
    if (modes.some(m => m.name === mode.name)) {
      return modes;
    }
    modes.push(mode);
    await AsyncStorage.setItem('modes', JSON.stringify(modes));
    return modes;
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un mode : ', error);
    return [];
  }
};

export const toggleModeStatus = async (modeName: string): Promise<Mode[]> => {
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

export const deleteAllModes = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('modes');
  } catch (error) {
    console.error('Erreur lors de la suppression des modes : ', error);
  }
}

export const getActiveModes = async (): Promise<Mode[]> => {
  try {
    const modes = await loadModes();
    return modes.filter(mode => mode.isActive);
  } catch (error) {
    console.error('Erreur lors de la récupération des modes actifs : ', error);
    return [];
  }
}