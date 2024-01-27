// models/User.js

export default class User {
  constructor(name, color) {
    this.name = name;
    this.isActive = false;
    this.color = color;
  }
}