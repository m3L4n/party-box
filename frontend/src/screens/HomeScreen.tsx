// src/screens/HomeScreen.tsx

import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { colors } from "../../assets/colors"
import Text from "../../components/atoms/CustomText"
import MenuButton from "../../components/molecules/MenuButton"
import ModalComponent from "../../components/organisms/ModalComponent"
import SettingsButton from "../../components/organisms/SettingsButton"
import { getActiveModes } from "../../services/mode"
import { getActiveUsers } from "../../services/user"
import { t } from "i18next"
import Background from "../../components/organisms/Background"

interface HomeScreenProps {
  navigation: any
  route: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const backgroundColor = route.params?.backgroundColor || "white"
  const [modalVisible, setModalVisible] = useState(false)

  const handleClick = async () => {
    if ((await getActiveUsers()).length < 2) {
      navigation.navigate("Users")
    } else if ((await getActiveModes()).length < 1) {
      navigation.navigate("Modes")
    } else {
      navigation.navigate("Play")
    }
  }

  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)
  return (
    <Background style={[styles.container]} backgroundColor={backgroundColor}>
      <SettingsButton onPress={openModal} />
      <Text style={styles.title}>Party Box</Text>
      <MenuButton
        accessibilityLabel="quick_play"
        color={colors.primary.green}
        onPress={() => handleClick()}
        text={t("quick_play")}
      />
      <MenuButton
        accessibilityLabel="custom_game"
        color={colors.primary.blue}
        onPress={() => navigation.navigate("Users")}
        text={t("custom_game")}
      />
      <ModalComponent closeModal={closeModal} visible={modalVisible} />
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 64,
    marginBottom: 50,
    fontFamily: "BebasNeue-Regular",
    letterSpacing: 3,
    color: "rgba(0,0,0,0.8)",
  },
})

export default HomeScreen
