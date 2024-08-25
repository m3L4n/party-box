// src/services/QuestionService.ts

import { BACKEND_URL } from '@env';
import { t } from 'i18next';
import i18n from '../i18n';
import { Mode } from '../models/Mode';
import { Question } from '../models/Question';
import { User } from '../models/User';
export class QuestionService {
  private static instance: QuestionService;
  private questionsCache: { [key: string]: Question[] } = {};

  private constructor() {}

  public static getInstance(): QuestionService {
    if (!QuestionService.instance) {
      QuestionService.instance = new QuestionService();
    }
    return QuestionService.instance;
  }

  public async getQuestionsList(mode: Mode, userList: User[]): Promise<Question[]> {
    const cacheKey = `${i18n.language}-${mode.name}`;
    if (this.questionsCache[cacheKey]) {
      return this.questionsCache[cacheKey];
    }

    try {
      const response = await fetch(`${BACKEND_URL}/questions`);
      const data = await response.json();
      console.log(data)

      if (!data || data.length === 0) {
        throw new Error('No questions found');
      }

      const questions = this.parseQuestions(data.questions, userList);
      this.questionsCache[cacheKey] = questions;
      return questions;
    } catch (error) {
      console.error('Error while fetching questions:', error);
      return [];
    }
  }

  private parseQuestions(questionData: any[], userList: User[]): Question[] {
    let questions = questionData.map((questionData: any, index: number) => {
      const parsedContent = this.parseQuestion(userList, questionData);
      return {
        id: index,
        content: parsedContent,
        mode: questionData.mode,
        options: questionData.options || []
      };
    });

    questions.sort(() => Math.random() - 0.5);
    return questions.slice(0, 30);
  }

  private parseQuestion(userList: User[], question: Question): string {
    const count = (question.content.match(/\$\{user\}/g) || []).length;

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let numReplacement;

    if (randomNumber <= 10) {
      numReplacement = t('shooter');
    } else {
      const drinkNumber = Math.floor(Math.random() * 5) + 1;
      numReplacement = `${drinkNumber} ${drinkNumber > 1 ? t('drinks') : t('drink')}`;
    }

    let parsedQuestion = question.content;
    let selectedUsers = this.getRandomUsers(userList, count);

    for (let user of selectedUsers) {
      parsedQuestion = parsedQuestion.replace('${user}', user.name);
    }

    parsedQuestion = parsedQuestion.replace('${num}', numReplacement);

    return parsedQuestion;
  }

  private getRandomUsers(userList: User[], n: number): User[] {
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
}