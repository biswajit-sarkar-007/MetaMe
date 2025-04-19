import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, ChevronRight, Loader2, RefreshCw, CheckCircle2 } from 'lucide-react';
import { quizQuestions } from '../../data/quizData';
import { QuizResult } from '../../types';
import { generateQuizResults } from '../../services/GeminiService';

const PersonalityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      generateResults(newAnswers);
    }
  };

  const generateResults = async (userAnswers: string[]) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the Gemini API
      // We're simulating the response for this demo
      setTimeout(() => {
        // Sample result (in a real implementation, this would come from the AI)
        const sampleResult: QuizResult = {
          type: "Analytical Innovator",
          description: "You approach development with a systematic mindset while remaining open to creative solutions. Your methodical approach to problem-solving combined with your curiosity makes you excellent at tackling complex challenges.",
          strengths: [
            "Breaking down complex problems into manageable parts",
            "Finding creative solutions through structured thinking",
            "Learning new technologies through hands-on projects"
          ],
          growthAreas: [
            "Consider seeking more collaborative input on projects",
            "Balancing perfectionism with pragmatic delivery"
          ]
        };
        
        setResult(sampleResult);
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error generating results:", error);
      setIsLoading(false);
      
      // Fallback result
      setResult({
        type: "Resourceful Developer",
        description: "You have a practical approach to development, focusing on what works and leveraging existing solutions effectively.",
        strengths: ["Adaptability", "Pragmatic approach", "Effective use of resources"],
        growthAreas: ["Documenting processes", "Building from first principles"]
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setResult(null);
  };

  const progressPercentage = (currentQuestion / quizQuestions.length) * 100;

  return (
    <section id="quiz" className="section bg-background-light">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        DNA of Me
      </motion.h2>
      
      <motion.div 
        className="max-w-2xl mx-auto glass rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {!isComplete ? (
          <>
            {/* Progress bar */}
            <div className="w-full h-2 bg-background">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            {/* Question */}
            <div className="p-6">
              <div className="mb-8">
                <span className="text-sm text-primary-light">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <h3 className="text-xl font-bold mt-2">
                  {quizQuestions[currentQuestion].question}
                </h3>
              </div>
              
              {/* Options */}
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-primary/20 transition-all flex justify-between items-center group"
                    onClick={() => handleAnswer(option)}
                  >
                    <span>{option}</span>
                    <ChevronRight 
                      size={18} 
                      className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="relative mb-6">
                  <BrainCircuit size={60} className="text-primary animate-pulse" />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <Loader2 size={30} className="animate-spin text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Analyzing Your Responses</h3>
                <p className="text-center text-gray-300">
                  The AI is processing your answers to generate personalized results...
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <BrainCircuit size={36} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold gradient-text mb-1">
                    {result?.type}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {result?.description}
                  </p>
                </div>
                
                {/* Strengths */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-primary-light">
                    Your Strengths
                  </h4>
                  <ul className="space-y-2">
                    {result?.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Growth Areas */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-accent-light">
                    Growth Opportunities
                  </h4>
                  <ul className="space-y-2">
                    {result?.growthAreas.map((area, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight size={18} className="text-accent mt-1 flex-shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Reset button */}
                <button
                  className="self-center flex items-center gap-2 btn-secondary mt-4"
                  onClick={resetQuiz}
                >
                  <RefreshCw size={16} />
                  Take Quiz Again
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default PersonalityQuiz;