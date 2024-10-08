// src/screens/ModesScreen.tsx

import { useEffect, useState, useCallback } from "react"
import { StyleSheet, Alert } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Text from "../../components/atoms/CustomText"
import BackButton from "../../components/organisms/BackButton"
import ModeCard from "../../components/organisms/ModeCard"
import ReloadButton from "../../components/organisms/ReloadButton"
import { Mode } from "../../models/Mode"
import {
  addAllModes,
  deleteAllModes,
  loadModes,
  toggleModeStatus,
} from "../../services/mode"
import { t } from "i18next"
import { BACKEND_URL } from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NextPlayButton from "../../components/organisms/NextPlayButton"
import Background from "../../components/organisms/Background"

interface ModesScreenProps {
  navigation: any
  route: any
}

const ModesScreen: React.FC<ModesScreenProps> = ({ navigation, route }) => {
  const [modes, setModes] = useState<Mode[]>([])
  const backgroundColor = route.params?.backgroundColor || "white"

  const fetchModesFromBackend = async () => {
    try {
      const lang = (await AsyncStorage.getItem("lang")) || "fr"
      const response = await fetch(`${BACKEND_URL}/modes/${lang}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("response", response)
      const fetchedModes = await response.json()
      const newModes = fetchedModes.map((mode: string) => ({
        name: mode,
        isActive: false,
      }))
      await addAllModes(newModes)
      const updatedModes = await loadModes()
      setModes(updatedModes)
    } catch (error) {
      console.error("Error fetching modes from backend:", error)
    }
  }

  const prefillModes = useCallback(async () => {
    const storedModes = await loadModes()

    if (storedModes.length > 0) {
      setModes(storedModes)
    } else {
      await fetchModesFromBackend()
    }
  }, [])

  useEffect(() => {
    prefillModes()
  }, [prefillModes])

  const handleModePress = async (modeName: string) => {
    const updatedModes = await toggleModeStatus(modeName)
    setModes(updatedModes)
  }

  const handleNextButtonPress = async () => {
    const activeModes = Object.values(modes).filter(mode => mode.isActive)
    if (activeModes.length === 0) {
      Alert.alert(t("alert_mode"))
      return
    }
    navigation.navigate("Play")
  }

  const handleReloadPress = async () => {
    await deleteAllModes()
    setModes([])
    await prefillModes()
  }

  return (
    <Background style={[styles.container]} backgroundColor={backgroundColor}>
      <BackButton navigation={navigation} />
      <ReloadButton onPress={handleReloadPress} />
      <Text style={styles.title}>Modes</Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 10,
        }}
        style={{ width: "100%" }}
      >
        {Object.values(modes).map((mode, index) => (
          <ModeCard
            key={index}
            mode={mode}
            onPress={() => handleModePress(mode.name)}
          />
        ))}
      </ScrollView>
      <Text style={styles.info_text}>
        {Object.values(modes).filter(user => user.isActive).length +
          " " +
          t("selected_modes")}
      </Text>
      {Object.values(modes).filter(mode => mode.isActive).length ===
      0 ? null : (
        <NextPlayButton onPress={handleNextButtonPress} />
      )}
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 50,
    letterSpacing: 5,
    color: "black",
    marginBottom: 50,
    marginTop: 30,
  },
  info_text: {
    paddingTop: 10,
    fontSize: 30,
    fontFamily: "BebasNeue-Regular",
    color: "black",
  },
})

export default ModesScreen
