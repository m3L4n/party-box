// src/party/TimerQuestionComponent.tsx

import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { colors } from "../../assets/colors"
import Text from "../../components/atoms/CustomText"
import { Question } from "../../models/Question"
import { t } from "i18next"
import LikeDislikeComponent from "../../components/organisms/LikeDislikeComponent"
import MenuButton from "../../components/molecules/MenuButton"

interface TimerQuestionComponentProps {
  question: Question
}

const TimerQuestionComponent: React.FC<TimerQuestionComponentProps> = ({
  question,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(question.duration ?? 0)
  const [timerActive, setTimerActive] = useState<boolean>(false)

  const handleTimerPress = () => {
    setTimerActive(!timerActive)
    if (timeLeft <= 0) {
      setTimeLeft(question.duration ?? 0)
    }
  }

  useEffect(() => {
    setTimeLeft(question.duration ?? 0)
    setTimerActive(false)
  }, [question])

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimerActive(false)
      setTimeLeft(0)
      return
    }
    if (timerActive) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 0.1)
      }, 90)
      return () => clearTimeout(timerId)
    }
  }, [timeLeft, timerActive])

  return (
    <>
      <LikeDislikeComponent questionId={question.id} />
      <View style={styles.container}>
        <Text style={styles.title}>{t(question.mode)}</Text>
        <Text style={styles.text}>{question.content}</Text>
        <MenuButton
          color={timerActive ? colors.secondary.red : colors.primary.green}
          style={styles.button}
          text={timeLeft.toFixed(1)}
          onPress={() => {
            handleTimerPress()
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 50,
    fontFamily: "BebasNeue-Regular",
    letterSpacing: 5,
    color: "black",
  },
  text: {
    fontSize: 30,
    letterSpacing: 1.5,
    color: "black",
  },
  button: {
    position: "absolute",
    bottom: 50,
    width: 300,
    height: 80,
    zIndex: 99,
  },
})

export default TimerQuestionComponent
