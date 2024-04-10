// services/question.js

import dataClassic from '../assets/questions/classic.json';
import dataDuel from '../assets/questions/duel.json';
import dataQuiz from '../assets/questions/quiz.json';
import Question from '../models/Question';

export const getQuestionsList = async (mode, userList) => {
  try {
    switch (mode.name) {
      case 'classic':
        return await getQuestions(userList, [...dataClassic.questions], 'classic');
      case 'quiz':
        return await getQuestions(userList, [...dataQuiz.questions], 'quiz');
      case 'duel':
        return await getQuestions(userList, [...dataDuel.questions], 'duel');
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

const getQuestions = async (userList, data, mode) => {
  try {
    let dataToUse = data;
    dataToUse.sort(() => Math.random() - 0.5);
    dataToUse = dataToUse.slice(0, 30);

    const questions = dataToUse.map((questionData, index) => {
      const parsedContent = parseQuestion(userList, questionData.content);
      return new Question(index, parsedContent, mode, questionData.options || []);
    });

    return questions;
  } catch (error) {
    console.error('Error while loading ', mode, ' questions: ', error);
    return [];
  }
} 