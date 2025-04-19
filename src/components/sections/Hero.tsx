import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { userData } from '../../data/userData';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay for background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full opacity-30 bg-primary blur-[100px]" />
        
        {/* Accent glow */}
        <div className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full opacity-20 bg-accent blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Avatar */}
          <motion.div 
            className="w-36 h-36 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/10 glow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <img 
              src="https://media.licdn.com/dms/image/v2/D4E03AQG1fvN7_tCmYA/profile-displayphoto-shrink_400_400/B4EZZPSDmvHkAg-/0/1745086856221?e=1750291200&v=beta&t=i2M6WnnGlWZF_n6XNRTnxblm7gj1VG9f9Y6RoGZ3WIk"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            👋 Hi, I'm{" "}
            <span className="gradient-text">{userData.name}</span>
          </motion.h1>
          
          {/* Dynamic TypeWriter */}
          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-6 h-12 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="mr-2">I'm a</span>
            <TypeAnimation
              sequence={[
                'Developer',
                1500,
                'Designer',
                1500,
                'AI Explorer',
                1500,
                'Tech Dreamer',
                1500,
              ]}
              wrapper="span"
              speed={50}
              className="text-primary font-semibold"
              repeat={Infinity}
            />
          </motion.div>
          
          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Welcome to MetaMe — An intelligent portfolio powered by AI.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <a
              href="#dev-journey"
              className="btn-primary px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Explore Me
            </a>
            <ChevronDown size={18} />
            <a href="#chat" className="btn-secondary flex items-center justify-center gap-2">
              Talk to MetaMe
              <MessageSquare size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center items-start p-1"
          initial={{ y: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-2 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;