import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { userData } from "../data/userData";
import type { DevJourneyChapter } from "../types";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function DevJourneySection() {
  const chapters = userData.devJourney;
  return (
    <section id="dev-journey" className="w-full min-h-screen py-16 relative">
      <div className="absolute left-1/2 top-0 h-full w-2 bg-gradient-to-b from-[#00fff7]/70 to-[#39ff14]/0 rounded-full blur-xl opacity-50 -z-10" style={{transform: 'translateX(-50%)'}} />
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-5xl font-black text-center text-[#39ff14] mb-16 drop-shadow-lg tracking-tight font-mono">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00fff7] via-[#39ff14] to-[#00fff7] animate-gradient-x">A Little Coder’s Quest</span>
        </h2>
        <div className="relative space-y-32">
          {chapters.map((chapter: DevJourneyChapter, idx: number) => (
            <motion.div
              key={idx}
              className={`relative rounded-3xl shadow-2xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 glassmorphism border border-[#00fff7]/30 backdrop-blur-xl ${chapter.bg}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeInUp}
              style={{overflow: 'visible'}}
            >
              {/* Floating milestone icon */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-4xl md:text-5xl animate-bounce drop-shadow-lg select-none pointer-events-none">
                {chapter.title.match(/^\W+/)?.[0] || '✨'}
              </span>
              <div className="w-40 h-40 md:w-60 md:h-60 flex-shrink-0 flex items-center justify-center rounded-2xl bg-[#14191f]/60 shadow-lg border border-[#00fff7]/20">
                {/* Lottie animation or fallback */}
                {chapter.lottieData && Object.keys(chapter.lottieData).length > 0 ? (
                  <Lottie animationData={chapter.lottieData} loop={true} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <span className="text-6xl text-[#00fff7] opacity-60">🎬</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#00fff7] mb-2 font-mono tracking-tight">{chapter.title.replace(/^\W+/, '')}</h3>
                <div className="text-lg text-[#a0ffcf] mb-3 font-medium font-mono">{chapter.subtitle}</div>
                <motion.p className="text-lg md:text-xl text-white font-semibold mb-4 font-sans drop-shadow-sm" variants={fadeInUp}>{chapter.text}</motion.p>
                {/* Animated underline */}
                <div className="h-1 w-24 bg-gradient-to-r from-[#00fff7] to-[#39ff14] rounded-full animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
