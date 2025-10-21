import { Question } from "@/types";

 

 

 

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2,
    category: "Programming Languages"
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 2,
    category: "Web Development"
  },
  {
    id: 3,
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Apple"],
    correctAnswer: 1,
    category: "Frameworks"
  },
  {
    id: 4,
    question: "What is the latest version of ECMAScript as of 2024?",
    options: ["ES2020", "ES2022", "ES2023", "ES2024"],
    correctAnswer: 3,
    category: "JavaScript"
  },
  {
    id: 5,
    question: "Which data structure uses LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    category: "Data Structures"
  },
  {
    id: 6,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Interface",
      "Application Process Integration",
      "Automated Programming Interface"
    ],
    correctAnswer: 0,
    category: "Web Development"
  },
  {
    id: 7,
    question: "Which tool is used for version control?",
    options: ["Docker", "Git", "Webpack", "Nginx"],
    correctAnswer: 1,
    category: "Tools"
  },
  {
    id: 8,
    question: "What is the virtual DOM in React?",
    options: [
      "A direct representation of the real DOM",
      "A programming concept where UI is kept in memory",
      "A browser extension",
      "A server-side rendering technique"
    ],
    correctAnswer: 1,
    category: "Frameworks"
  },
  {
    id: 9,
    question: "Which protocol is used for secure data transmission over the web?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correctAnswer: 2,
    category: "Web Security"
  },
  {
    id: 10,
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "System Query Language",
      "Standard Query Language"
    ],
    correctAnswer: 0,
    category: "Databases"
  }
];