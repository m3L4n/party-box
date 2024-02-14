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
  // basic questions
  const questions = [
    new Question(`Vote ! En haut avoir des mains à la place des pieds, en bas avoir des pieds à la place de mains.`),
    new Question(`Tout le monde va donner une qualité à la personne à sa gauche, ${getRandUser(userList).name} commence. Glouglou pour celui qui ne trouve pas!`),
    new Question(`Si tu étais un animal, lequel serais-tu ? ${getRandUser(userList).name} commence.`),
    new Question(`Tout le monde décrit une situation cocasse digne d'un film, ${getRandUser(userList).name} commence.`),
    new Question(`Les animaux que tu peux mettre dans ta poche, ${getRandUser(userList).name} commence.`),
    new Question(`Vote ! En haut, vivre éternellement, en bas, ne plus jamais vieillir.`),
    new Question(`Vote ! Voyager dans le temps : en haut le future, en bas le passé.`),
    new Question(`Vote ! En haut, devenir invisible, en bas devenir le boss de Google.`),
    new Question(`Tout le monde designe celui qui s'endort le premier lors d'une soirée ! Glouglou pour le plus fatigué !`),
    new Question(`${getRandUser(userList).name}, raconte-nous ta rencontre la plus insolite avec un animal.`),
    new Question(`${getRandUser(userList).name} ton rendez-vous amoureux le plus rocambolesque.`),
    new Question(`${getRandUser(userList).name} racconte ton moment le plus genant en public.`),
    new Question(`${getRandUser(userList).name} décrit ton rêve le plus fou.`),
    new Question(`${getRandUser(userList).name} dit nous la phobie la plus irrationnelle pour toi.`),
  ];

  // questions with 2 users minimum
  if (userList.length > 1) {
    user1 = getRandUser(userList);
    user2 = getRandUser(userList);
    while (user1 === user2) {
      user2 = getRandUser(userList);
    }
    const questions_two_users = [
      new Question(`Vote ! Qui de ${user1.name} ou ${user2.name} est le plus susceptible de faire un meurtre sans se faire prendre ? Glouglou pour le meilleur assassin !`),
      new Question(`Vote ! Qui de ${user2.name} ou ${user1.name} pourrai garder un lourd secret pendant des années ? Glouglou pour la balance !`),
      new Question(`${user1.name} et ${user2.name} vont se faire un chi-fou-mi, glouglou pour le perdant !`),
      new Question(`Qui de ${user2.name} ou ${user1.name} va verser une larme devant un film romantique ? Glouglou pour le gros dur !`),
    ];
    questions.push(...questions_two_users);
  }

  // questions with 3 users minimum
  if (userList.length > 2) {
    user1 = getRandUser(userList);
    user2 = getRandUser(userList);
    user3 = getRandUser(userList);
    while (user1 === user2 || user1 === user3 || user2 === user3) {
      user1 = getRandUser(userList);
      user2 = getRandUser(userList);
      user3 = getRandUser(userList);
    }
    const questions_three_users = [
      new Question(`Vote ! Qui de ${user1.name}, ${user2.name} ou ${user3.name} est le plus susceptible de faire un meurtre ?`),
      new Question(`${user1.name} qui prendrais-tu entre ${user3.name} et ${user2.name} pour un road trip ?`),
      new Question(`${user2.name} qui prendrais-tu entre ${user1.name} et ${user3.name} pour un braquage ?`),
      new Question(`${user3.name} qui prendrais-tu entre ${user2.name} et ${user1.name} pour  ?`),
    ];
    questions.push(...questions_three_users);
  }

  return questions.map((question, index) => ({
    id: index,
    content: question.content,
    mode: 'classic'
  }));
}

export const getRandomQuestions = async (questions) => {
  const stack = [...questions];
  stack.sort(() => Math.random() - 0.5);
  const ret = stack.slice(0, 5);
  return ret;
}