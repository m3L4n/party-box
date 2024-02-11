// src/screens/ModesScreen.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../assets/colors";
import modesData from "../../assets/modes.json";
import Text from "../../components/atoms/CustomText";
import BackButton from "../../components/organisms/BackButton";
import ModeCard from "../../components/organisms/ModeCard";
import ReloadButton from "../../components/organisms/ReloadButton";
import Mode from "../../models/Mode";
import { addMode, deleteAllModes, loadModes, toggleModeStatus } from "../../services/mode";

const ModesScreen = ({ navigation }) => {
  const [modeList, setModeList] = React.useState([]);

  const fetchData = React.useCallback(async () => {
    const modes = await loadModes();
    setModeList(modes);
  }, []);

  const handleModePress = async (modeName) => {
    const updatedModes = await toggleModeStatus(modeName);
    setModeList(updatedModes);
  };

  const prefillModes = async () => {
    const existingModes = await loadModes();
    if (existingModes.length <= 0) {
      for (const modeData of modesData.modes) {
        const newMode = new Mode(...modeData);
        await addMode(newMode);
      }
    }
    fetchData();
  }

  const handleReloadPress = async () => {
    deleteAllModes();
    await prefillModes();
  }

  React.useEffect(() => {
    prefillModes();
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.title }}>Modes</Text>
      <BackButton navigation={navigation} />
      <ReloadButton onPress={handleReloadPress} />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
        {modeList.map((mode, index) => (
          <ModeCard key={index} mode={mode} onPress={handleModePress} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary.pink,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 60,
  },
});

export default ModesScreen;
