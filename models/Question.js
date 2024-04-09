// models/Question.js

export default class Question {
  constructor(id, content, options, mode) {
    this.id = id;
    this.content = content;
    this.mode = mode;
    this.options = options || [];
  }
}