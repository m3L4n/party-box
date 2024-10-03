import { BACKEND_URL } from "@env"
import { Question } from "../models/Question"

export const fetchQuestions = async (
  modes: string[],
  users: string[],
  sessionId: string | null
): Promise<Question[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/questions/fetch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: users,
        modes: modes,
        language: "fr",
        session_id: sessionId,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText)
    }

    const data = await response.json()

    return data.questions.map((question: any) => ({
      id: question.id,
      content: question.content,
      mode: question.mode,
      type: question.type,
      user: question.user,
      answer: question.answer,
    }))
  } catch (error) {
    console.error("Error while fetching questions: ", error)
    return []
  }
}
