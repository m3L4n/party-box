// src/screens/UsersScreen.tsx

import React, { useCallback, useEffect, useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { colors } from "../../assets/colors"
import Text from "../../components/atoms/CustomText"
import MenuButton from "../../components/molecules/MenuButton"
import AddButton from "../../components/organisms/AddButton"
import BackButton from "../../components/organisms/BackButton"
import TrashButton from "../../components/organisms/TrashButton"
import UserCard from "../../components/organisms/UserCard"
import {
  deleteUser,
  getActiveUsers,
  loadUsers,
  toggleUserStatus,
} from "../../services/user"
import { User } from "../../models/User"
import { t } from "i18next"

interface UsersScreenProps {
  navigation: any
}

const UsersScreen: React.FC<UsersScreenProps> = ({ navigation }) => {
  const [userList, setUserList] = useState<User[]>([])
  const [deleteMode, setDeleteMode] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    const users: User[] = await loadUsers()
    setUserList(users)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData()
    })

    return unsubscribe
  }, [navigation, fetchData])

  const handleUserPress = async (userName: string) => {
    if (deleteMode) {
      const updatedUsers = await deleteUser(userName)
      setUserList(updatedUsers)
    } else {
      const updatedUsers = await toggleUserStatus(userName)
      setUserList(updatedUsers)
    }
  }

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode)
  }

  const handleNextButtonPress = async () => {
    const list: User[] = await getActiveUsers()
    if (list.length <= 1) {
      Alert.alert(t("alert_players"))
      return
    }
    navigation.navigate("Modes")
  }

  return (
    <View style={{ ...styles.container }}>
      <BackButton navigation={navigation} />
      {userList.length !== 0 ? (
        <TrashButton onPress={toggleDeleteMode} />
      ) : null}
      <Text style={{ ...styles.title }}>{t("users")}</Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 10,
        }}
        style={{ width: "100%" }}
      >
        {userList.map((user, index) => (
          <View key={index} style={{ position: "relative" }}>
            {deleteMode ? (
              <TrashButton
                accessibilityLabel={user.name}
                onPress={() => handleUserPress(user.name)}
                style={styles.trashButton}
              />
            ) : null}
            <UserCard
              key={index}
              onPress={() => handleUserPress(user.name)}
              user={user}
            />
          </View>
        ))}
        <AddButton
          onPress={() => navigation.navigate("CreateUser")}
          style={{ ...styles.addButton }}
        />
      </ScrollView>
      <Text style={styles.info_text}>
        {userList.filter(user => user.isActive).length +
          " " +
          t("selected_players")}
      </Text>
      {userList.filter(user => user.isActive).length > 1 ? (
        <MenuButton
          color={colors.primary.green}
          onPress={handleNextButtonPress}
          text={t("next")}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  trashButton: {
    position: "absolute",
    bottom: -10,
    left: 15,
    zIndex: 99,
  },
  container: {
    paddingTop: 100,
    paddingBottom: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    letterSpacing: 5,
    color: "black",
    marginBottom: 30,
    marginTop: 30,
  },
  addButton: {
    marginHorizontal: 16.1,
    marginVertical: 40,
  },
  info_text: {
    fontSize: 30,
    fontFamily: "BebasNeue-Regular",
    color: "black",
  },
})

export default UsersScreen
