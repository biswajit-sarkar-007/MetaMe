import React, { useEffect, useLayoutEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import DevJourneySection from './components/DevJourneySection';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import GithubHeatmapCard from './components/GithubHeatmapCard';
import GithubProfileStats from './components/GithubProfileStats';
import AIChat from './components/sections/AIChat';
import PersonalityQuiz from './components/sections/PersonalityQuiz';
import ResumeGenerator from './components/sections/ResumeGenerator';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import { initGeminiAPI } from './services/GeminiService';

function App() {
  // If there is a hash in the URL, remove it and render nothing
  if (window.location.hash) {
    window.location.replace(window.location.pathname + window.location.search);
    return null;
  }

  useLayoutEffect(() => {
    // Always scroll to the Home section (id='hero') after removing hash
    const homeSection = document.getElementById('hero');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    // Initialize the Gemini API when the app loads
    // In a real app, you'd need a valid API key
    initGeminiAPI();
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Background particles */}
      <ParticleBackground />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main sections */}
      <main>
        <Hero />
        <DevJourneySection />
        <Projects />
        <Skills />
        <GithubHeatmapCard />
        <GithubProfileStats />
        <AIChat />
        <PersonalityQuiz />
        <ResumeGenerator />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;