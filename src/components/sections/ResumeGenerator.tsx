import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Cpu, FileText, Code, Braces, Globe, Loader2 } from 'lucide-react';
import { skillsData } from '../../data/skillsData';
import { timelineData } from '../../data/timelineData';
import { userData } from '../../data/userData';
import { generateTailoredResume } from '../../services/GeminiService';
import { projectsData } from '../../data/projectsData';

const ResumeGenerator = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');
  
  const roles = [
    { id: 'frontend', label: 'Frontend Developer', icon: <Globe size={18} /> },
    { id: 'backend', label: 'Backend Developer', icon: <Code size={18} /> },
    { id: 'fullstack', label: 'Full Stack Developer', icon: <Braces size={18} /> },
    { id: 'ai', label: 'AI Engineer', icon: <Cpu size={18} /> },
  ];
  
  const handleGenerateResume = async () => {
    if (!selectedRole) return;
    
    setIsGenerating(true);
    
    try {
      // Get relevant skills for the selected role
      const relevantSkills = skillsData
        .filter(skill => {
          if (selectedRole === 'frontend') return skill.category === 'frontend';
          if (selectedRole === 'backend') return skill.category === 'backend';
          if (selectedRole === 'fullstack') return skill.category === 'frontend' || skill.category === 'backend';
          if (selectedRole === 'ai') return skill.category === 'ai';
          return true;
        })
        .map(skill => skill.name);
      
      // Get experience from timeline
      const experience = timelineData
        .filter(item => item.category === 'work')
        .map(item => `${item.title}: ${item.description}`);
      
      // In a real implementation, this would call the Gemini API
      // We're simulating it for now
      setTimeout(() => {
  let summary = '';
  const skillsList = relevantSkills.slice(0, 8).join(', ');

  switch (selectedRole) {
    case 'frontend':
      summary = `Creative Frontend Developer skilled in ${skillsList}. Passionate about crafting responsive, accessible, and visually appealing user interfaces. Experienced collaborating with designers and backend teams to deliver seamless digital experiences.`;
      break;
    case 'backend':
      summary = `Analytical Backend Developer with expertise in ${skillsList}. Proven ability to build robust APIs, optimize databases, and ensure secure, scalable server-side solutions.`;
      break;
    case 'fullstack':
      summary = `Versatile Full Stack Developer proficient in ${skillsList}. Adept at delivering end-to-end solutions, integrating frontend and backend technologies to create cohesive, high-performance applications.`;
      break;
    case 'ai':
      summary = `Innovative AI Engineer specialized in ${skillsList}. Experienced in developing intelligent applications, leveraging machine learning and AI to solve real-world problems and automate complex processes.`;
      break;
    default:
      summary = `Experienced developer with a passion for creating efficient, user-friendly applications. Skilled in ${skillsList} and dedicated to delivering high-quality solutions.`;
  }

  setGeneratedSummary(summary);
  setIsGenerating(false);
}, 1500);
      
    } catch (error) {
      console.error("Error generating resume:", error);
      setIsGenerating(false);
      setGeneratedSummary("An experienced developer with a diverse skill set and a passion for building impactful digital solutions.");
    }
  };
  
  // Function to handle resume download (in a real app, this would generate a PDF)
  const handleDownload = () => {
    alert("In a real implementation, this would generate and download a PDF resume. The jsPDF library could be used for this purpose.");
  };

  return (
    <section id="resume" className="section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Resume Generator
      </motion.h2>
      
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Customize Your Resume</h3>
          <p className="text-gray-300 mb-6">
            Select a role to generate a tailored resume that highlights the most relevant skills and experiences.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {roles.map(role => (
              <button
                key={role.id}
                className={`p-4 rounded-lg border transition-all ${
                  selectedRole === role.id 
                    ? 'border-primary bg-primary/20 text-white' 
                    : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  {role.icon}
                  <span>{role.label}</span>
                </div>
              </button>
            ))}
          </div>
          
          <button
            className={`btn-primary w-full ${!selectedRole ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleGenerateResume}
            disabled={!selectedRole || isGenerating}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FileText size={18} />
                Generate Resume
              </div>
            )}
          </button>
        </div>
        
        {generatedSummary && (
          <motion.div 
            className="glass rounded-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold mb-2">Generated Resume</h3>
              <p className="text-sm text-gray-400">
                Tailored for: {roles.find(r => r.id === selectedRole)?.label}
              </p>
            </div>
            
            <div className="p-6 bg-white text-gray-800">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                <p className="text-gray-500">{userData.location} • {userData.email}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                  Professional Summary
                </h2>
                <p className="text-gray-700">
                  {generatedSummary}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillsData
                    .filter(skill => {
                      if (selectedRole === 'frontend') return skill.category === 'frontend';
                      if (selectedRole === 'backend') return skill.category === 'backend';
                      if (selectedRole === 'fullstack') 
                        return skill.category === 'frontend' || skill.category === 'backend';
                      if (selectedRole === 'ai') return skill.category === 'ai';
                      return true;
                    })
                    .slice(0, 10)
                    .map(skill => (
                      <span key={skill.name} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill.name}
                      </span>
                    ))
                  }
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                  Experience
                </h2>
                {/* Open Source Experience */}
                <div className="mb-4">
                  <h3 className="font-semibold text-primary mb-2">Open Source Experience</h3>
                  {timelineData.filter(item => item.title.toLowerCase().includes('open source')).length === 0 ? (
                    <p className="text-gray-500 text-sm">No open source experience listed.</p>
                  ) : (
                    timelineData.filter(item => item.title.toLowerCase().includes('open source')).map(item => (
                      <div key={item.id} className="mb-2">
                        <p className="font-bold text-gray-800">{item.title}</p>
                        <p className="text-gray-500 text-sm">{item.date}</p>
                        <p className="text-gray-700 mt-1">{item.description}</p>
                      </div>
                    ))
                  )}
                </div>
                {/* Hackathon Experience */}
                <div className="mb-4">
                  <h3 className="font-semibold text-primary mb-2">Hackathon Experience</h3>
                  {timelineData.filter(item => item.title.toLowerCase().includes('hackathon')).length === 0 ? (
                    <p className="text-gray-500 text-sm">No hackathon experience listed.</p>
                  ) : (
                    timelineData.filter(item => item.title.toLowerCase().includes('hackathon')).map(item => (
                      <div key={item.id} className="mb-2">
                        <p className="font-bold text-gray-800">{item.title}</p>
                        <p className="text-gray-500 text-sm">{item.date}</p>
                        <p className="text-gray-700 mt-1">{item.description}</p>
                      </div>
                    ))
                  )}
                </div>
                {/* Other Work Experience */}
                <div className="mb-4">
                  <h3 className="font-semibold text-primary mb-2">Professional/Work Experience</h3>
                  {timelineData.filter(item => item.category === 'work' && !item.title.toLowerCase().includes('open source') && !item.title.toLowerCase().includes('hackathon')).length === 0 ? (
                    <p className="text-gray-500 text-sm">No professional experience listed.</p>
                  ) : (
                    timelineData.filter(item => item.category === 'work' && !item.title.toLowerCase().includes('open source') && !item.title.toLowerCase().includes('hackathon')).map(item => (
                      <div key={item.id} className="mb-2">
                        <p className="font-bold text-gray-800">{item.title}</p>
                        <p className="text-gray-500 text-sm">{item.date}</p>
                        <p className="text-gray-700 mt-1">{item.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                  Projects
                </h2>
                <div className="space-y-4">
                  {projectsData.slice(0, 3).map((project) => (
                    <div key={project.id} className="mb-2">
                      <p className="font-bold text-gray-800">{project.title}</p>
                      <p className="text-gray-500 text-sm">{project.tags && project.tags.join(', ')}</p>
                      <p className="text-gray-700 mt-1">{project.description}</p>
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline mr-2">Live Demo</a>
                      )}
                      {project.codeUrl && (
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 underline">Source Code</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 flex justify-end">
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ResumeGenerator;