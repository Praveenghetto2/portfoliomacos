import React from 'react';
import { Activity, Heart, Flame, Trophy, CheckCircle } from 'lucide-react';

const FitnessApp = () => {
  return (
    <div className="p-8 space-y-8 select-text font-body text-apple-text overflow-y-auto h-full bg-[#FAF9F6]">
      <div className="flex justify-between items-center border-b border-black/5 pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold uppercase text-apple-text">Fitness & Health</h1>
          <p className="text-xs text-apple-subtext font-mono">Apple Fitness Metric Rings & Habit Streaks</p>
        </div>
        <span className="bg-red-500/10 text-red-600 text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" /> STREAK: 142 DAYS
        </span>
      </div>

      {/* Fitness Rings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-apple-sm text-center space-y-2">
          <Flame className="w-6 h-6 text-red-500 mx-auto" />
          <span className="text-2xl font-display font-extrabold text-red-500 block">650 / 600</span>
          <span className="text-[10px] font-mono uppercase text-apple-subtext font-bold">Move Goal (Cal)</span>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-apple-sm text-center space-y-2">
          <Activity className="w-6 h-6 text-green-500 mx-auto" />
          <span className="text-2xl font-display font-extrabold text-green-500 block">45 / 30</span>
          <span className="text-[10px] font-mono uppercase text-apple-subtext font-bold">Exercise Goal (Min)</span>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-apple-sm text-center space-y-2">
          <Heart className="w-6 h-6 text-cyan-500 mx-auto" />
          <span className="text-2xl font-display font-extrabold text-cyan-500 block">12 / 12</span>
          <span className="text-[10px] font-mono uppercase text-apple-subtext font-bold">Stand Goal (Hrs)</span>
        </div>
      </div>

      {/* Daily Habits */}
      <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-apple-sm space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase text-apple-subtext">Daily System Habits</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Morning Run', 'Weight Training', 'Design Reading', 'Code Review'].map((habit, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-apple-bg flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-apple-text">{habit}</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FitnessApp;
