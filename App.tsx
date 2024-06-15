// App.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import PartyEndScreen from './src/party/PartyEndScreen';
import CreateUserScreen from './src/screens/CreateUserScreen';
import HomeScreen from './src/screens/HomeScreen';
import ModesScreen from './src/screens/ModesScreen';
import PlayScreen from './src/screens/PlayScreen';
import UsersScreen from './src/screens/UsersScreen';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import AnimatedBackground from './components/organisms/Background';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error while loading fonts: ', error);
      }
    };

    const getStoredLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('lang');
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
      }
    };

    getStoredLanguage();
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <I18nextProvider i18n={i18n}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        style="light"
      />
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Play" component={PlayScreen} />
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="Modes" component={ModesScreen} />
            <Stack.Screen name="CreateUser" component={CreateUserScreen} />
            <Stack.Screen name="PartyEnd" component={PartyEndScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </I18nextProvider >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;
