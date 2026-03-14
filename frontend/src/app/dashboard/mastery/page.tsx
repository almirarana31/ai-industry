'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  ShieldAlert,
  Award,
  Download,
  Zap,
  CheckCircle2,
  Lock,
  Terminal,
  Scale,
  FileCode2,
  Share2,
  Search,
  Bell,
  Settings,
  TrendingUp
} from 'lucide-react';

export default function FinalMasteryPage() {
  return (
    <div className="min-h-screen bg-[#0F1E21] text-slate-100 font-sans flex flex-col selection:bg-[#0D9488]/30">

      {/* Top Application Navbar */}
      <nav className="h-20 bg-[#0A1517] border-b border-[#0D9488]/10 flex items-center justify-between px-8 shrink-0 relative z-20">
        <div className="flex items-center gap-12">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-[#0D9488] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform shadow-[0_0_15px_rgba(13,148,136,0.3)]">
              <div className="w-4 h-4 border-2 border-[#0A1517] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Sentinel</span>
          </Link>

          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0D9488]/60 group-focus-within:text-[#0D9488]" />
            <input
              type="text"
              placeholder="Search modules..."
              className="bg-[#14292C] text-sm text-[#0D9488] placeholder-[#0D9488]/40 rounded-lg pl-10 pr-4 py-2.5 w-64 border border-[#0D9488]/20 focus:outline-none focus:border-[#0D9488]/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/training" className="text-slate-400 hover:text-white transition-colors">Training</Link>
            <Link href="/certifications" className="text-[#0D9488] border-b-2 border-[#0D9488] pb-6 pt-6">Certifications</Link>
            <Link href="/community" className="text-slate-400 hover:text-white transition-colors">Community</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-[#0D9488]/20">
              Profile
            </button>
            <div className="w-10 h-10 rounded-full border border-[#0D9488]/30 flex items-center justify-center cursor-pointer hover:bg-[#0D9488]/10 transition-colors">
              <svg className="w-5 h-5 text-[#0D9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">

          {/* Top Hero Banner */}
          <div className="relative bg-gradient-to-r from-[#112A2D] to-[#0A1517] rounded-3xl p-10 md:p-12 mb-8 border border-[#0D9488]/20 overflow-hidden group">

            {/* Giant Background Medal */}
            <div className="absolute top-[-50px] right-[5%] text-[#0D9488] opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15l-4.24 2.227 1.12-4.81-3.69-3.23 4.93-.42L12 4.19l1.88 4.58 4.93.42-3.69 3.23 1.12 4.81L12 15z" /><path d="M12 2L9.2 8.6l-7 .6 5.3 4.6-1.5 6.9L12 17.5l6 3.2-1.5-6.9L21.8 9.2l-7-.6L12 2zm0 13.9l-4.2 2.2 1.1-4.8-3.7-3.2 4.9-.4 1.9-4.6 1.9 4.6 4.9.4-3.7 3.2 1.1 4.8-4.2-2.2z" /><path d="M12 21.3l-6.2 3.3 1.6-7.1-5.4-4.7 7.3-.6L12 .6l2.7 6.6 7.3.6-5.4 4.7 1.6 7.1L12 21.3z" opacity=".2" /></svg>
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 border border-[#0D9488]/30 text-[#0D9488] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                <CheckCircle2 className="w-4 h-4" />
                Mastery Achieved
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight drop-shadow-md">
                Final Dashboard: Level 5
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl">
                System Overdrive Engaged. You have successfully completed the core AI Literacy curriculum with distinction. Your profile is now certified for enterprise-wide AI implementation.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-[#14292C] hover:bg-[#1A383D] border border-[#0D9488]/30 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-3 group/btn">
                  <Download className="w-5 h-5 text-[#0D9488] group-hover/btn:-translate-y-1 transition-transform" />
                  Export Certificate
                </button>
                <button className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_30px_rgba(13,148,136,0.3)] hover:shadow-[0_0_40px_rgba(13,148,136,0.5)] flex items-center gap-3">
                  Start Advanced Training
                  <Zap className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

            <div className="bg-[#112A2D] border border-[#0D9488]/20 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#10B981] opacity-5 blur-2xl group-hover:opacity-10 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Compliance Score</p>
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
              </div>
              <h2 className="text-4xl font-black text-[#10B981] tracking-tight mb-2">95<span className="text-2xl text-slate-500 font-medium">/100</span></h2>
              <p className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5% Monthly
              </p>
            </div>

            <div className="bg-[#112A2D] border border-[#0D9488]/20 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#3B82F6] opacity-5 blur-2xl group-hover:opacity-10 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Trust Index</p>
                <Users className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight mb-2">88<span className="text-2xl text-slate-500 font-medium">/100</span></h2>
              <p className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2% Gain
              </p>
            </div>

            <div className="bg-[#112A2D] border border-[#0D9488]/20 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0D9488] opacity-5 blur-2xl group-hover:opacity-10 transition-opacity"></div>
              <div className="flex justify-between items-start mb-6">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Risk Exposure</p>
                <ShieldAlert className="w-5 h-5 text-[#0D9488]" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight mb-2">LOW</h2>
              <p className="text-xs font-medium italic text-slate-500">
                Safety Optimized
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0D9488]/20 to-[#112A2D] border border-[#0D9488]/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(13,148,136,0.1)] relative overflow-hidden">
              <div className="absolute -bottom-4 right-4 text-[#0D9488]/20 w-16 h-16">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.4l-3.8 2.2 1-4.3-3.3-2.9 4.4-.4L12 6l1.7 4 4.4.4-3.3 2.9 1 4.3z" /><path d="M22 2v20h-4v-2h-2v-4h-2v4h-2v2H8v-2H6v-4H4v4H2V2h20z" opacity=".2" /></svg>
              </div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <p className="text-[10px] font-bold tracking-widest text-[#0D9488] uppercase">CURRENT RANK</p>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight mb-4 relative z-10">Level 5</h2>
              <p className="text-[10px] font-black text-[#0D9488] tracking-widest uppercase w-full bg-[#0D9488]/10 p-2 rounded border border-[#0D9488]/20 text-center relative z-10">
                MAX LEVEL ACHIEVED
              </p>
            </div>

          </div>

          {/* Bottom Split Layout */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Column: Modules List */}
            <div className="flex-[2] flex flex-col gap-6 min-w-0">

              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-white tracking-wide">Curriculum Completion</h2>
                <span className="text-sm font-bold text-[#0D9488]">5/5 Modules Complete</span>
              </div>

              {/* Module Checklist */}
              <div className="space-y-4">

                {[
                  { num: 1, title: 'AI Fundamentals', sub: 'Architectures, Neural Nets & LLM Logic', icon: Terminal },
                  { num: 2, title: 'Ethical Implementation', sub: 'Bias Detection & Responsible Scaling', icon: Scale },
                  { num: 3, title: 'Data Privacy & Security', sub: 'GDPR Compliance & Cyber Fortressing', icon: Lock },
                  { num: 4, title: 'Prompt Engineering Mastery', sub: 'Chain-of-Thought & Advanced Syntax', icon: FileCode2 },
                  { num: 5, title: 'Enterprise Integration', sub: 'API Orchestration & Workflow Automation', icon: Zap },
                ].map((mod, i) => (
                  <div key={i} className="bg-[#112A2D] border border-[#0D9488]/20 hover:border-[#0D9488]/50 rounded-2xl p-5 flex items-center gap-6 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-[#0D9488] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(13,148,136,0.4)] group-hover:scale-105 transition-transform">
                      <mod.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-lg leading-tight mb-1 truncate">Module {mod.num}: {mod.title}</h4>
                      <p className="text-slate-400 text-xs truncate">{mod.sub}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-[#10B981] tracking-widest uppercase hidden sm:block">COMPLETED</span>
                      <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Right Column: The Certificate Badge */}
            <div className="w-full lg:w-[400px] bg-gradient-to-b from-[#112A2D] to-[#0A1517] border border-[#0D9488]/30 rounded-3xl p-8 shadow-2xl flex flex-col items-center shrink-0 relative overflow-hidden">

              {/* Internal glow for badge */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-48 h-48 bg-[#0D9488] opacity-20 blur-[60px] pointer-events-none"></div>

              <div className="w-32 h-32 rounded-full border border-[#0D9488]/30 bg-[#0F1E21] shadow-2xl flex items-center justify-center relative mb-8 z-10 group">
                {/* Ring animation */}
                <div className="absolute inset-[-4px] rounded-full border-2 border-[#0D9488] opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute inset-[-12px] rounded-full border border-[#0D9488]/20 opacity-30 group-hover:scale-125 transition-transform duration-700"></div>

                <div className="flex flex-col items-center scale-110">
                  <Award className="w-10 h-10 text-[#0D9488] mb-1 drop-shadow-lg" />
                  <span className="text-[9px] font-black text-[#0D9488] tracking-widest uppercase">LEVEL 5</span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-4 text-center relative z-10">AI Literacy Certified</h3>
              <p className="text-sm text-slate-400 text-center leading-relaxed mb-8 px-4 relative z-10">
                This verified credential confirms expert-level competency in ethical AI deployment and enterprise engineering.
              </p>

              <div className="w-full space-y-4 mb-8 relative z-10">
                <div className="flex justify-between items-center border-b border-[#0D9488]/20 pb-2">
                  <span className="text-xs text-slate-500">Issued to</span>
                  <span className="text-sm font-bold text-white">Alex Rivera</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#0D9488]/20 pb-2">
                  <span className="text-xs text-slate-500">ID</span>
                  <span className="text-sm font-mono font-bold text-white tracking-wider">AILA-99234-XP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Status</span>
                  <span className="text-sm font-bold text-[#10B981]">Active / Verified</span>
                </div>
              </div>

              <button className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(13,148,136,0.2)] hover:shadow-[0_0_30px_rgba(13,148,136,0.4)] flex items-center justify-center gap-2 relative z-10 mb-4">
                <FileCode2 className="w-5 h-5 flex-shrink-0" />
                View Full Credentials
              </button>

              <p className="text-[10px] text-[#0D9488]/80 hover:text-[#0D9488] transition-colors cursor-pointer text-center relative z-10">
                Click to share to LinkedIn or Twitter
              </p>

            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-[10px] text-slate-600 font-medium shrink-0">
        © 2024 Sentinel. Part of the Enterprise Readiness Initiative.
      </footer>
    </div>
  );
}
