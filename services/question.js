// services/question.js
import Question from '../models/Question';

export const getQuestionsList = async (mode, userList) => {
  try {
    switch (mode.name) {
      case 'classic':
        return await getClassicQuestions(userList);
      default:
        return [];
    }
  } catch (error) {
    console.error('Erreur lors du chargement des questions : ', error);
    return [];
  }
}

const getRandUser = (userList) => {
  const randIdx = Math.floor(Math.random() * userList.length);
  return userList[randIdx];
}

const getClassicQuestions = async (userList) => {
  const questions = [
    new Question(`Vote ! En haut avoir des mains à la place des pieds, en bas avoir des pieds à la place de mains.`),
    new Question(`Tout le monde va donner une qualité à la personne à sa gauche, ${getRandUser(userList).name} commence. Glouglou pour celui qui ne trouve pas!`),
    new Question(`Si tu étais un animal, lequel serais-tu ? ${getRandUser(userList).name} commence.`),
  ];

  if (userList.length > 1) {
    user1 = getRandUser(userList);
    user2 = getRandUser(userList);
    while (user1 === user2) {
      user2 = getRandUser(userList);
    }
    questions.push(new Question(`Vote ! Qui de ${user1.name} ou ${user2.name} est le plus susceptible de faire un meurtre ?`));
  }

  if (userList.length > 2) {
    user1 = getRandUser(userList);
    user2 = getRandUser(userList);
    user3 = getRandUser(userList);
    while (user1 === user2 || user1 === user3 || user2 === user3) {
      user1 = getRandUser(userList);
      user2 = getRandUser(userList);
      user3 = getRandUser(userList);
    }
    questions.push(new Question(`Vote ! Qui de ${user1.name}, ${user2.name} ou ${user3.name} est le plus susceptible de faire un meurtre ?`));
  }

  return questions.map((question, index) => ({
    id: index,
    content: question.content,
    mode: 'classic'
  }));
}