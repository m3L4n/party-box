// src/screens/ModesScreen.js

import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../assets/colors";
import Modes from "../../assets/modes.json";
import Text from "../../components/atoms/CustomText";
import BackButton from "../../components/organisms/BackButton";
import ModeCard from "../../components/organisms/ModeCard";

const ModesScreen = ({ navigation }) => {
  const [modeList, setModeList] = React.useState([]);

  React.useEffect(() => {
    setModeList(Modes.modes);
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <Text style={{ ...styles.title }}>Modes</Text>
      <BackButton onPress={() => navigation.navigate("Home")} />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', gap: 10 }}>
        {modeList.map((mode) => (
          <ModeCard mode={mode} />
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