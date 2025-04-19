import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '../../data/timelineData';
import { GraduationCap, Briefcase, Trophy, Code } from 'lucide-react';

const Timeline = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={24} />;
      case 'Briefcase':
        return <Briefcase size={24} />;
      case 'Trophy':
        return <Trophy size={24} />;
      case 'Code':
        return <Code size={24} />;
      default:
        return <Briefcase size={24} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-blue-500';
      case 'work':
        return 'bg-green-500';
      case 'achievement':
        return 'bg-amber-500';
      case 'project':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section id="timeline" className="section bg-background-light">
      <div className="container mx-auto">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          My Journey
        </motion.h2>
        
        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent" />
          
          {/* Timeline items */}
          <div className="relative">
            {timelineData.map((item, index) => (
              <motion.div 
                key={item.id}
                className={`mb-12 flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } relative`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="glass p-6 rounded-xl hover:scale-105 transition-all duration-300">
                    <span className="text-sm font-medium text-primary-light block mb-2">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
                
                {/* Center point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-14 h-14 rounded-full ${getCategoryColor(item.category)} shadow-lg flex items-center justify-center text-white z-10`}>
                    {getIcon(item.icon)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;