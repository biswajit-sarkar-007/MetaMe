export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  category: 'education' | 'work' | 'achievement' | 'project';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
  codeSnippet?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'ai' | 'devops';
  icon?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface QuizResult {
  type: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
}

export interface DevJourneyChapter {
  title: string;
  subtitle: string;
  text: string;
  lottieData: any;
  bg: string;
}

export interface UserData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  devJourney: DevJourneyChapter[];
}