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
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Play" component={PlayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Users" component={UsersScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Modes" component={ModesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PartyEnd" component={PartyEndScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
