// services/question.js
import dataClassic from '../assets/questions/classic.json';
import dataClassic2 from '../assets/questions/classic_2.json';
import dataClassic3 from '../assets/questions/classic_3.json';

export const getQuestionsList = async (mode, userList) => {
  try {
    switch (mode.name) {
      case 'classic':
        return await getClassicQuestions(userList);
      // case 'duel':
      //   return await getDuelQuestions(userList);
      default:
        return [];
    }
  } catch (error) {
    console.error('Erreur lors du chargement des questions : ', error);
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
    let questions = [
      ...dataClassic.questions
    ];

    questions.push(...dataClassic2.questions)
    questions.push(...dataClassic3.questions)

    questions.sort(() => Math.random() - 0.5);
    questions = questions.slice(0, 50);

    for (let question of questions) {
      question.content = parseQuestion(userList, question.content);
    }

    return questions.map((question, index) => ({
      id: index,
      content: question.content,
      mode: 'classic'
    }));
  } catch (error) {
    console.error('Erreur lors du chargement des questions classiques : ', error);
    return [];
  }
}

// const getDuelQuestions = async (userList) => {
//   try {
//     let questions = [
//       ...dataDuel.questions
//     ];

//     questions.sort(() => Math.random() - 0.5);
//     questions = questions.slice(0, 5);

//     for (let question of questions) {
//       question.content = parseQuestion(userList, question.content);
//     }

//     return questions.map((question, index) => ({
//       id: index,
//       content: question.content,
//       mode: 'duel'
//     }));
//   } catch (error) {
//     console.error('Erreur lors du chargement des questions de duel : ', error);
//     return [];
//   }
// }