import { ProjectItem } from "../types";

export const projectsData: ProjectItem[] = [
  {
    id: "p1",
    title: "CodeImg",
    description: "Code to Image is a web application that allows you to convert your code snippets into beautifully styled PNG images. It provides various customization options such as background selection, syntax highlighting, padding adjustments, and multi-language support.",
    image: "https://private-user-images.githubusercontent.com/175685496/435424670-a2c63085-c03e-471a-8179-3af0decb5da0.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDUwOTg0NTksIm5iZiI6MTc0NTA5ODE1OSwicGF0aCI6Ii8xNzU2ODU0OTYvNDM1NDI0NjcwLWEyYzYzMDg1LWMwM2UtNDcxYS04MTc5LTNhZjBkZWNiNWRhMC5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQxOVQyMTI5MTlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00Y2E3MTJkYjNjZWIxNjI5NjhkYzExZWJiMjZlODVjNWQxYzJhNTE2NmZkZGNjMmRhYTUwNDAxNDk2ZmU3N2EwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.ow7cAYQkZ5agUHl2vTdVktEjl4oUvnS34cLSXxwIkik",
    tags: ["NextJs", "Node.js", "Tailwind CSS", "gemenaiAPI"],
    demoUrl: "https://code-img-beta.vercel.app/",
    codeUrl: "https://github.com/biswajit-sarkar-007/code-img.git",
    codeSnippet: `"use client";
import React, { useEffect } from "react";
import { Resizable } from "re-resizable";
import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-typescript";

 
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";
import { getExtension, initialCode } from "@/utils/utilities";

interface CodeEditorProps {
  language: string;
  theme: string;
  icon: string;
  background?: string;
  currentPadding?: string;
}

function CodeEditor({
  language,
  theme,
  icon,
  background,
  currentPadding,
}: CodeEditorProps) {
  const [width, setWidth] = React.useState(1000);
  const [height, setHeight] = React.useState<number | null>(500);
  const [title, setTitle] = React.useState("App");
  const [code, setCode] = React.useState(initialCode);

  const [extension, setExtension] = React.useState(".js");

  useEffect(() => {
    // Update the extension when the language changes
    setExtension(getExtension(language));
  }, [language]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the title without the extension
    const newTitle = e.target.value.split(".")[0];
    setTitle(newTitle);
  };

  // @ts-ignore
  const handleResize = (evt, direction, ref, pos) => {
    const newHeight = ref.style.height;
    setHeight(parseInt(newHeight, 10));
  };

  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Resizable
    minHeight={300}
    minWidth="100%"
    maxWidth="80%"
    defaultSize={{
      width: "80%",
      height: height || 500,
    }}
    onResize={handleResize}
    className="resize-container relative w-full"
    style={{
      background: background,
    }}
  >
    <div
      className="code-block"
      style={{
        padding: currentPadding,
      }}
    >
      <div
        className="code-title h-[48px] px-2 md:px-4 flex items-center justify-between
        bg-black bg-opacity-80"
      >
        <div className="dots flex items-center gap-1">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5656]"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbc6a]"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#67f772]"></div>
        </div>
  
        <div className="input-control w-full">
          <input
            type="text"
           
            onChange={(e) => handleTitleChange(e)}
            className="w-full text-[hsla(0,0%,100%,.6)] outline-none font-medium 
            text-center bg-transparent text-sm md:text-base"
            style={{
              lineHeight: "1.8rem",
            }}
          />
        </div>
  
        <div
          className="icon flex justify-center items-center p-1 bg-black
          bg-opacity-30 rounded-sm w-7 h-7 md:w-9 md:h-9"
        >
          <img src={icon} className="w-[22px] md:w-[33px]" alt="" />
        </div>
      </div>
  
      <AceEditor
        value={code}
        name="uniq_id_of_div"
        fontSize={14}
        theme={theme}
        mode={language.toLocaleLowerCase()}
        showGutter={false}
        wrapEnabled={true}
        
        showPrintMargin={false}
        highlightActiveLine={false}
        editorProps={{ $blockScrolling: true }}
        className="ace-editor-container w-full"
        onChange={handleCodeChange}
      />
    </div>
  </Resizable>
  
  );
}

export default CodeEditor;`
  },
  {
    id: "p2",
    title: "Gym Web App",
    description: "This is a professional Gym Website designed to help individuals achieve their fitness goals. The website provides a variety of exercises, detailed workout instructions, and video tutorials to help users maintain a healthy lifestyle. It also features an intuitive search function to explore different exercises and body parts.",
    image: "https://private-user-images.githubusercontent.com/175685496/435425172-9ec0ed0b-59ab-4848-9bd9-f6c17383873e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDUwOTk2MzksIm5iZiI6MTc0NTA5OTMzOSwicGF0aCI6Ii8xNzU2ODU0OTYvNDM1NDI1MTcyLTllYzBlZDBiLTU5YWItNDg0OC05YmQ5LWY2YzE3MzgzODczZS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQxOVQyMTQ4NTlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mMWNhYjU2YWYxMDYyNGE2OGE3YmI0YjIyYmE4MTk1MjYzYTVmMWVmYWQ5ZTIxMzNmOTkyMzZmYjQ0MWFlZTVlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.Vjis2bNYoZsV99bnI8SZouPgpPFg2uz881ha2DtvB4Q",
    tags: ["React", "Javacript", "Rapid API", "Tailwind CSS"],
    demoUrl: "https://github.com/biswajit-sarkar-007/gym-web/issues/1#issue-2918155525",
    codeUrl: "https://github.com/biswajit-sarkar-007/gym-web.git",
    codeSnippet: `export const exerciseOptions = {
    method: 'GET',
     
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
    
}

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY ,
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};`
  },
  {
    id: "p3",
    title: "MindOfStudent",
    description: "Welcome to our Free, AI-driven mental wellness companion — designed to help students manage stress, boost productivity, and improve overall well-being.",
    image: "https://private-user-images.githubusercontent.com/175685496/435425394-fb8410cd-2169-4fef-afb3-53b75d48c9d9.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDUwOTkzODgsIm5iZiI6MTc0NTA5OTA4OCwicGF0aCI6Ii8xNzU2ODU0OTYvNDM1NDI1Mzk0LWZiODQxMGNkLTIxNjktNGZlZi1hZmIzLTUzYjc1ZDQ4YzlkOS5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQxOVQyMTQ0NDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01OGRlYTE4N2JmMjVjYjdhMTUzMWVmYmZmOTU5ZmQ1Zjk2ZTU4YTI0MWUxMWYyMDVjYTcyYWExODliNjVhNmMzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.kPsQvmz1i3pouT-nA9hIdghEs_-yogEPPunmTu-6YA0",
    tags: ["TypeScript", "Firebase", "Tailwind CSS", "HuggingFace API", "TensorFlow.js", "React-ChartJS"],
    demoUrl: "https://hacker-house-amuhacks-4-0.vercel.app/",
    codeUrl: "https://github.com/biswajit-sarkar-007/Hacker-House_AMUHACKS4.0.git",
    codeSnippet: ` import React, { useState, useEffect } from 'react';
import { BrainCircuit, BrainCog , Moon, Clock, Users, Activity, Sparkles, Menu, X, ArrowRight, MessageSquare, Heart, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

import AIPoweredStressTracking from './components/features/AIPoweredStressTracking';
import DigitalDetoxAssistant from './components/features/DigitalDetoxAssistant';
import AISupport from './components/features/AISupport';
import StudyBreakScheduler from './components/features/StudyBreakScheduler';
import GuidedWellness from './components/features/GuidedWellness';
import CommunitySupport from './components/features/CommunitySupport';
import LearnMore from './components/pages/LearnMore';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/?section=' + sectionId);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  // Handle initial scroll when URL contains hash or query param
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      setTimeout(() => {
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else if (location.search) {
      const params = new URLSearchParams(location.search);
      const section = params.get('section');
      if (section) {
        const element = document.getElementById(section);
        setTimeout(() => {
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    }
  }, [location]);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between h-16">
    <div className="flex items-center">
      <Link to="/" className="flex items-center group">
        <BrainCircuit className="h-8 w-8 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
        <span className="ml-2 text-xl font-bold text-gray-900 transition-transform duration-300 group-hover:scale-110">
          MindOfStudent
        </span>
      </Link>
      </div>
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-gray-600 hover:text-indigo-600 relative group"
          >
            Features
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-gray-600 hover:text-indigo-600 relative group"
          >
            How It Works
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="text-gray-600 hover:text-indigo-600 relative group"
          >
            Testimonials
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-gray-600 hover:text-indigo-600 relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
          >
            Get Started
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('features')} 
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600 relative group"
            >
              Features
              <span className="absolute bottom-0 left-3 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-20"></span>
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600 relative group"
            >
              How It Works
              <span className="absolute bottom-0 left-3 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-24"></span>
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600 relative group"
            >
              Testimonials
              <span className="absolute bottom-0 left-3 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-24"></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-3 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-16"></span>
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  </nav>
  );
}

function FeatureCard({ icon: Icon, title, description, to }: { icon: React.ElementType, title: string, description: string, to: string }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
      onClick={() => navigate(to)}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="flex flex-col items-center justify-center w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function HowItWorksStep({ number, title, description }: { number: number, title: string, description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div
        className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold transition-transform duration-300 hover:rotate-12 hover:scale-110"
      >
        {number}
      </div>
      <div>
        <h3
          className="text-lg font-semibold mb-2 transition-transform duration-300 hover:scale-110 hover:translate-x-4"
        >
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ name, role, quote, image }: { name: string, role: string, quote: string, image: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-indigo-50">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">{quote}</p>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle initial scroll when component mounts
  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const section = params.get('section');
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <NavBar />

      
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/features/ai-stress-tracking" element={<AIPoweredStressTracking />} />
        <Route path="/features/digital-detox" element={<DigitalDetoxAssistant />} />
        <Route path="/features/ai-support" element={<AISupport />} />
        <Route path="/ai-mental-health-chatbot" element={<iframe src="/ai_mental_health_chatbot_Final.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="AI Mental Health Chatbot" />} />
        <Route path="/features/study-scheduler" element={<StudyBreakScheduler />} />
        <Route path="/features/guided-wellness/*" element={<GuidedWellness />} />
        <Route path="/features/community-support" element={<CommunitySupport />} />
        <Route path="/features/game" element={<iframe src="/detoxing_media/game.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Game" />} />

      </Routes>
    </Router>
  );
}

export default App;`
  }
];