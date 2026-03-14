'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 bg-mesh">

      {/* Internal Top Navbar */}
      <nav className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center glass-card border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="material-icons-round">bolt</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">AI<span className="text-primary">CORE</span></span>
          </Link>

          {/* Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold tracking-wide border-l border-slate-200 dark:border-slate-800 pl-8">
            <Link href="/dashboard" className="text-primary">Dashboard</Link>
            <Link href="/certifications" className="text-slate-500 hover:text-primary transition-colors">Certifications</Link>
            <Link href="/academy" className="text-slate-500 hover:text-primary transition-colors">Academy</Link>
            <Link href="/community" className="text-slate-500 hover:text-primary transition-colors">Community</Link>
            <Link href="/reports" className="text-slate-500 hover:text-primary transition-colors">Reports</Link>
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-accent-warning text-sm">stars</span>
              <span className="text-sm font-bold font-mono">12,450 XP</span>
            </div>
          </div>
          <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400" onClick={() => document.documentElement.classList.toggle('dark')}>
            <span className="material-icons-round dark:hidden">dark_mode</span>
            <span className="material-icons-round hidden dark:block text-yellow-400">light_mode</span>
          </button>
          <Link href="/settings/profile" className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-primary overflow-hidden flex items-center justify-center shadow-lg shadow-primary/10">
            <span className="text-2xl">👨‍💻</span>
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full overflow-hidden">

        {/* Left Main Area */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar">

          {/* Welcome Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 text-primary font-extrabold text-[10px] tracking-[0.2em] uppercase mb-3">
                <span className="material-icons-round text-lg">explore</span>
                MISSION CONTROL
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">Welcome Back, Agent.</h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">Your overall AI literacy is <span className="text-primary font-extrabold underline decoration-primary/30 underline-offset-4">64%</span> complete.</p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8 glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 dark:text-slate-500 font-extrabold uppercase tracking-[0.2em] mb-1">Total XP</span>
                <span className="text-2xl font-extrabold flex items-center gap-2"><span className="material-icons-round text-primary">trending_up</span> 12.4k</span>
              </div>
              <div className="w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 dark:text-slate-500 font-extrabold uppercase tracking-[0.2em] mb-1">Compliance</span>
                <span className="text-2xl font-extrabold text-accent-success">88%</span>
              </div>
            </div>
          </div>

          {/* Missions Tabs */}
          <div className="flex items-center gap-10 border-b border-slate-200 dark:border-slate-800 mb-10">
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-5 text-[10px] font-extrabold tracking-[0.2em] uppercase transition-all ${activeTab === 'active' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
              Active Missions
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-5 text-[10px] font-extrabold tracking-[0.2em] uppercase transition-all ${activeTab === 'completed' ? 'text-accent-success border-b-2 border-accent-success' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
              Completed
            </button>
          </div>

          {/* Tab Content: Active Missions */}
          {activeTab === 'active' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Active Mission 1 */}
              <div className="group relative glass-card rounded-3xl p-8 border-2 border-primary/20 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-primary/5 overflow-hidden">
                <div className="absolute top-0 right-0 p-5">
                  <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-4 py-1.5 rounded-full tracking-widest uppercase border border-primary/20">In Progress</span>
                </div>

                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-icons-round text-4xl">smart_toy</span>
                  </div>
                  {/* Progress Ring Alternative */}
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-extrabold text-primary">45%</span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Mastery</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold mb-3 tracking-tight">Prompt Engineering</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm leading-relaxed max-w-md font-medium">
                  Learn advanced zero-shot and few-shot prompting techniques for production. Defend against prompt injection attacks.
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link href="/training/modules/data-privacy/briefing" className="btn-primary btn-md flex items-center gap-2 group/btn rounded-2xl">
                    RESUME MISSION <span className="material-icons-round group-hover:translate-x-1 transition-transform">play_circle</span>
                  </Link>
                  <span className="text-slate-500 font-extrabold text-[10px] uppercase tracking-[0.2em]">+850 XP</span>
                </div>
              </div>

              {/* Active Mission 2 */}
              <div className="group relative glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 shadow-sm overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-ai/10 flex items-center justify-center text-ai group-hover:scale-110 transition-transform">
                    <span className="material-icons-round text-4xl">account_tree</span>
                  </div>
                  <div className="flex flex-col items-end opacity-40">
                    <span className="text-3xl font-extrabold">0%</span>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Mastery</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold mb-3 tracking-tight">Governance Frameworks</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm leading-relaxed max-w-md font-medium">
                  Establishing robust governance for enterprise-wide AI deployment. Align with EU AI Act and NIST requirements.
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link href="/training/modules/data-privacy/briefing" className="btn-secondary btn-md flex items-center gap-2 group/btn rounded-2xl">
                    START MISSION <span className="material-icons-round group-hover:translate-x-1 transition-transform">play_circle</span>
                  </Link>
                  <span className="text-slate-500 font-extrabold text-[10px] uppercase tracking-[0.2em]">+1.2k XP</span>
                </div>
              </div>

            </div>
          )}

          {/* Tab Content: Completed Missions */}
          {activeTab === 'completed' && (
            <div className="flex flex-col gap-6">

              <div className="glass-card border-accent-success/20 rounded-3xl p-8 flex items-center justify-between shadow-lg shadow-accent-success/5 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent-success/10 flex items-center justify-center text-accent-success border border-accent-success/20">
                    <span className="material-icons-round text-4xl">verified_user</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight mb-2">Corporate AI Compliance</h3>
                    <p className="text-sm text-slate-500 font-medium">Mandatory annual certification on internal AI usage policies and data handling.</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="bg-accent-success/20 text-accent-success text-[10px] font-extrabold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase flex items-center gap-2">
                    <span className="material-icons-round text-sm">stars</span> Certified
                  </span>
                  <Link href="/certifications" className="text-xs font-bold text-slate-400 hover:text-primary underline underline-offset-4 decoration-primary/20 transition-all">View Certificate</Link>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8 flex items-center gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all border border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <span className="material-icons-round text-3xl">psychology</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold tracking-tight mb-2">Neural Architecture Foundations</h3>
                  <p className="text-sm text-slate-500 font-medium">Master the basics of Transformer models and attention mechanisms.</p>
                </div>
                <div className="text-slate-400 font-extrabold text-[10px] uppercase tracking-[0.2em] border-l border-slate-200 dark:border-slate-800 pl-10">
                  +500 XP Earned
                </div>
              </div>

            </div>
          )}

        </main>

        {/* Right Sidebar */}
        <aside className="w-96 glass-card border-l border-slate-200 dark:border-slate-800 p-10 flex flex-col gap-10 overflow-y-auto shrink-0 hidden 2xl:flex no-scrollbar">

          {/* Daily Challenge */}
          <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full group-hover:bg-primary/20 transition-all"></div>

            <div className="mb-8 relative z-10">
              <span className="text-[10px] font-extrabold text-primary tracking-[0.2em] uppercase mb-2 block">Daily Challenge</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 leading-tight tracking-tight">Fix the Hallucination</h3>
            </div>

            <div className="glass-light border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-8 relative z-10 shadow-sm">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                &gt; The model confidently stated incorrect financial data. Implement a fact-checking pipeline.
              </p>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Expires in</span>
                <span className="text-slate-900 dark:text-white text-xl font-mono font-bold tracking-tight">04:22:15</span>
              </div>
              <Link href="/academy" className="btn-primary btn-sm rounded-xl px-5 py-3 text-[10px] uppercase tracking-widest font-extrabold">
                ATTEMPT +500 XP
              </Link>
            </div>
          </div>

          {/* Top Operatives */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="font-extrabold text-lg tracking-tight flex items-center gap-3">
                <span className="material-icons-round text-primary">emoji_events</span> Top Operatives
              </h3>
              <Link href="/community" className="text-[10px] font-extrabold tracking-widest uppercase text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all">Full Board</Link>
            </div>

            <div className="flex flex-col gap-4">
              {/* Rank 1 */}
              <div className="flex items-center justify-between p-4 glass-light border border-primary/20 rounded-2xl shadow-lg shadow-primary/5">
                <div className="flex items-center gap-4">
                  <span className="text-primary font-black text-sm w-4 text-center">1</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-md border-2 border-white dark:border-slate-800">SC</div>
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">Sarah Jenkins</span>
                </div>
                <span className="text-sm font-black text-primary">15,400</span>
              </div>

              {/* Rank 2 */}
              <div className="flex items-center justify-between p-4 glass-light border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 font-bold text-sm w-4 text-center">2</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">AM</div>
                  <span className="font-bold text-sm text-slate-600 dark:text-slate-400 tracking-tight">Artur M.</span>
                </div>
                <span className="text-sm font-bold text-slate-400">14,820</span>
              </div>

              {/* Rank 3 */}
              <div className="flex items-center justify-between p-4 glass-light border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 font-bold text-sm w-4 text-center">3</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">EM</div>
                  <span className="font-bold text-sm text-slate-600 dark:text-slate-400 tracking-tight">Elena M.</span>
                </div>
                <span className="text-sm font-bold text-slate-400">13,900</span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}

<div className="flex items-center gap-3 text-sm font-bold">
                  <span className="text-slate-500 w-4 text-center">3</span>
                  <div className="w-6 h-6 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center text-[10px] text-white">EM</div>
                  <span className="text-slate-300">Elena M.</span>
                </div>
                <span className="text-sm font-bold text-slate-400">13,900</span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
