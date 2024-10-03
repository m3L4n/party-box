// src/screens/PlayScreen.tsx

import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { getActiveModes } from "../../services/mode"
import { getActiveUsers } from "../../services/user"
import { getRandomColorBackground } from "../../services/utils"
import PartyEndScreen from "../party/PartyEndScreen"
import QuestionComponent from "../party/QuestionComponent"
import { Question } from "../../models/Question"
import Background from "../../components/organisms/Background"
import LoadingScreen from "./LoadingScreen"
import { fetchQuestions } from "../../services/questions"

interface PlayScreenProps {
  navigation: any
  route: any
}

const PlayScreen: React.FC<PlayScreenProps> = ({ navigation, route }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId] = useState<string | null>(null)
  const [end, setEnd] = useState<boolean>(false)
  const [backgroundColor, setBackgroundColor] = useState<string>(
    route.params?.backgroundColor || getRandomColorBackground()
  )

  const loadQuestions = useCallback(async () => {
    const modes = await getActiveModes()
    const users = await getActiveUsers()

    if (modes.length > 0 && users.length > 0) {
      const questionsList = await fetchQuestions(
        modes.map(mode => mode.name),
        users.map(user => user.name),
        sessionId
      )
      setQuestions(questionsList)
    }
  }, [sessionId])

  useEffect(() => {
    loadQuestions()
  }, [loadQuestions])

  const handlePress = () => {
    if (questions.length === 0) return

    if (end) {
      navigation.navigate("Home")
      return
    }

    if (questions.length === 1) {
      setEnd(true)
    } else {
      setQuestions(prevQuestions => prevQuestions.slice(1))
      setBackgroundColor(getRandomColorBackground())
    }
  }

  return (
    <Background backgroundColor={backgroundColor}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.container, { backgroundColor: "transparent" }]}
      >
        {questions.length === 0 ? (
          <LoadingScreen />
        ) : end ? (
          <PartyEndScreen />
        ) : (
          <QuestionComponent question={questions[0]} />
        )}
      </TouchableOpacity>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default PlayScreen
