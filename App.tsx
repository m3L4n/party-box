// App.tsx

import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as Font from "expo-font"
import React, { useEffect, useState } from "react"
import PartyEndScreen from "./src/party/PartyEndScreen"
import CreateUserScreen from "./src/screens/CreateUserScreen"
import HomeScreen from "./src/screens/HomeScreen"
import ModesScreen from "./src/screens/ModesScreen"
import PlayScreen from "./src/screens/PlayScreen"
import UsersScreen from "./src/screens/UsersScreen"
import { StyleSheet, View } from "react-native"
import { I18nextProvider } from "react-i18next"
import i18n from "./i18n"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from "expo-status-bar"
import { getRandomColorBackground } from "./services/utils"

const App = () => {
  const Stack = createStackNavigator()
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(
    getRandomColorBackground()
  )

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "BebasNeue-Regular": require("./assets/fonts/BebasNeue-Regular.ttf"),
        })
        setFontsLoaded(true)
      } catch (error) {
        console.error("Error while loading fonts: ", error)
      }
    }

    const getStoredLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem("lang")
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage)
      }
    }

    getStoredLanguage()
    loadFonts()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  const handleNavigationStateChange = () => {
    setBackgroundColor(getRandomColorBackground())
  }

  return (
    <NavigationContainer
      onStateChange={handleNavigationStateChange}
      theme={navTheme}
    >
      <I18nextProvider i18n={i18n}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="transparent"
            style="light"
            translucent={true}
          />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              component={HomeScreen}
              name="Home"
              initialParams={{ backgroundColor: backgroundColor }}
            />
            <Stack.Screen
              component={PlayScreen}
              name="Play"
              initialParams={{ backgroundColor: getRandomColorBackground() }}
            />
            <Stack.Screen
              component={UsersScreen}
              name="Users"
              initialParams={{ backgroundColor: getRandomColorBackground() }}
            />
            <Stack.Screen
              component={ModesScreen}
              name="Modes"
              initialParams={{ backgroundColor: getRandomColorBackground() }}
            />
            <Stack.Screen
              component={CreateUserScreen}
              name="CreateUser"
              initialParams={{ backgroundColor: getRandomColorBackground() }}
            />
            <Stack.Screen
              component={PartyEndScreen}
              name="PartyEnd"
              initialParams={{ backgroundColor: getRandomColorBackground() }}
            />
          </Stack.Navigator>
        </View>
      </I18nextProvider>
    </NavigationContainer>
  )
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
