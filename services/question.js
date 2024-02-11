// services/question.js

export const getQuestionsList = async (mode) => {
  try {
    switch (mode.name) {
      case 'general':
        return await getCultureQuestions();
      case 'history':
        return await getDuelQuestions();
      case 'duel':
        return await getEntertainmentQuestions();
      default:
        return [];
    }
  } catch (error) {
    console.error('Erreur lors du chargement des questions : ', error);
    return [];
  }
}

const getCultureQuestions = async () => {
  try {
    const questionsList = require('../assets/modes/culture_generale.json');
    return questionsList;
  } catch (error) {
    console.error('Erreur lors du chargement des questions de culture générale : ', error);
    return [];
  }
}

const makeSimpleQuestion = (text) => {
}

const getDuelQuestions = async () => {
  return {
    questions: [
      {
        id: 1,
        content: 'What is the capital of France?',
      },
      {
        id: 2,
        content: 'What is the capital of Spain?',
      },
      {
        id: 3,
        content: 'What is the capital of Italy?',
      },
      {
        id: 4,
        content: 'What is the capital of Germany?',
      },
      {
        id: 5,
        content: 'What is the capital of Portugal?',
      },
    ],
  };
}

const getEntertainmentQuestions = async () => {
  return {
    questions: [
      {
        id: 1,
        content: 'Who won the last Oscar for Best Movie?',
      },
      {
        id: 2,
        content: 'Who won the last Oscar for Best Actor?',
      },
      {
        id: 3,
        content: 'Who won the last Oscar for Best Actress?',
      },
      {
        id: 4,
        content: 'Who won the last Oscar for Best Director?',
      },
      {
        id: 5,
        content: 'Who won the last Oscar for Best Original Screenplay?',
      },
    ],
  };
}