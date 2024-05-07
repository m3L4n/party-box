// services/question.js

import dataClassic1 from '../assets/questions/classic/classic.json';
import dataClassic2 from '../assets/questions/classic/classic_vote.json';
import dataDuel1 from '../assets/questions/duel/duel.json';
import dataQuiz1 from '../assets/questions/quiz/quiz.json';
import dataQuiz2 from '../assets/questions/quiz/quiz_cinema.json';
import dataQuiz3 from '../assets/questions/quiz/quiz_geography.json';
import dataWheel1 from '../assets/questions/wheel/wheel.json';
import Question from '../models/Question';

export const getQuestionsList = async (mode, userList) => {

  try {
    switch (mode.name) {
      case 'classic':
        return await getQuestions(userList, [
          ...dataClassic1.questions,
          ...dataClassic2.questions
        ], 'classic');
      case 'quiz':
        return await getQuestions(userList, [
          ...dataQuiz1.questions,
          ...dataQuiz2.questions,
          ...dataQuiz3.questions,
        ], 'quiz');
      case 'duel':
        return await getQuestions(userList, [
          ...dataDuel1.questions
        ], 'duel');
      case 'wheel':
        return await getQuestions(userList, [
          ...dataWheel1.questions
        ], 'wheel');
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

  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let numReplacement;

  if (randomNumber === 1) {
    numReplacement = 'un shoot';
  } else {
    const drinkNumber = Math.floor(Math.random() * 5) + 1;
    numReplacement = `${drinkNumber} ${drinkNumber > 1 ? 'gorgées' : 'gorgée'}`;
  }

  let parsedQuestion = question;
  let selectedUsers = getRandomUsers(userList, count);

  for (let user of selectedUsers) {
    parsedQuestion = parsedQuestion.replace('${user}', user.name);
  }

  parsedQuestion = parsedQuestion.replace('${num}', numReplacement);

  return parsedQuestion;
}

const getQuestions = async (userList, data, mode) => {
  try {
    let dataToUse = data;
    dataToUse.sort(() => Math.random() - 0.5);
    dataToUse = dataToUse.slice(0, 30);

    while (dataToUse.length < 30) {
      dataToUse = dataToUse.concat(dataToUse);
    }

    if (dataToUse.length > 30) {
      dataToUse = dataToUse.slice(0, 30);
    }

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