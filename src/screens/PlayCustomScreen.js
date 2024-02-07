// src/screens/PlayCustomScreen.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/colors';
import Text from '../../components/atoms/CustomText';
import BackButton from '../../components/organisms/BackButton';
import { getActiveModes } from '../../services/mode';
import { getActiveUsers } from '../../services/user';

const PlayCustomScreen = ({ navigation }) => {
  const [modeList, setModeList] = React.useState([])
  const [userList, setUserList] = React.useState([]);

  const fetchData = React.useCallback(async () => {
    const users = await getActiveUsers();
    const modes = await getActiveModes();
    setUserList(users);
    setModeList(modes);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <BackButton onPress={() => navigation.navigate('Home')} />
      <Text>Custom</Text>
      <Text>Active Modes:</Text>
      {modeList.map((mode) => (
        <Text key={mode.id}>{mode.name}</Text>
      ))}

      <Text>Active Users:</Text>
      {userList.map((user) => (
        <Text key={user.id}>{user.name}</Text>
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
