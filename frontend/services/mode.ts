// services/mode.tsx

import AsyncStorage from "@react-native-async-storage/async-storage"
import { Mode } from "../models/Mode"

export const loadModes = async (): Promise<Mode[]> => {
  try {
    const modesString = await AsyncStorage.getItem("modes")
    return modesString ? JSON.parse(modesString) : []
  } catch (error) {
    console.error("Error while loading modes from AsyncStorage : ", error)
    return []
  }
}

export const addMode = async (mode: Mode): Promise<Mode[]> => {
  try {
    const modes = await loadModes()
    mode.isActive = false
    if (modes.some(m => m.name === mode.name)) {
      return modes
    }
    modes.push(mode)
    await AsyncStorage.setItem("modes", JSON.stringify(modes))
    return modes
  } catch (error) {
    console.error("Error while adding a mode : ", error)
    return []
  }
}

export const addAllModes = async (newModes: Mode[]): Promise<Mode[]> => {
  try {
    const existingModes = await loadModes()
    const modesToAdd = newModes.filter(
      newMode => !existingModes.some(m => m.name === newMode.name)
    )
    const updatedModes = [...existingModes, ...modesToAdd]
    await AsyncStorage.setItem("modes", JSON.stringify(updatedModes))
    return updatedModes
  } catch (error) {
    console.error("Error while adding modes: ", error)
    return []
  }
}

export const toggleModeStatus = async (modeName: string): Promise<Mode[]> => {
  try {
    const modes = await loadModes()
    const modeIndex = modes.findIndex(mode => mode.name === modeName)

    if (modeIndex !== -1) {
      modes[modeIndex].isActive = !modes[modeIndex].isActive
      await AsyncStorage.setItem("modes", JSON.stringify(modes))
      return modes
    } else {
      console.error("Mode not found.")
      return []
    }
  } catch (error) {
    console.error("Error while editing mode's status : ", error)
    return []
  }
}

export const deleteAllModes = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("modes")
  } catch (error) {
    console.error("Error while deleting modes : ", error)
  }
}

export const getActiveModes = async (): Promise<Mode[]> => {
  try {
    const modes = await loadModes()
    return modes.filter(mode => mode.isActive)
  } catch (error) {
    console.error("Error while fetching active modes : ", error)
    return []
  }
}
