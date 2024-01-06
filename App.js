import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import PlayFastScreen from './src/screens/PlayFastScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayFast" component={PlayFastScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
