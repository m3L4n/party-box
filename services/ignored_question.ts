// services/ignored_question.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Question } from "../models/Question";

export const loadIgnoredQuestions = async (): Promise<Question[]> => {
  try {
    const questions = await AsyncStorage.getItem('users');
    return questions ? JSON.parse(questions) : [];
  } catch (error) {
    console.error('Error while loading ignored_questions: ', error);
    return [];
  }
};

export const addIgnoredQuestion = async (question: Question) => {
  try {
    const ignored_questions = await loadIgnoredQuestions();
    ignored_questions.push(question)
    await AsyncStorage.setItem('ignored_questions', JSON.stringify(ignored_questions))
    return;
  } catch (error) {
    console.error('Error while add ignored question', error)
    return;
  }
}

export const resetIgnoredQuestions = async () => {
  try {
    await AsyncStorage.removeItem('ignored_questions')
  } catch (error) {
    console.error('Error while delete ignored_questions')
  }
}