// components/organisms/LikeDislikeComponent.tsx

import { addIgnoredQuestion, getIgnoredQuestions } from "../../services/ignored_question"
import DislikeButton from "./DislikeButton"
import LikeButton from "./LikeButton"

const LikeDislikeComponent = ({ content }: { content: String }) => {

  const handleLikeClick = async () => {
    await addIgnoredQuestion(content)
    const ignored_questions = await getIgnoredQuestions()
    console.log(ignored_questions)
  }

  const handleDislikeClick = async () => {
    await addIgnoredQuestion(content)
  }

  return (
    <>
      <DislikeButton onPress={handleDislikeClick} />
      <LikeButton onPress={handleLikeClick} />
    </>
  )
}

export default LikeDislikeComponent