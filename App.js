// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import PlayFastScreen from './src/screens/PlayFastScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

const App = () => {

  const loadFonts = async () => {
    try {
      await Font.useFonts({
        'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
      });
    }
    catch (error) {
      console.error('Erreur lors du chargement des polices : ', error);
    }
  }

  loadFonts();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PlayFast" component={PlayFastScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
