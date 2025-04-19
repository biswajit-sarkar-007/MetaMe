import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/skillsData';
import { 
  
   
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend, 
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' },
    { id: 'ai', label: 'AI' },
    { id: 'devops', label: 'DevOps' },
  ];
  
  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);
  
  const getChartData = () => {
    const categoryColors = {
      frontend: 'rgba(59, 130, 246, 0.6)', // blue
      backend: 'rgba(16, 185, 129, 0.6)',  // green
      tools: 'rgba(249, 115, 22, 0.6)',    // orange
      ai: 'rgba(139, 92, 246, 0.6)',       // purple
      devops: 'rgba(234, 179, 8, 0.6)',    // yellow
    };
    
    const borderColors = {
      frontend: 'rgba(59, 130, 246, 1)',
      backend: 'rgba(16, 185, 129, 1)',
      tools: 'rgba(249, 115, 22, 1)',
      ai: 'rgba(139, 92, 246, 1)',
      devops: 'rgba(234, 179, 8, 1)',
    };
    
    return {
      labels: filteredSkills.map(skill => skill.name),
      datasets: [
        {
          label: 'Skill Level',
          data: filteredSkills.map(skill => skill.level),
          backgroundColor: filteredSkills.map(skill => categoryColors[skill.category as keyof typeof categoryColors]),
          borderColor: filteredSkills.map(skill => borderColors[skill.category as keyof typeof borderColors]),
          borderWidth: 1,
        },
      ],
    };
  };
  
  // Chart options for bar chart
  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
      },
    },
  };
  
  // Data for category distribution pie chart
  const getCategoryData = () => {
    const categories = ['frontend', 'backend', 'tools', 'ai', 'devops'];
    const counts = categories.map(category => 
      skillsData.filter(skill => skill.category === category).length
    );
    
    return {
      labels: ['Frontend', 'Backend', 'Tools', 'AI', 'DevOps'],
      datasets: [
        {
          data: counts,
          backgroundColor: [
            'rgba(59, 130, 246, 0.6)',  // blue
            'rgba(16, 185, 129, 0.6)',   // green
            'rgba(249, 115, 22, 0.6)',   // orange
            'rgba(139, 92, 246, 0.6)',   // purple
            'rgba(234, 179, 8, 0.6)',    // yellow
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(249, 115, 22, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(234, 179, 8, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
      },
    },
  };

  return (
    <section id="skills" className="section bg-background-light">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Tech Stack
      </motion.h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Distribution */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-xl p-6 h-full">
            <h3 className="text-xl font-bold mb-4 gradient-text">Skill Categories</h3>
            
            <div className="h-60 flex items-center justify-center">
              {/* <Pie data={getCategoryData()} options={pieOptions} /> */}
            </div>
            
            <div className="mt-4">
              <div className="flex flex-col gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`py-2 px-4 rounded-lg text-left transition-all ${
                      activeCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Skills Chart */}
        <motion.div 
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-xl p-6 h-full">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              {activeCategory === 'all' ? 'All Skills' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Skills`}
            </h3>
            
            <div className="h-[500px]">
              <Bar data={getChartData()} options={chartOptions} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;