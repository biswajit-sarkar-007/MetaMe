import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '../../types';
import { initGeminiAPI, getGeminiResponse } from '../../services/GeminiService';
import { userData } from '../../data/userData';

const AIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hi there! I'm MetaMe, an AI assistant for ${userData.name}. What would you like to know?`,
      sender: 'bot',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample questions
  const sampleQuestions = [
    "Tell me about your projects",
    "What are your best skills?",
    "How do you approach problem-solving?",
    "What's your preferred tech stack?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // In a real implementation, we would connect to Gemini API
    // Here we're simulating it with a timeout
    try {
      // This context helps the AI provide responses relevant to the portfolio
      const context = `
        You are MetaMe, an AI assistant for ${userData.name}, who is a ${userData.title}.
        Your goal is to help visitors learn more about ${userData.name}'s background, skills, and projects.
        Keep responses helpful, friendly, and concise (2-3 sentences max).
        
        Here's some information about ${userData.name}:
        - Bio: ${userData.bio}
        - Current title: ${userData.title}
        - Location: ${userData.location}
      `;
      
      // In a real implementation, this would call the Gemini API
      // We're simulating it for now
      let response = "";
      
      // Simple pattern matching for common questions
      const query = input.toLowerCase();
      
      if (query.includes('project') || query.includes('work')) {
        response = "I've worked on several projects including an  Code To Imge, Gym Web App, and MindOfStudent website. Each one showcases different skills and technologies.";
      } else if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
        response = "My core skills include React, TypeScript, and Node.js. I'm also experienced with MongoDB, PostgreSQL, and have been exploring AI technologies like  HuggingFace, TensorFlow and the Gemini API.";
      } else if (query.includes('contact') || query.includes('hire') || query.includes('email')) {
        response = `You can reach out to me at ${userData.email} or connect with me on LinkedIn. I'm always open to discussing new opportunities and collaborations.`;
      } else if (query.includes('learn') || query.includes('study') || query.includes('education')) {
        response = "I have a B.Tech in Computer Science and continue learning through online courses, documentation, and building projects. I believe in learning by doing.";
      } else {
        // Generic response for other questions
        response = "Thanks for your question! I'm here to help you learn more about my experience, skills, and projects. Feel free to ask anything specific about my work or approach.";
      }
      
      // Add bot response after a short delay
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: Date.now().toString(),
          text: response,
          sender: 'bot',
          timestamp: Date.now(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error getting response:", error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <section id="chat" className="section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        Ask MetaMe
      </motion.h2>
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="glass rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Chat header */}
          <div className="bg-primary p-4 flex items-center gap-3">
            <Bot size={24} />
            <div>
              <h3 className="font-bold">MetaMe AI</h3>
              <p className="text-xs text-white/80">Powered by Google Gemini</p>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-4 bg-background/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-background-light rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'bot' ? (
                      <Bot size={16} className="text-primary" />
                    ) : (
                      <User size={16} />
                    )}
                    <span className="text-xs opacity-70">
                      {message.sender === 'bot' ? 'MetaMe' : 'You'}
                    </span>
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-background-light rounded-tl-none">
                  <div className="flex items-center gap-2">
                    <Bot size={16} className="text-primary" />
                    <span className="text-xs opacity-70">MetaMe</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Sample questions */}
          <div className="p-3 bg-background-light border-t border-white/10">
            <p className="text-xs text-gray-400 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-colors"
                  onClick={() => handleSampleQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t border-white/10 flex gap-2">
            <input
              type="text"
              className="w-full bg-background-light rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 border-none outline-none"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button
              className="btn-primary !py-2 !px-4"
              onClick={handleSend}
              disabled={isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIChat;