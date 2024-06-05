// models/Question.tsx

export default class Question {
  constructor(id, content, mode, options) {
    this.id = id;
    this.content = content;
    this.mode = mode;
    this.options = options || [];
  }
}