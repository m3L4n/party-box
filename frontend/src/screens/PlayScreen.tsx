// src/screens/PlayScreen.tsx

import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import Text from "../../components/atoms/CustomText"
import BackButton from "../../components/organisms/BackButton"
import HomeButton from "../../components/organisms/HomeButton"
import { getActiveModes } from "../../services/mode"
import { getActiveUsers } from "../../services/user"
import { getRandomColorBackground } from "../../services/utils"
import PartyEndScreen from "../party/PartyEndScreen"
import QuestionComponent from "../party/QuestionComponent"
import { Mode } from "../../models/Mode"
import { User } from "../../models/User"
import { Question } from "../../models/Question"
import Background from "../../components/organisms/Background"
import { BACKEND_URL } from "@env"

interface PlayScreenProps {
  navigation: any
}

const PlayScreen: React.FC<PlayScreenProps> = ({ navigation }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [end, setEnd] = useState<boolean>(false)
  const [backgroundColor, setBackgroundColor] = useState<string>(
    getRandomColorBackground()
  )

  const fetchQuestions = useCallback(
    async (modes: Mode[], users: User[]) => {
      try {
        let questionsList: Question[] = []
        const response = await fetch(`${BACKEND_URL}/questions/fetch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            users: users.map((user: User) => user.name),
            modes: modes.map((mode: Mode) => mode.name),
            language: "fr",
            session_id: sessionId,
          }),
        })
        const data = await response.json()
        console.log("Data: ", data)
        if (!sessionId && data.session_id) {
          setSessionId(data.session_id)
        }

        questionsList = data.questions.map((question: any) => {
          return {
            id: question.id,
            content: question.content,
            mode: question.mode,
            user: question.user,
            answer: question?.answer,
          }
        })
        return questionsList
      } catch (error) {
        console.error("Error while fetching questions: ", error)
        return []
      }
    },
    [sessionId]
  )

  const fetchData = useCallback(async () => {
    try {
      const fetchedUsers = await getActiveUsers()
      const fetchedModes = await getActiveModes()

      if (fetchedModes.length > 0 && fetchedUsers.length > 0) {
        const questionsList = await fetchQuestions(fetchedModes, fetchedUsers)
        setQuestions(questionsList)
      }
    } catch (error) {
      console.error("Error while fetching data: ", error)
    }
  }, [fetchQuestions])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handlePress = () => {
    if (questions.length === 0) return

    if (end) {
      navigation.navigate("Home")
      return
    }

    if (questions.length === 1) {
      setEnd(true)
      return
    }

    const nextQuestion = questions[1]
    setQuestions(prevQuestions => [nextQuestion, ...prevQuestions.slice(2)])
    setBackgroundColor(getRandomColorBackground())
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Background
        backgroundColor={backgroundColor}
        backgroundImage={require("../../assets/images/image.png")}
      >
        {questions.length === 0 ? (
          <>
            <BackButton navigation={navigation} />
            <Text>Loading...</Text>
          </>
        ) : null}
        {end ? <PartyEndScreen /> : null}
        {!end && questions[0] ? (
          <>
            <HomeButton navigation={navigation} />
            <QuestionComponent question={questions[0]} />
          </>
        ) : null}
      </Background>
    </TouchableOpacity>
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
