// src/party/QuestionComponent.tsx

import React, { useEffect, useState } from "react"
import { Question } from "../../models/Question"
import QuizQuestionComponent from "./QuizQuestionComponent"
import DefaultQuestionComponent from "./DefaultQuestionComponent"
import TimerQuestionComponent from "./TimerQuestionComponent"

const QuestionComponent = ({ question }: { question: Question }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  useEffect(() => {
    setShowAnswer(false)
  }, [question])

  switch (question.type) {
    case "quiz":
      return (
        <QuizQuestionComponent
          question={question}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
        />
      )
    case "timer":
      return <TimerQuestionComponent question={question} />
    default:
      return <DefaultQuestionComponent question={question} />
  }
}

export default QuestionComponent
