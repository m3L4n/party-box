import React, { useState } from "react"
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native"
import { colors } from "../../assets/colors"
import Input from "../../components/atoms/Input"
import AddButton from "../../components/organisms/AddButton"
import BackButton from "../../components/organisms/BackButton"
import ChooseColorComponent from "../../components/organisms/ChooseColorComponent"
import { EmptyUserCard } from "../../components/organisms/DefaultCards"
import { User } from "../../models/User"
import { addUser, checkUserExistence } from "../../services/user"
import { getRandomColor } from "../../services/utils"
import { t } from "i18next"
import Background from "../../components/organisms/Background"

interface CreateUserScreenProps {
  navigation: any
  route: any
}

const CreateUserScreen: React.FC<CreateUserScreenProps> = ({
  navigation,
  route,
}) => {
  const [name, setName] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>(getRandomColor())
  const backgroundColor = route.params?.backgroundColor || "white"

  const handleNameChange = (text: string): void => {
    let regex = /^[a-zA-Z0-9\s]*$/
    if (!regex.test(text)) {
      return
    }
    if (text.length > 12) {
      return
    }
    setName(text)
  }

  const handleColorChange = (color: string): void => {
    setSelectedColor(color)
  }

  const handleAddUser = async (): Promise<void> => {
    if (name.length <= 0) {
      Alert.alert(t("alert_name"))
      return
    }
    const newUser: User = {
      name: name,
      color: selectedColor,
      isActive: true,
    }
    setName("")
    setSelectedColor(colors.primary.creme)
    const exists = await checkUserExistence(newUser.name)
    if (!exists) {
      await addUser(newUser)
    } else {
      Alert.alert(t("alert_user_exist"))
      return
    }
    navigation.navigate("Users")
  }

  return (
    <Background style={[styles.container]} backgroundColor={backgroundColor}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.container}
      >
        <BackButton navigation={navigation} />
        <EmptyUserCard
          user={{ name: name, color: selectedColor, isActive: false }}
        />
        <ChooseColorComponent
          active={selectedColor}
          onPress={handleColorChange}
        />
        <View style={styles.group}>
          <Input
            onChangeText={handleNameChange}
            placeholder={t("name")}
            value={name}
          />
          <AddButton content="Add" onPress={handleAddUser} />
        </View>
      </KeyboardAvoidingView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    gap: 10,
  },
})

export default CreateUserScreen
