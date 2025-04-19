import { TimelineItem } from "../types";
import { 
  GraduationCap, Briefcase, Trophy, Code
} from "lucide-react";

export const timelineData: TimelineItem[] = [
  {
    id: "tl1",
    title: "B.Tech in Computer Science",
    date: "2023-2017",
    description: "Graduated with honors, specializing in artificial intelligence and web technologies.",
    icon: "GraduationCap",
    category: "education"
  },
  // {
  //   id: "tl2",
  //   title: "Software Engineering Intern",
  //   date: "Summer 2021",
  //   description: "Worked on front-end development using React at a fast-growing startup.",
  //   icon: "Briefcase",
  //   category: "work"
  // },
  {
    id: "tl2",
    title: "First Open Source Contribution",
    date: "October 2023",
    description: "Made my first pull request to a popular React library, which was merged.",
    icon: "Code",
    category: "achievement"
  },
  {
    id: "tl3",
    title: "Second Open Source Contribution",
    date: "2023 - 2024",
    description: "Joined a tech company as a full stack developer working with React and Node.js.",
    icon: "Briefcase",
    category: "work"
  },
  {
    id: "tl4",
    title: "Hackathon Participant",
    date: "March 2025",
    description: "Won first place at a local hackathon with an AI-powered web application.",
    icon: "Trophy",
    category: "achievement"
  },
  {
    id: "tl5",
    title: "Building AI Projects",
    date: "2023 - Present",
    description: "Currently working as a full stack developer specializing in React, TypeScript, and Node.js.",
    icon: "Briefcase",
    category: "work"
  }
];