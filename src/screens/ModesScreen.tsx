// src/screens/ModesScreen.tsx

import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../assets/colors";
import Text from "../../components/atoms/CustomText";
import MenuButton from "../../components/molecules/MenuButton";
import AnimatedBackground from "../../components/organisms/AnimatedBackground";
import BackButton from "../../components/organisms/BackButton";
import ModeCard from "../../components/organisms/ModeCard";
import ReloadButton from "../../components/organisms/ReloadButton";
import { Mode } from "../../models/Mode";
import { addMode, deleteAllModes, loadModes, toggleModeStatus } from "../../services/mode";
import { t } from "i18next";

interface ModesScreenProps {
  navigation: any;
}

export const initialModes = [
  { name: 'classic', isActive: false },
  { name: 'quiz', isActive: false },
  { name: 'duel', isActive: false }
];

const ModesScreen: React.FC<ModesScreenProps> = ({ navigation }) => {
  const [modes, setModes] = useState<Mode[]>([]);

  const prefillModes = async () => {
    for (const mode of initialModes) {
      await addMode(mode);
    }
    const loadedModes = await loadModes();
    setModes(loadedModes);
  }

  useEffect(() => {
    prefillModes();
  }, []);

  const handleModePress = async (modeName: string) => {
    const updatedModes = await toggleModeStatus(modeName);
    setModes(updatedModes);
  };

  const handleNextButtonPress = async () => {
    const activeModes = Object.values(modes).filter(mode => mode.isActive);
    if (activeModes.length === 0) {
      Alert.alert(t('alert_mode'));
      return;
    }
    console.log('ModesScreen, activeModes:', activeModes);
    navigation.navigate('Play');
  }

  const handleReloadPress = async () => {
    await deleteAllModes();
    setModes([]);
    await prefillModes();
  }

  return (
    <View style={[styles.container]}>
      <AnimatedBackground />
      <BackButton navigation={navigation} />
      <ReloadButton onPress={handleReloadPress} />
      <Text style={styles.title}>Modes</Text>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
        {Object.values(modes).map((mode, index) => (
          <ModeCard key={index} mode={mode} onPress={() => handleModePress(mode.name)} />
        ))}
      </ScrollView>
      <MenuButton color={colors.primary.green} text={t('next')} onPress={handleNextButtonPress} />
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
    marginTop: 30,
  },
});

export default ModesScreen;
