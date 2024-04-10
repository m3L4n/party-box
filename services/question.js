// services/question.js

import dataClassic from '../assets/questions/classic.json';
// import dataClassic2 from '../assets/questions/classic_2.json';
// import dataClassic3 from '../assets/questions/classic_3.json';
import dataQuiz from '../assets/questions/quiz.json';
import Question from '../models/Question';

export const getQuestionsList = async (mode, userList) => {
  try {
    switch (mode.name) {
      case 'classic':
        return await getClassicQuestions(userList);
      case 'quiz':
        return await getQuizQuestions(userList);
      default:
        return [];
    }
  } catch (error) {
    console.error('Error while loading questions: ', error);
    return [];
  }
}

const getRandomUsers = (userList, n) => {
  n = Math.min(n, userList.length);
  const copy = [...userList];
  const ret = [];

  for (let i = 0; i < n; i++) {
    const randIdx = Math.floor(Math.random() * copy.length);
    ret.push(copy[randIdx]);
    copy.splice(randIdx, 1);
  }

  return ret;
}

const parseQuestion = (userList, question) => {
  const count = (question.match(/\$\{user\}/g) || []).length;
  let parsedQuestion = question;
  let selectedUsers = getRandomUsers(userList, count);
  for (let user of selectedUsers) {
    parsedQuestion = parsedQuestion.replace('${user}', user.name);
  }
  return parsedQuestion;
}

const getClassicQuestions = async (userList) => {
  try {
    let questionsData = [
      ...dataClassic.questions,
      // ...dataClassic2.questions,
      // ...dataClassic3.questions,
    ];

    questionsData.sort(() => Math.random() - 0.5);
    questionsData = questionsData.slice(0, 50);

    const questions = questionsData.map((questionData, index) => {
      const parsedContent = parseQuestion(userList, questionData.content);
      return new Question(index, parsedContent, "classic", questionData.options || []);
    });

    return questions;
  } catch (error) {
    console.error('Error while loading classic questions: ', error);
    return [];
  }
}

const getQuizQuestions = async (userList) => {
  try {
    let questionsData = [
      ...dataQuiz.questions
    ];

    questionsData.sort(() => Math.random() - 0.5);
    questionsData = questionsData.slice(0, 5);

    const questions = questionsData.map((questionData, index) => {
      const parsedContent = parseQuestion(userList, questionData.content);
      return new Question(index, parsedContent, "quiz", questionData.options || []);
    }
    );

    return questions;
  }
  catch (error) {
    console.error('Error while loading quiz questions: ', error);
    return [];
  }
}
