'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

const leaders = [
  {
    id: 1,
    name: 'Ayşe Yılmaz',
    role: 'Senior Frontend Developer Adayı',
    traitLabel: 'Uyum Skoru',
    score: 98,
    colorTheme: 'emerald',
  },
  {
    id: 2,
    name: 'Caner Demir',
    role: 'Senior Frontend Developer Adayı',
    traitLabel: 'Sorumluluk',
    score: 95,
    colorTheme: 'blue',
  },
  {
    id: 3,
    name: 'Zeynep Kaya',
    role: 'Senior Frontend Developer Adayı',
    traitLabel: 'Problem Çözme',
    score: 96,
    colorTheme: 'purple',
  },
];

export function ProjectLeaders() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % leaders.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const currentLeader = leaders[currentIndex];

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'emerald': return {
        bg: 'bg-emerald-50/50 border-emerald-100',
        text: 'text-emerald-950',
        textMuted: 'text-emerald-700',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        circleBg: 'text-emerald-200',
        circleProgress: 'text-emerald-500',
        btn: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20',
        dotActive: 'bg-emerald-500',
        dotInactive: 'bg-emerald-200 hover:bg-emerald-300'
      };
      case 'blue': return {
        bg: 'bg-blue-50/50 border-blue-100',
        text: 'text-blue-950',
        textMuted: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        circleBg: 'text-blue-200',
        circleProgress: 'text-blue-500',
        btn: 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20',
        dotActive: 'bg-blue-500',
        dotInactive: 'bg-blue-200 hover:bg-blue-300'
      };
      case 'purple': return {
        bg: 'bg-purple-50/50 border-purple-100',
        text: 'text-purple-950',
        textMuted: 'text-purple-700',
        badge: 'bg-purple-100 text-purple-800 border-purple-200',
        circleBg: 'text-purple-200',
        circleProgress: 'text-purple-500',
        btn: 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-600/20',
        dotActive: 'bg-purple-500',
        dotInactive: 'bg-purple-200 hover:bg-purple-300'
      };
      default: return {
        bg: 'bg-slate-50 border-slate-100',
        text: 'text-slate-900',
        textMuted: 'text-slate-600',
        badge: 'bg-slate-100 text-slate-800 border-slate-200',
        circleBg: 'text-slate-200',
        circleProgress: 'text-slate-500',
        btn: 'bg-slate-800 text-white hover:bg-slate-900 shadow-slate-800/20',
        dotActive: 'bg-slate-500',
        dotInactive: 'bg-slate-200 hover:bg-slate-300'
      };
    }
  };

  const themeClasses = getThemeClasses(currentLeader.colorTheme);
  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={`relative rounded-xl border shadow-[0_1px_3px_rgb(0_0_0/0.02)] p-4 h-full flex flex-col overflow-hidden transition-colors duration-700 font-[family-name:var(--font-manrope)] ${themeClasses.bg}`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h2 className={`text-[11px] font-bold uppercase tracking-wider ${themeClasses.text}`}>Öne Çıkan Adaylar</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={16} className={themeClasses.text} />
          </button>
          <button
            onClick={next}
            className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={16} className={themeClasses.text} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-[280px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border mb-2 ${themeClasses.badge}`}
            >
              <Trophy size={14} className="text-yellow-600" />
              1. SIRADA
            </motion.div>

            {/* Animated Score Circle */}
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0 mb-1">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="50%" cy="50%" r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className={themeClasses.circleBg}
                />
                <motion.circle
                  cx="50%" cy="50%" r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  className={themeClasses.circleProgress}
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - (circumference * currentLeader.score) / 100 }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.1 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                  className={`text-5xl font-black leading-none tracking-tighter ${themeClasses.text}`}
                >
                  {currentLeader.score}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className={`text-xs font-medium opacity-80 mt-[-6px] ${themeClasses.textMuted}`}
                >
                  {currentLeader.traitLabel}
                </motion.span>
              </div>
            </div>

            {/* Candidate Info */}
            <div className="mb-4 space-y-1">
              <h3 className={`text-xl font-bold tracking-tight ${themeClasses.text}`}>
                {currentLeader.name}
              </h3>
              <p className={`text-xs font-medium opacity-80 ${themeClasses.textMuted}`}>
                {currentLeader.role}
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => router.push('/tasarim')}
              className={`flex items-center justify-center gap-1.5 w-full max-w-[200px] py-2 rounded-xl shadow-sm text-[13px] font-bold transition-all hover:-translate-y-0.5 ${themeClasses.btn}`}
            >
              İncele <ArrowRight size={16} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4 relative z-10">
        {leaders.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? `w-6 ${themeClasses.dotActive}` : `w-1.5 ${themeClasses.dotInactive}`
              }`}
          />
        ))}
      </div>
    </div>
  );
}
