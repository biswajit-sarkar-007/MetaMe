import React, { useState, useEffect } from 'react';
import { Github, Home, Mail, Briefcase, Bot, FileText } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { userData } from '../data/userData';

// You can add live GitHub stats here if desired

const Footer = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const secretKeys = ['Control', 'Shift', 'M'];
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prevKeys => {
        const newKeys = [...prevKeys, e.key];
        if (newKeys.length > secretKeys.length) {
          newKeys.shift();
        }
        return newKeys;
      });
    };
    
    const handleKeyUp = () => {
      // Easter egg logic removed
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys]);

  return (
    <footer className="relative z-10 w-full bg-transparent pt-12 pb-4">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl glassmorphism border border-[#00fff7]/40 backdrop-blur-xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between">
          {/* Left: Bot Avatar & Help */}
          <div className="flex flex-col items-center gap-4 md:w-1/4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#181f2b] border-4 border-[#00fff7] flex items-center justify-center shadow-lg animate-pulse">
                <Bot className="text-[#00fff7] text-3xl animate-bounce" size={36} />
              </div>
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-[#39ff14] bg-[#181f2b] px-3 py-1 rounded-xl shadow border border-[#00fff7]/30 animate-fade-in animate-pulse flex items-center gap-1">
  <span className="animate-wave">🤖</span> <b>AI Copilot:</b> <span className="font-mono">How can I assist you?</span>
</span>
            </div>
            <div className="flex flex-col items-center mt-7">
              <span className="text-xs text-[#00fff7] font-mono">{userData.location}</span>
              <span className="text-xs text-[#39ff14] font-mono">IST (UTC+5:30)</span>
            </div>
          </div>
          {/* Center: Navigation & Stats */}
          <div className="flex-1 flex flex-col items-center gap-6">
            <nav className="flex gap-6 md:gap-10 mb-2">
              <a href="#hero" className="footer-nav-btn"><Home size={20} className="footer-icon" /> Home</a>
              <a href="#projects" className="footer-nav-btn"><Briefcase size={20} className="footer-icon" /> Projects</a>
              <a href="#contact" className="footer-nav-btn"><Mail size={20} className="footer-icon" /> Contact</a>
            </nav>
            {/* Divider with animated gradient for pro look */}
            <div className="w-full h-1 bg-gradient-to-r from-[#00fff7] via-[#39ff14] to-[#00fff7] rounded-full animate-gradient-x mb-2 opacity-80" />
            <div className="flex gap-4 mt-2">
              <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="footer-social"><Github size={22}/></a>
              <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social"><FaLinkedin size={22}/></a>
              <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="footer-social"><FaTwitter size={22}/></a>
              <a href={userData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="footer-social"><FaInstagram size={22}/></a>
              <a href={`mailto:${userData.email}`} className="footer-social"><Mail size={22}/></a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="footer-social"><FileText size={22}/></a>
            </div>
          </div>
          {/* Right: Easter Eggs & Meta */}
          <div className="flex flex-col items-center gap-4 md:w-1/4 mt-8 md:mt-0">
            <span className="text-xs text-[#a0ffcf] font-mono">Crafted with <span className="animate-emoji">💻</span> + <span className="animate-emoji">☕</span> by <b>Biswajit Sarkar</b></span>
            <span className="text-xs text-[#00fff7] font-mono">Last site update: <b>2025-04-20</b></span>
            <span className="text-xs text-[#39ff14] font-mono">Built in VS Code <span className="animate-spin inline-block">🚀</span></span>
            <span className="text-xs text-[#a0ffcf] font-mono">Contact: <a href={`mailto:${userData.email}`} className="underline hover:text-[#00fff7]">{userData.email}</a></span>
            {/* Digital clock */}
            <span className="text-xs text-[#00fff7] font-mono" id="footer-clock"></span>
          </div>
        </div>
        {/* Fun flicker bar at the bottom */}
        <div className="mt-6 flex items-center justify-center">
          <span className="block w-2 h-2 bg-[#00fff7] rounded-full animate-flicker mr-2"></span>
          <span className="block w-2 h-2 bg-[#39ff14] rounded-full animate-flicker2 mr-2"></span>
          <span className="block w-2 h-2 bg-[#00fff7] rounded-full animate-flicker"></span>
        </div>
      </div>
      {/* Scroll to top button */}
      <button
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 bg-[#181f2b]/80 border-2 border-[#00fff7] rounded-full p-3 shadow-xl hover:bg-[#00fff7] hover:text-[#181f2b] transition-all animate-flicker2"
        style={{boxShadow: '0 0 24px #00fff799'}}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
      </button>
      {/*
        For production, move this CSS to your global stylesheet (e.g., index.css or App.css)
      */}
      <style>{`
        .glassmorphism {
          background: rgba(18, 24, 36, 0.72);
          box-shadow: 0 8px 40px #00fff733, 0 1.5px 0 #39ff1440 inset;
        }
        .footer-nav-btn {
          display: flex; align-items: center; gap: 0.5rem;
          color: #a0ffcf; font-weight: 600; letter-spacing: 0.02em;
          padding: 0.5rem 1.2rem; border-radius: 999px;
          background: rgba(0,255,247,0.07);
          border: 1px solid rgba(0,255,247,0.13);
          box-shadow: 0 0 8px #00fff733;
          transition: all 0.18s cubic-bezier(.4,1.7,.7,1.1);
        }
        .footer-nav-btn:hover {
          background: rgba(0,255,247,0.22);
          color: #39ff14;
          box-shadow: 0 0 16px #00fff7cc;
          text-shadow: 0 0 4px #39ff14;
        }
        .footer-social {
          color: #00fff7; background: rgba(18, 24, 36, 0.55);
          border-radius: 999px; padding: 0.4rem; border: 1.5px solid #00fff7;
          box-shadow: 0 0 8px #00fff733;
          transition: all 0.18s cubic-bezier(.4,1.7,.7,1.1);
        }
        .footer-social:hover {
          color: #39ff14; background: #181f2b;
          border-color: #39ff14;
          box-shadow: 0 0 16px #39ff14cc;
          text-shadow: 0 0 4px #00fff7;
        }
        .footer-led {
          background: rgba(0,255,247,0.07);
          border-radius: 0.5rem;
          padding: 0.25rem 0.7rem;
          box-shadow: 0 0 8px #00fff733 inset;
          color: #00fff7;
          transition: background 0.2s;
        }
        .footer-led:hover {
          background: #39ff14cc;
          color: #181f2b;
        }
        .animate-flicker {
          animation: flicker 1.6s infinite alternate;
        }
        .animate-flicker2 {
          animation: flicker 1.2s infinite alternate;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          45% { opacity: 0.3; }
          60% { opacity: 0.7; }
        }
        @keyframes flicker2 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-emoji {
          animation: emojiPulse 1.2s infinite alternate;
        }
        @keyframes emojiPulse {
          0% { filter: brightness(1); }
          100% { filter: brightness(2); }
        }
      `}</style>
      <script>{`
        // Live digital clock for footer
        setInterval(function() {
          var d = new Date();
          var h = String(d.getHours()).padStart(2, '0');
          var m = String(d.getMinutes()).padStart(2, '0');
          var s = String(d.getSeconds()).padStart(2, '0');
          var str = '⏰ ' + h + ':' + m + ':' + s;
          var el = document.getElementById('footer-clock');
          if (el) el.textContent = str;
        }, 1000);
      `}</script>
      <style>{`
        @media (max-width: 600px) {
          .fixed.bottom-8.right-8 { bottom: 1rem; right: 1rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;