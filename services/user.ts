// services/user.tsx

import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "../models/User"

export const loadUsers = async (): Promise<User[]> => {
  try {
    const users = await AsyncStorage.getItem("users")
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error("Error while loading users: ", error)
    return []
  }
}

export const addUser = async (user: User) => {
  try {
    const users = await loadUsers()
    user.isActive = true
    users.push(user)
    await AsyncStorage.setItem("users", JSON.stringify(users))
    return
  } catch (error) {
    console.error("Error while adding user: ", error)
    return
  }
}

export const deleteUser = async (userName: string): Promise<User[]> => {
  try {
    const users = await loadUsers()
    const updatedUsers = users.filter(
      (user: { name: string }) => user.name !== userName
    )
    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers))
    return updatedUsers
  } catch (error) {
    console.error("Error while deleting user: ", error)
    return []
  }
}

export const toggleUserStatus = async (userName: string): Promise<User[]> => {
  try {
    const users: User[] = await loadUsers()
    const userIndex: number = users.findIndex(
      (user: User) => user.name === userName
    )

    if (userIndex !== -1) {
      users[userIndex].isActive = !users[userIndex].isActive
      await AsyncStorage.setItem("users", JSON.stringify(users))
      return users
    } else {
      console.error("User not found.")
      return []
    }
  } catch (error) {
    console.error("Error while changing user status: ", error)
    return []
  }
}

export const clearData = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.error("Error while clearing data:", error)
  }
}

export const getActiveUsers = async (): Promise<User[]> => {
  try {
    const users = await loadUsers()
    return users.filter((user: User) => user.isActive)
  } catch (error) {
    console.error("Error while fetching users: ", error)
    return []
  }
}

export const checkUserExistence = async (
  userName: string
): Promise<boolean> => {
  try {
    const users = await loadUsers()
    return users.some((user: User) => user.name === userName)
  } catch (error) {
    console.error("Error while checking user existence: ", error)
    return false
  }
}
