import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../data/projectsData';
import { ExternalLink, Code, PlayCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const [showCode, setShowCode] = useState(false);

  return (
    <section id="projects" className="section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Selection */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-xl p-6 h-full">
            <h3 className="text-xl font-bold mb-4 gradient-text">Project Gallery</h3>
            <div className="space-y-4">
              {projectsData.map((project) => (
                <div 
                  key={project.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeProject.id === project.id 
                      ? 'bg-primary/20 border border-primary/50' 
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => {
                    setActiveProject(project);
                    setShowCode(false);
                  }}
                >
                  <h4 className="font-bold text-lg mb-1">{project.title}</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-xl overflow-hidden h-full">
            {!showCode ? (
              <>
                {/* Project showcase */}
                <div className="h-60 md:h-80 bg-gradient-to-r from-background to-background-light overflow-hidden">
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold">{activeProject.title}</h3>
                    <div className="flex gap-2">
                      {activeProject.demoUrl && (
                        <a 
                          href={activeProject.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 btn-primary py-1 px-4"
                        >
                          <PlayCircle size={16} />
                          Demo
                        </a>
                      )}
                      {activeProject.codeSnippet && (
                        <button 
                          onClick={() => setShowCode(true)}
                          className="flex items-center gap-1 btn-secondary py-1 px-4"
                        >
                          <Code size={16} />
                          Code
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{activeProject.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm uppercase text-gray-400 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 rounded-full glass text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {activeProject.codeUrl && (
                    <a 
                      href={activeProject.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:text-primary-light flex items-center gap-2 text-sm mt-4"
                    >
                      <ExternalLink size={16} />
                      View source code on GitHub
                    </a>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Code playground */}
                <div className="flex justify-between items-center bg-background-light p-4">
                  <h3 className="text-xl font-bold">
                    <span className="gradient-text">Code</span> Playground
                  </h3>
                  <button 
                    onClick={() => setShowCode(false)}
                    className="text-gray-300 hover:text-white"
                  >
                    Back to Project
                  </button>
                </div>
                <div className="h-[500px] w-full">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue={activeProject.codeSnippet || "// No code snippet available"}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: 'on',
                      padding: { top: 20 },
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;