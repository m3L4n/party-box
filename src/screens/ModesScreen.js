// src/screens/ModesScreen.js

import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../assets/colors";
import modesData from "../../assets/modes.json";
import Text from "../../components/atoms/CustomText";
import MenuButton from "../../components/molecules/MenuButton";
import BackButton from "../../components/organisms/BackButton";
import ModeCard from "../../components/organisms/ModeCard";
import ReloadButton from "../../components/organisms/ReloadButton";
import Mode from "../../models/Mode";
import { addMode, deleteAllModes, getActiveModes, loadModes, toggleModeStatus } from "../../services/mode";
import { getRandomColorBackground } from "../../services/utils";

const ModesScreen = ({ navigation }) => {
  const [modeList, setModeList] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState(getRandomColorBackground());

  const fetchData = useCallback(async () => {
    const modes = await loadModes();
    setModeList(modes);
  }, []);

  const handleModePress = async (modeName) => {
    const updatedModes = await toggleModeStatus(modeName);
    setModeList(updatedModes);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setBackgroundColor(getRandomColorBackground());
    });
    return unsubscribe;
  }, [navigation]);

  const prefillModes = async () => {
    const existingModes = await loadModes();
    if (existingModes.length <= 0) {
      for (const modeData of modesData.modes) {
        const newMode = new Mode(modeData.name);
        await addMode(newMode);
      }
    }
    fetchData();
  }

  const handleNextButtonPress = async () => {
    const list = await getActiveModes();
    if (list.length === 0) {
      alert('Veuillez sélectionner au moins un mode');
      return;
    }
    navigation.navigate('Play');
  }

  const handleReloadPress = async () => {
    deleteAllModes();
    await prefillModes();
  }

  useEffect(() => {
    prefillModes();
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <BackButton navigation={navigation} />
      <ReloadButton onPress={handleReloadPress} />
      <Text style={{ ...styles.title }}>Modes</Text>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
        {modeList.map((mode, index) => (
          <ModeCard key={index} mode={mode} onPress={handleModePress} />
        ))}
      </ScrollView>
      <MenuButton color={colors.primary.red} text="Suivant" onPress={handleNextButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingBottom: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    letterSpacing: 5,
    color: 'black',
    marginBottom: 30,
  },
});

export default ModesScreen;
