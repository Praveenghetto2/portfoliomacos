import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const interests = [
  {
    id: 1,
    name: 'Music Production',
    emoji: '🎵',
    color: 'bg-amber-500',
    textColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-500',
    borderHover: 'hover:border-amber-500/30',
    description: 'Experimenting with synths and beats to create electronic soundscapes. Constantly exploring new plugins and sound design techniques.',
    tags: ['Ableton Live', 'Sound Design', 'Synthesizers']
  },
  {
    id: 2,
    name: 'Street Photography',
    emoji: '📸',
    color: 'bg-sky-500',
    textColor: 'text-sky-500',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-500',
    borderHover: 'hover:border-sky-500/30',
    description: 'Capturing candid moments and urban geometry. I love finding extraordinary stories in ordinary everyday scenes.',
    tags: ['Fujifilm', 'Urban', 'Black & White']
  },
  {
    id: 3,
    name: 'Gaming & Game Design',
    emoji: '🎮',
    color: 'bg-violet-500',
    textColor: 'text-violet-500',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-500',
    borderHover: 'hover:border-violet-500/30',
    description: 'Deep diving into game mechanics, narrative structures, and player psychology. Fascinated by interactive storytelling.',
    tags: ['Indie Games', 'Level Design', 'RPG']
  },
  {
    id: 4,
    name: 'Reading & Writing',
    emoji: '📚',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-500',
    borderHover: 'hover:border-emerald-500/30',
    description: 'Devouring sci-fi, fantasy, and non-fiction. Occasional writer of short stories and tech articles.',
    tags: ['Sci-Fi', 'Non-fiction', 'Blogging']
  },
  {
    id: 5,
    name: 'Fitness & Wellness',
    emoji: '🏋️',
    color: 'bg-rose-500',
    textColor: 'text-rose-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-500',
    borderHover: 'hover:border-rose-500/30',
    description: 'Staying active through weightlifting, yoga, and outdoor running. Believer in a healthy body for a healthy mind.',
    tags: ['Weightlifting', 'Yoga', 'Nutrition']
  },
  {
    id: 6,
    name: 'Travel & Culture',
    emoji: '✈️',
    color: 'bg-indigo-500',
    textColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-500',
    borderHover: 'hover:border-indigo-500/30',
    description: 'Exploring new cities, cuisines, and cultures. Always planning the next adventure to expand my worldview.',
    tags: ['Backpacking', 'Foodie', 'Languages']
  },
  {
    id: 7,
    name: 'Cinema & Filmmaking',
    emoji: '🎬',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-500',
    borderHover: 'hover:border-orange-500/30',
    description: 'Analyzing cinematography, directing styles, and screenplays. I appreciate indie films and classic cinema.',
    tags: ['Cinematography', 'Indie Films', 'Screenwriting']
  },
  {
    id: 8,
    name: 'AI & Machine Learning',
    emoji: '🧠',
    color: 'bg-cyan-500',
    textColor: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-500',
    borderHover: 'hover:border-cyan-500/30',
    description: 'Fascinated by the rapidly evolving AI landscape. Exploring prompt engineering and generative models.',
    tags: ['LLMs', 'Generative AI', 'Prompt Eng']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

export default function InterestsApp() {
  return (
    <div className="w-full h-full bg-[#FAF9F6] overflow-y-auto p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-800">
              Core Interests
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-mono font-medium flex items-center justify-center">
              {interests.length} Total
            </span>
          </div>
          <p className="text-slate-500 font-body text-sm sm:text-base">
            Things that fuel my creative energy
          </p>
        </div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {interests.map((interest) => (
              <motion.div
                key={interest.id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className={`group cursor-pointer bg-white border border-slate-200/60 rounded-2xl p-5 shadow-xs hover:shadow-apple-md transition-all duration-300 border-l-4 ${interest.borderColor} ${interest.borderHover}`}
              >
                <div className="flex items-start space-x-4 mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${interest.bgColor} shrink-0`}>
                    {interest.emoji}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-800 text-lg mb-1 group-hover:text-slate-900 transition-colors">
                      {interest.name}
                    </h3>
                  </div>
                </div>
                
                <p className="text-slate-600 font-body text-sm leading-relaxed mb-4 line-clamp-3 h-[60px]">
                  {interest.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {interest.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`px-2 py-1 rounded-md ${interest.bgColor} ${interest.textColor} text-xs font-medium font-body`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="h-4"></div>
      </div>
    </div>
  );
}
