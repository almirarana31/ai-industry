'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Moon, ArrowRight, TrendingUp, Award, Shield } from 'lucide-react';

export default function ExcellentJudgmentPage() {
  return (
    <div className="min-h-screen bg-[#EFFFF6] text-slate-800 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Soft Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#A7F3D0]/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#A7F3D0]/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Top Right Controls */}
      <div className="absolute top-8 right-8">
        <div className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer flex items-center justify-center text-slate-500 transition-colors shadow-sm">
          <Moon className="w-5 h-5 fill-current" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-4xl flex flex-col items-center relative z-10 animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-700">

        {/* Header Ribbon */}
        <div className="bg-[#A7F3D0]/40 border border-[#A7F3D0] px-6 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#059669] uppercase mb-10 shadow-sm backdrop-blur-sm">
          VARIANT 8 OF 12
        </div>

        {/* Massive Success Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-black text-[#20C997] tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(32,201,151,0.4)]">
            EXCELLENT JUDGMENT!
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            You correctly identified the security risk and utilized internal secure enterprise tools.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Card 1: Score Increase */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-[0_10px_40px_rgba(32,201,151,0.08)] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E6F8F2] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#20C997] fill-current" />
            </div>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">COMPLIANCE SCORE</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black text-slate-800">92</span>
              <span className="text-sm font-bold text-[#20C997] flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                +7
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#20C997] w-[92%]"></div>
            </div>
          </div>

          {/* Card 2: Trust Index */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-[0_10px_40px_rgba(32,201,151,0.08)] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#E6F8F2] flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-[#20C997] fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            </div>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">TRUST INDEX</p>
            <div className="text-5xl font-black text-slate-800 mb-4">+5</div>
            <p className="text-[10px] text-slate-400 font-medium">Organization-wide reputation increased</p>
          </div>

          {/* Card 3: Experience */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-[0_10px_40px_rgba(32,201,151,0.08)] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">XP EARNED</p>
            <div className="text-5xl font-black text-slate-800 mb-4">+150</div>
            <p className="text-[10px] text-slate-400 font-medium">Current Level: 14 Senior Analyst</p>
          </div>

        </div>

        {/* Achievement Unlocked Pill */}
        <div className="bg-[#E6F8F2]/60 backdrop-blur-md border border-[#A7F3D0]/60 rounded-3xl p-4 pr-12 flex items-center gap-6 mb-12 shadow-sm animate-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] p-0.5 shadow-lg shadow-orange-500/20 shrink-0 mx-2">
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white/50">
              <Shield className="w-8 h-8 text-white fill-current opacity-90" />
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black tracking-widest text-[#D97706] uppercase mb-1">NEW ACHIEVEMENT UNLOCKED</h4>
            <h3 className="text-xl font-bold text-slate-800 mb-1">Sentinel - Bronze</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Successfully avoided shadow AI for 5 consecutive<br />missions.</p>
          </div>
        </div>

        {/* Primary Action */}
        <div className="flex flex-col items-center gap-4">
          <Link href="/training/modules/data-privacy/conversation" className="bg-[#20C997] hover:bg-[#1BA179] text-white font-bold text-lg px-12 py-5 rounded-full shadow-[0_10px_30px_rgba(32,201,151,0.4)] transition-all transform hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(32,201,151,0.5)] flex items-center gap-3">
            Next Mission
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="text-xs font-bold tracking-widest text-slate-500 uppercase hover:text-slate-800 transition-colors py-2 mb-12">
            REVIEW DECISION DETAILS
          </button>
        </div>

      </div>
    </div>
  );
}
