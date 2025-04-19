import { GoogleGenerativeAI } from "@google/generative-ai";

// This is a placeholder API key - in a real project, this would be stored securely in environment variables
// const API_KEY = process.env.GEMINI_API_KEY;
const API_KEY = ""; // Replace with your actual API key when available

let genAI: GoogleGenerativeAI | null = null;

// Initialize the Gemini API client
export const initGeminiAPI = (apiKey = API_KEY) => {
  if (!apiKey) {
    console.error("Gemini API key is missing.");
    return null;
  }
  
  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
};

// Get a response from the Gemini model
export const getGeminiResponse = async (
  prompt: string, 
  context: string = "", 
  temperature: number = 0.7
) => {
  try {
    if (!genAI) {
      genAI = initGeminiAPI();
      
      if (!genAI) {
        throw new Error("Failed to initialize Gemini API");
      }
    }
    
    // For text-only input
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
    
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    throw error;
  }
};

// Generate a personalized portfolio summary
export const generatePortfolioSummary = async (skills: string[], interests: string[]) => {
  const prompt = `
    Generate a professional summary for a portfolio website based on these skills: 
    ${skills.join(", ")}
    
    And these interests:
    ${interests.join(", ")}
    
    The summary should be 2-3 sentences, professional yet personable, and highlight strengths.
  `;
  
  return getGeminiResponse(prompt);
};

// Generate quiz results
export const generateQuizResults = async (answers: string[]) => {
  const prompt = `
    Based on these answers to a developer personality quiz:
    
    ${answers.map((a, i) => `Question ${i+1}: ${a}`).join("\n")}
    
    Generate a personality profile with:
    1. A creative developer type name (e.g., "Solution Architect", "Code Artisan")
    2. A 2-3 sentence description of this personality type
    3. A list of 3 strengths
    4. A list of 2 growth areas
    
    Format as JSON with fields: type, description, strengths (array), growthAreas (array)
  `;
  
  const response = await getGeminiResponse(prompt);
  
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON");
    return {
      type: "Analytical Problem Solver",
      description: "You approach challenges methodically and excel at breaking down complex problems into manageable parts. Your analytical mindset helps you create robust solutions that anticipate edge cases.",
      strengths: ["Systematic debugging", "Detail-oriented planning", "Consistent documentation"],
      growthAreas: ["Balancing perfectionism", "Expanding creative thinking"]
    };
  }
};

// Generate a resume tailored to a specific role
export const generateTailoredResume = async (
  skills: string[], 
  experience: string[], 
  role: string
) => {
  const prompt = `
    Generate a professional summary for a resume targeting the role of ${role}.
    
    Skills: ${skills.join(", ")}
    
    Experience:
    ${experience.map(exp => `- ${exp}`).join("\n")}
    
    The summary should highlight relevant experience and skills for this specific role,
    be approximately 3-4 sentences, and use active professional language.
  `;
  
  return getGeminiResponse(prompt);
};