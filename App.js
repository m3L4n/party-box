// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import CreateUserScreen from './src/screens/CreateUserScreen';
import HomeScreen from './src/screens/HomeScreen';
import ModesScreenCustom from './src/screens/ModesScreenCustom';
import PartyEndScreen from './src/screens/PartyEndScreen';
import PlayCustomScreen from './src/screens/PlayCustomScreen';
import PlayFastScreen from './src/screens/PlayFastScreen';
import UsersScreenCustom from './src/screens/UsersScreenCustom';

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
        console.error('Erreur lors du chargement des polices : ', error);
      }
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PlayFast" component={PlayFastScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PlayCustom" component={PlayCustomScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UsersCustom" component={UsersScreenCustom} options={{ headerShown: false }} />
        <Stack.Screen name="ModesCustom" component={ModesScreenCustom} options={{ headerShown: false }} />
        <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PartyEnd" component={PartyEndScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
