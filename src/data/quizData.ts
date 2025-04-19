import { QuizQuestion } from "../types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "How do you approach solving a complex problem?",
    options: [
      "Break it down into smaller parts and tackle each systematically",
      "Research similar problems and adapt existing solutions",
      "Jump in and experiment with different approaches",
      "Discuss it with others to get different perspectives"
    ]
  },
  {
    id: "q2",
    question: "What's your preferred development environment?",
    options: [
      "Minimal setup with focus on productivity",
      "Feature-rich IDE with all the plugins",
      "Terminal-based tools like Vim/Emacs",
      "Visual tools with good UI/UX"
    ]
  },
  {
    id: "q3",
    question: "How do you handle a frustrating bug?",
    options: [
      "Step through the code methodically with debugging tools",
      "Take a break and come back with fresh eyes",
      "Add console logs everywhere to trace the issue",
      "Ask for help from a teammate or online community"
    ]
  },
  {
    id: "q4",
    question: "What's your preferred learning style for new technologies?",
    options: [
      "Official documentation and tutorials",
      "Building a small project to learn by doing",
      "Video courses and structured learning",
      "Reading articles and blog posts from experts"
    ]
  },
  {
    id: "q5",
    question: "What aspect of development do you enjoy most?",
    options: [
      "Creating beautiful, intuitive user interfaces",
      "Solving complex technical challenges",
      "Optimizing performance and efficiency",
      "Learning and implementing new technologies"
    ]
  }
];