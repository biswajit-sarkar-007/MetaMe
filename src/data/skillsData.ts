import { SkillItem } from "../types";

export const skillsData: SkillItem[] = [
  // Frontend
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "Tailwind CSS", level: 80, category: "frontend" },
  { name: "Next.js", level: 75, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "GraphQL", level: 60, category: "backend" },
  
  // Tools
  { name: "Git", level: 85, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
  { name: "Webpack", level: 65, category: "tools" },
  
  // AI
  { name: "TensorFlow", level: 50, category: "ai" },
  { name: "Gemini API", level: 75, category: "ai" },
  { name: "ChatGPT", level: 80, category: "ai" },
  
  // DevOps
  { name: "GitHub Actions", level: 60, category: "devops" },
  { name: "AWS", level: 55, category: "devops" },
  { name: "Vercel", level: 75, category: "devops" }
];