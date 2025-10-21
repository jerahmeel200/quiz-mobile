export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface Answer {
  questionId: number;
  selectedOption: number | null;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizState {
  currentQuestion: number;
  answers: Answer[];
  startTime: Date;
  endTime: Date | null;
}