// components/organisms/LikeDislikeComponent.tsx

import { Question } from "../../models/Question"
import { addIgnoredQuestion, getIgnoredQuestions } from "../../services/ignored_question"
import DislikeButton from "./DislikeButton"
import LikeButton from "./LikeButton"

const LikeDislikeComponent = (question: Question) => {

  const handleLikeClick = async () => {
    await addIgnoredQuestion(question)
    const ignored_questions = await getIgnoredQuestions()
    console.log(ignored_questions)
  }

  const handleDislikeClick = async () => {
    await addIgnoredQuestion(question)
  }

  return (
    <>
      <DislikeButton onPress={handleDislikeClick} />
      <LikeButton onPress={handleLikeClick} />
    </>
  )
}

export default LikeDislikeComponent