// src/screens/PlayCustomScreen.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import BackButton from '../../components/organisms/BackButton';
import { getActiveModes } from '../../services/mode';

const PlayCustomScreen = ({ navigation }) => {
  const [activeModes, setActiveModes] = React.useState([]);

  React.useEffect(() => {
    getActiveModes().then((modes) => {
      setActiveModes(modes);
    });
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <BackButton onPress={() => navigation.navigate('Home')} />
      <Text>Custom</Text>
      <Text>Active Modes:</Text>
      {activeModes.map((mode) => (
        <Text key={mode.id}>{mode.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.secondary.pink,
  },
});

export default PlayCustomScreen;
