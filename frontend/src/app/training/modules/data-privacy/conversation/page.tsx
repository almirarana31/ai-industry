'use client';

import React from 'react';
import Link from 'next/link';

export default function ConversationPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex transition-colors duration-300 bg-mesh">

      {/* Left Sidebar (Navigation) */}
      <aside className="w-72 glass-card border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 relative z-10">

        {/* Brand */}
        <div className="h-24 flex items-center px-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-icons-round text-white">bolt</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight">AI<span className="text-primary">CORE</span></span>
          </div>
        </div>

        {/* Modules Nav */}
        <div className="p-6 flex-1 overflow-y-auto no-scrollbar">
          <h3 className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase mb-6 px-2">TRAINING MODULES</h3>
          <nav className="space-y-2 mb-10">
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all font-bold text-sm">
              <span className="material-icons-round text-accent-success text-lg">check_circle</span>
              Fundamentals
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-extrabold text-sm border border-primary/20 shadow-sm shadow-primary/5">
              <span className="material-icons-round text-lg text-primary">forum</span>
              Ethical Usage
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all font-bold text-sm">
              <span className="material-icons-round text-slate-400 dark:text-slate-600 text-lg">shield</span>
              Data Governance
            </Link>
          </nav>

          <h3 className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase mb-6 px-2">ACTIVE SCENARIO</h3>
          <div className="glass-light border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase">Progress</span>
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">10/12</span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-primary w-[83%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]"></div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-ai flex items-center justify-center text-white shadow-lg shadow-ai/20 border-2 border-white dark:border-slate-800">
            <span className="font-extrabold text-sm">AC</span>
          </div>
          <div>
            <h4 className="font-extrabold text-sm leading-tight">Alex Chen</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Junior Analyst</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area (Chat) */}
      <main className="flex-1 flex flex-col min-w-0 bg-mesh overflow-hidden">

        {/* Header */}
        <header className="h-24 glass-card border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl glass-light border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <span className="material-icons-round text-slate-400 text-2xl">lock</span>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <h2 className="font-extrabold text-lg tracking-tight">Scenario 10: Private Data Handling</h2>
                <span className="bg-violation/10 text-violation text-[10px] font-black tracking-[0.2em] px-3 py-1 rounded-full uppercase border border-violation/20">HIGH STAKES</span>
              </div>
              <p className="text-xs text-slate-500 font-bold tracking-wide mt-1 uppercase">Interaction with Regional Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400 hover:text-primary">
              <span className="material-icons-round">settings</span>
            </button>
            <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400 hover:text-primary" onClick={() => document.documentElement.classList.toggle('dark')}>
              <span className="material-icons-round dark:hidden">dark_mode</span>
              <span className="material-icons-round hidden dark:block text-yellow-400">light_mode</span>
            </button>
          </div>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-10 flex flex-col items-center no-scrollbar">

          <div className="w-full max-w-4xl flex flex-col gap-8">

            {/* Timestamp */}
            <div className="flex justify-center mb-6">
              <div className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase bg-slate-100/50 dark:bg-slate-800/50 py-2 px-5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
                TUESDAY, OCT 24 • SIMULATION ACTIVE
              </div>
            </div>

            {/* Manager Message */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0 shadow-xl border-2 border-white dark:border-slate-800">
                <span className="material-icons-round text-white text-2xl">face</span>
              </div>
              <div className="flex flex-col gap-2 max-w-[85%]">
                <div className="flex justify-between items-baseline mb-1 px-2">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">Sarah Jenkins</span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">11:02 AM</span>
                </div>
                <div className="ai-message shadow-xl shadow-primary/5 space-y-4">
                  <p className="leading-relaxed text-sm font-medium">
                    Alex, we need to talk. I just got an alert from IT compliance.
                  </p>
                  <div className="bg-violation/5 border border-violation/20 rounded-xl p-4">
                    <p className="text-violation font-bold leading-relaxed text-sm">
                      I noticed you uploaded the Q4 customer retention spreadsheet directly to ChatGPT's public interface...
                    </p>
                  </div>
                  <p className="leading-relaxed text-sm font-medium">
                    Can you explain your reasoning for this? You know that data contains PII (Personally Identifiable Information).
                  </p>
                </div>
              </div>
            </div>

            {/* Context/Hint Alert */}
            <div className="flex items-start gap-4 glass-light border-primary/20 rounded-2xl p-5 ml-16 shadow-lg shadow-primary/5">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-icons-round text-white text-[14px]">info</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed font-medium">
                Your performance rating will be affected by your justification. Sarah values transparency but expects strict adherence to the new AI Governance Policy.
              </p>
            </div>

          </div>

        </div>

        {/* Chat Input Area */}
        <div className="p-10 pt-0 flex justify-center shrink-0">
          <div className="w-full max-w-4xl">

            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-4 px-2">
              <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-600 dark:text-slate-400 text-[10px] font-extrabold tracking-widest uppercase px-4 py-2 rounded-xl shadow-sm transition-all hover:-translate-y-0.5">
                <span className="material-icons-round text-primary text-sm">auto_awesome</span>
                Need a hint?
              </button>
              <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-600 dark:text-slate-400 text-[10px] font-extrabold tracking-widest uppercase px-4 py-2 rounded-xl shadow-sm transition-all hover:-translate-y-0.5">
                <span className="material-icons-round text-primary text-sm">description</span>
                Review Policy
              </button>
            </div>

            {/* Composer */}
            <div className="glass-card border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl focus-within:ring-4 ring-primary/10 transition-all overflow-hidden flex flex-col">

              <div className="h-12 border-b border-slate-100 dark:border-slate-800 flex items-center px-6 gap-6 text-slate-400">
                <button className="hover:text-primary transition-colors"><span className="material-icons-round text-lg">format_bold</span></button>
                <button className="hover:text-primary transition-colors"><span className="material-icons-round text-lg">format_italic</span></button>
                <button className="hover:text-primary transition-colors"><span className="material-icons-round text-lg">link</span></button>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
                <button className="hover:text-primary transition-colors"><span className="material-icons-round text-lg">alternate_email</span></button>
                <button className="hover:text-primary transition-colors"><span className="material-icons-round text-lg">sentiment_satisfied</span></button>
              </div>

              <textarea
                className="w-full bg-transparent p-6 min-h-[120px] text-sm font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none"
                placeholder="Type your response to Sarah Jenkins..."
              />

              <div className="p-4 px-6 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4 text-slate-400">
                  <button className="hover:text-primary transition-colors"><span className="material-icons-round text-xl">attach_file</span></button>
                  <button className="hover:text-primary transition-colors"><span className="material-icons-round text-xl">image</span></button>
                </div>

                <Link href="/training/modules/data-privacy/decision" className="btn-primary btn-md flex items-center gap-2 rounded-2xl group">
                  Send Response
                  <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">send</span>
                </Link>
              </div>
            </div>

            {/* Bottom system text */}
            <div className="mt-6 text-center">
              <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase opacity-60">
                ID: AI_LITERACY_SIM_V10 // SECURITY_LEVEL_SIGMA // ENCRYPTED_CHANNEL
              </span>
            </div>

          </div>
        </div>

      </main>

      {/* Right Sidebar (Stats & Consequences) */}
      <aside className="w-80 glass-card border-l border-slate-200 dark:border-slate-800 shrink-0 flex flex-col hidden 2xl:flex overflow-y-auto no-scrollbar">
        <div className="p-8">

          <h3 className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase mb-6 px-2">PLAYER METRICS</h3>
          <div className="grid grid-cols-1 gap-4 mb-10">
            <div className="glass-light border-primary/20 rounded-2xl p-5 flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase">Reputation</span>
                <span className="material-icons-round text-primary text-sm">trending_up</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">84%</span>
                <span className="text-[10px] font-bold text-accent-success">+2.4%</span>
              </div>
            </div>
            <div className="glass-light border-accent-success/20 rounded-2xl p-5 flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold text-accent-success tracking-widest uppercase">Compliance</span>
                <span className="material-icons-round text-accent-success text-sm">verified</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">GOLD</span>
                <span className="text-[10px] font-bold text-slate-500 tracking-wider">LEVEL 3</span>
              </div>
            </div>
          </div>

          <h3 className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase mb-6 px-2">ACTIVE CONSEQUENCES</h3>
          <div className="space-y-4 mb-10">

            <div className="glass-light border-violation/20 rounded-2xl p-4 flex items-start gap-4 shadow-sm relative overflow-hidden group hover:bg-violation/5 transition-colors transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-violation"></div>
              <span className="material-icons-round text-violation text-lg shrink-0 mt-0.5">report_problem</span>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">
                Potential <span className="text-violation">Data Leak Investigation</span> initiated by IT Sec
              </p>
            </div>

            <div className="glass-light border-accent-warning/20 rounded-2xl p-4 flex items-start gap-4 shadow-sm relative overflow-hidden group hover:bg-accent-warning/5 transition-colors transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent-warning"></div>
              <span className="material-icons-round text-accent-warning text-lg shrink-0 mt-0.5">psychology</span>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">
                Manager skepticism increasing. Justification required.
              </p>
            </div>

          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800 mb-8 w-full"></div>

          {/* Monitor status */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-accent-success animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-slate-600 dark:text-slate-400 uppercase">SENTINEL MONITOR ACTIVE</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-500 italic leading-relaxed font-medium">
              "This interaction is being monitored and analyzed for AI literacy assessment and corporate compliance auditing."
            </p>
          </div>

        </div>
      </aside>

    </div>
  );
}

