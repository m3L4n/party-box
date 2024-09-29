// src/party/DefaultQuestionComponent.tsx

import React from "react"
import { StyleSheet, View } from "react-native"
import Text from "../../components/atoms/CustomText"
import { t } from "i18next"
import { Question } from "../../models/Question"
import LikeDislikeComponent from "../../components/organisms/LikeDislikeComponent"

interface DefaultQuestionComponentProps {
  question: Question
}

const DefaultQuestionComponent: React.FC<DefaultQuestionComponentProps> = ({
  question,
}) => {
  return (
    <View style={styles.container}>
      <LikeDislikeComponent questionId={question.id} />
      <Text style={styles.title}>{t(question.mode)}</Text>
      <Text style={styles.text}>{question.content}</Text>
    </View>
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
})

export default DefaultQuestionComponent
