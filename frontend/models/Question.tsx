// models/Question.tsx

import { Mode } from "./Mode";

export interface Question {
  id: number;
  content: string;
  mode: Mode;
  options: Option[];
}

interface Option {
  id: number;
  content: string;
  isAnswer: boolean;
}