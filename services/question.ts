// services/question.tsx

import { t } from 'i18next';
import dataClassicEn1 from '../assets/questions/en/classic/classic.json';
import dataClassicEn2 from '../assets/questions/en/classic/classic_vote.json';
import dataDuelEn1 from '../assets/questions/en/duel/duel.json';
import dataQuizEn1 from '../assets/questions/en/quiz/quiz.json';
import dataQuizEn2 from '../assets/questions/en/quiz/quiz_cinema.json';
import dataQuizEn3 from '../assets/questions/en/quiz/quiz_geography.json';
import dataClassicFr1 from '../assets/questions/fr/classic/classic.json';
import dataClassicFr2 from '../assets/questions/fr/classic/classic_vote.json';
import dataDuelFr1 from '../assets/questions/fr/duel/duel.json';
import dataQuizFr1 from '../assets/questions/fr/quiz/quiz.json';
import dataQuizFr2 from '../assets/questions/fr/quiz/quiz_cinema.json';
import dataQuizFr3 from '../assets/questions/fr/quiz/quiz_geography.json';
import i18n from '../i18n';
import { Mode } from '../models/Mode';
import { Question } from '../models/Question';
import { User } from '../models/User';

type QuestionData = {
  content: string;
  options?: string[];
};

type QuestionsByMode = {
  [key: string]: QuestionData[];
};

type QuestionsByLanguage = {
  [key: string]: QuestionsByMode;
};

const questionsData: QuestionsByLanguage = {
  fr: {
    classic: [
      ...dataClassicFr1.questions,
      ...dataClassicFr2.questions
    ],
    quiz: [
      ...dataQuizFr1.questions,
      ...dataQuizFr2.questions,
      ...dataQuizFr3.questions,
    ],
    duel: [
      ...dataDuelFr1.questions
    ],
  },
  en: {
    classic: [
      ...dataClassicEn1.questions,
      ...dataClassicEn2.questions
    ],
    quiz: [
      ...dataQuizEn1.questions,
      ...dataQuizEn2.questions,
      ...dataQuizEn3.questions,
    ],
    duel: [
      ...dataDuelEn1.questions
    ]
  }
}

export const getQuestionsList = async (mode: Mode, userList: User[]): Promise<Question[]> => {
  try {
    const language = i18n.language;
    const modeName = mode.name;
    if (!questionsData[language] || !questionsData[language][modeName]) {
      throw new Error(`Questions for mode ${modeName} in language ${language} not found`);
    }

    return await getQuestions(userList, questionsData[language][modeName], mode);
  } catch (error) {
    console.error('Error while loading questions: ', error);
    return [];
  }
};


const getRandomUsers = (userList: User[], n: number): User[] => {
  n = Math.min(n, userList.length);
  const copy = [...userList];
  const ret: User[] = [];

  for (let i = 0; i < n; i++) {
    const randIdx = Math.floor(Math.random() * copy.length);
    ret.push(copy[randIdx]);
    copy.splice(randIdx, 1);
  }

  return ret;
}

const parseQuestion = (userList: User[], question: Question): string => {
  const count = (question.content?.match(/\$\{user\}/g) || []).length;

  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let numReplacement;

  if (randomNumber <= 10) {
    numReplacement = t('shooter');
  } else {
    const drinkNumber = Math.floor(Math.random() * 5) + 1;
    numReplacement = `${drinkNumber} ${drinkNumber > 1 ? t('drinks') : t('drink')}`;
  }

  let parsedQuestion = question.content;
  let selectedUsers = getRandomUsers(userList, count);

  for (let user of selectedUsers) {
    parsedQuestion = parsedQuestion.replace('${user}', user.name);
  }

  parsedQuestion = parsedQuestion.replace('${num}', numReplacement);

  return parsedQuestion;
}

const getQuestions = async (userList: User[], data: any[], mode: Mode): Promise<Question[]> => {
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

    const questions: Question[] = dataToUse.map((questionData, index) => {
      const parsedContent = parseQuestion(userList, questionData);
      return {
        id: index,
        content: parsedContent,
        mode: mode,
        options: questionData.options || []
      };
    });

    return questions;
  } catch (error) {
    console.error('Error while loading ', mode, ' questions: ', error);
    return [];
  }
}