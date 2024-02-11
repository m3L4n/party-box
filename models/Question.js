// models/Question.js

export default class Question {
  constructor(content, options) {
    this.content = content;
    this.options = options || [];
  }
}