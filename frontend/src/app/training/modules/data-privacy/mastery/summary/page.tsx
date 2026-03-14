'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  TrendingUp,
  Award,
  Share2,
  Download,
  ArrowRight,
  RotateCcw,
  Moon
} from 'lucide-react';

export default function MasterySummaryPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex items-center justify-center p-6 relative overflow-hidden">

      {/* Soft Ambient Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#E0E7FF]/60 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#D1FAE5]/60 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Top Right Controls */}
      <div className="absolute top-8 right-8 z-20">
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center justify-center text-slate-500 transition-colors shadow-sm">
          <Moon className="w-5 h-5 fill-current" />
        </div>
      </div>

      {/* Main Content Container (Glassmorphic Card) */}
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] overflow-hidden flex flex-col md:flex-row relative z-10 animate-in fade-in zoom-in-95 duration-700">

        {/* Left Side: Medal & Status */}
        <div className="w-full md:w-[45%] p-12 md:p-16 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 bg-white/50 relative">

          {/* Hex Medal */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-[#A78BFA] opacity-20 blur-2xl rounded-full group-hover:scale-110 group-hover:opacity-30 transition-all duration-500"></div>

            <div className="w-48 h-48 rounded-full bg-[#111827] shadow-xl relative z-10 flex items-center justify-center border-4 border-slate-800 overflow-hidden">
              {/* Star / Medal Graphic Mock */}
              <div className="absolute text-slate-500/20 text-9xl leading-none font-black select-none">★</div>
              <div className="w-32 h-32 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full border-4 border-slate-500 flex items-center justify-center shadow-inner relative z-20">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">VICTORY</span>
                  <span className="text-4xl font-black text-white drop-shadow-md">1</span>
                </div>
              </div>

              {/* 4 Pointed Star accents */}
              <div className="absolute top-6 left-1/2 -ml-2 w-4 h-4 bg-slate-400 rotate-45"></div>
              <div className="absolute bottom-6 left-1/2 -ml-2 w-4 h-4 bg-slate-400 rotate-45"></div>
              <div className="absolute left-6 top-1/2 -mt-2 w-4 h-4 bg-slate-400 rotate-45"></div>
              <div className="absolute right-6 top-1/2 -mt-2 w-4 h-4 bg-slate-400 rotate-45"></div>
            </div>

            {/* Check overlay */}
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#10B981] rounded-full border-4 border-white flex items-center justify-center shadow-lg z-30">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </div>

          <h3 className="text-xs font-bold tracking-widest text-[#6366F1] uppercase mb-2">MODULE 2 COMPLETE</h3>
          <h1 className="text-4xl font-black text-[#8B5CF6] tracking-tight mb-6 text-center">Privacy Pro</h1>

          <p className="text-slate-500 text-center font-medium leading-relaxed max-w-sm mb-10">
            Exceptional work! You've mastered the fundamentals of Data Privacy in AI systems.
          </p>

          <div className="flex w-full gap-4">
            <button className="flex-1 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex-1 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Certificate
            </button>
          </div>
        </div>

        {/* Right Side: Stats & Next Steps */}
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">

          <div className="flex justify-between items-end mb-8">
            <h2 className="text-xl font-bold text-slate-800">Performance Summary</h2>
            <span className="bg-[#D1FAE5] text-[#059669] text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
              Variant 9 of 12
            </span>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-12">

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
                <svg className="w-4 h-4 text-[#6366F1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                Scenarios
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-800 tracking-tight">4 / 4</span>
                <span className="text-xs font-medium text-slate-400">Complete</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                Success Rate
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-800 tracking-tight">75%</span>
                <span className="text-xs font-medium text-slate-400">Top Tier</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
                <div className="w-4 h-4 rounded-full bg-[#F59E0B] flex items-center justify-center">
                  <span className="text-[8px] text-white">★</span>
                </div>
                XP Earned
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-800 tracking-tight">+450</span>
                <span className="text-xs font-medium text-slate-400">Total</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase mb-3">
                <svg className="w-4 h-4 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
                Compliance
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#3B82F6] tracking-tight">+7</span>
                <span className="text-xs font-medium text-slate-400">Points</span>
              </div>
            </div>

          </div>

          {/* Level Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-baseline mb-4">
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">CURRENT LEVEL</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#6366F1] tracking-tight">Level 3</span>
                  <span className="text-sm font-medium italic text-slate-400">Level Up!</span>
                </div>
              </div>
              <div className="text-xs font-medium text-slate-500 font-mono">
                1,250 / 2,000 XP
              </div>
            </div>

            <div className="h-3.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] w-[62%] rounded-full relative">
                {/* shine effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-t-full"></div>
              </div>
            </div>
          </div>

          {/* Next Steps Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link href="/dashboard/leaderboard" className="flex-[2] bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold text-sm px-6 py-4 rounded-xl shadow-lg shadow-[#6366F1]/30 transition-all flex items-center justify-between group">
              <span className="text-left leading-tight">Next Module: Governance<br />Fundamentals</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm px-6 py-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Review
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
