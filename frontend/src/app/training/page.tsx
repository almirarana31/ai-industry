'use client';

import React from 'react';
import Link from 'next/link';

export default function ModuleSelectionPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex flex-col bg-mesh">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center glass-card border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-icons-round">bolt</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight">AI<span className="text-primary">CORE</span></span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-accent-warning text-sm">stars</span>
              <span className="text-sm font-bold font-mono">2,450 XP</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-primary text-sm">workspace_premium</span>
              <span className="text-sm font-bold font-mono">Rank 12</span>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" onClick={() => document.documentElement.classList.toggle('dark')}>
            <span className="material-icons-round dark:hidden">dark_mode</span>
            <span className="material-icons-round hidden dark:block text-yellow-400">light_mode</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-primary overflow-hidden">
            <span className="text-2xl flex items-center justify-center h-full">👨‍💻</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-primary font-bold text-sm tracking-widest uppercase mb-2">
            <span className="material-icons-round text-lg">explore</span>
            Learning Path
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Level 1: AI Foundations</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg leading-relaxed">
            Master the core concepts of artificial intelligence. Complete modules to unlock advanced governance and ethics training.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Module 1: Completed */}
          <div className="group relative glass-card rounded-2xl p-8 border-2 border-accent-success/30 glow-green transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-accent-success/20 text-accent-success text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 tracking-widest uppercase">
                <span className="material-icons-round text-[14px]">check_circle</span> COMPLETED
              </span>
            </div>
            <div className="w-16 h-16 bg-accent-success/10 rounded-2xl flex items-center justify-center text-accent-success mb-6 group-hover:scale-110 transition-transform">
              <span className="material-icons-round text-4xl">smart_toy</span>
            </div>
            <h3 className="text-2xl font-extrabold mb-2">Prompt Engineering</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">Learn the art of crafting high-performance prompts for LLMs.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-mono font-bold text-accent-success tracking-widest">PROGRESS</span>
                <span className="text-xs font-mono font-bold">100%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-accent-success h-full w-full"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 text-slate-400">
                  <span className="material-icons-round text-sm">schedule</span>
                  <span className="text-xs font-bold">45m</span>
                </div>
                <span className="font-mono text-sm font-bold text-accent-success">+500 XP</span>
              </div>
            </div>
          </div>

          {/* Module 2: In Progress */}
          <Link href="/training/modules/data-privacy/briefing" className="group relative glass-card rounded-2xl p-8 border-2 border-accent-info/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden ring-1 ring-accent-info/50 ring-offset-4 dark:ring-offset-background-dark pulse-blue">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-accent-info/20 text-accent-info text-[10px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase">IN PROGRESS</span>
            </div>
            <div className="w-16 h-16 bg-accent-info/10 rounded-2xl flex items-center justify-center text-accent-info mb-6 group-hover:scale-110 transition-transform">
              <span className="material-icons-round text-4xl">shield</span>
            </div>
            <h3 className="text-2xl font-extrabold mb-2">Data Privacy</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">Securing enterprise data while leveraging cloud AI services.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-mono font-bold text-accent-info tracking-widest">PROGRESS</span>
                <span className="text-xs font-mono font-bold">60%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-accent-info h-full w-[60%]"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 text-slate-400">
                  <span className="material-icons-round text-sm">schedule</span>
                  <span className="text-xs font-bold">1h 20m</span>
                </div>
                <span className="font-mono text-sm font-bold text-accent-info">+750 XP</span>
              </div>
            </div>
          </Link>

          {/* Module 3: Locked */}
          <div className="group relative glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 locked-overlay flex items-center justify-center z-10">
              <div className="bg-slate-800 text-white p-3 rounded-full shadow-xl">
                <span className="material-icons-round">lock</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
              <span className="material-icons-round text-4xl">balance</span>
            </div>
            <h3 className="text-2xl font-extrabold mb-2 text-slate-400 dark:text-slate-500">Bias & Ethics</h3>
            <p className="text-slate-400 dark:text-slate-600 mb-6 text-sm leading-relaxed">Understanding algorithmic fairness and societal impacts.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">LOCKED</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-300 dark:bg-slate-700 h-full w-0"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 italic">Unlocks at Level 5</span>
                <span className="font-mono text-sm font-bold text-slate-400">+1,200 XP</span>
              </div>
            </div>
          </div>

          {/* Module 4: Locked (IP) */}
          <div className="group relative glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 locked-overlay flex items-center justify-center z-10">
              <div className="bg-slate-800 text-white p-3 rounded-full shadow-xl">
                <span className="material-icons-round">lock</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
              <span className="material-icons-round text-4xl">copyright</span>
            </div>
            <h3 className="text-2xl font-extrabold mb-2 text-slate-400 dark:text-slate-500">IP & Content</h3>
            <p className="text-slate-400 dark:text-slate-600 mb-6 text-sm leading-relaxed">Navigating intellectual property rights in generative AI.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">LOCKED</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-300 dark:bg-slate-700 h-full w-0"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 italic">Complete Data Privacy to unlock</span>
                <span className="font-mono text-sm font-bold text-slate-400">+600 XP</span>
              </div>
            </div>
          </div>

          {/* Module 5: Locked (Governance) */}
          <div className="group relative glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 locked-overlay flex items-center justify-center z-10">
              <div className="bg-slate-800 text-white p-3 rounded-full shadow-xl">
                <span className="material-icons-round">lock</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
              <span className="material-icons-round text-4xl">account_tree</span>
            </div>
            <h3 className="text-2xl font-extrabold mb-2 text-slate-400 dark:text-slate-500">Governance</h3>
            <p className="text-slate-400 dark:text-slate-600 mb-6 text-sm leading-relaxed">Establishing frameworks for responsible AI deployment.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">LOCKED</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-300 dark:bg-slate-700 h-full w-0"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 italic">Level 10 required</span>
                <span className="font-mono text-sm font-bold text-slate-400">+1,500 XP</span>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 group hover:border-primary/50 transition-colors">
            <span className="material-icons-round text-5xl mb-4 group-hover:text-primary transition-colors">add_circle_outline</span>
            <p className="font-bold text-center">New Content Coming Soon</p>
            <p className="text-[10px] font-bold tracking-widest uppercase mt-1">AI LITERACY ACADEMY</p>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500 font-medium">
            © 2026 AI CORE. Enterprise-grade training solutions.
          </div>
          <div className="flex gap-6">
            <Link className="text-sm font-bold hover:text-primary transition-colors" href="#">Help Center</Link>
            <Link className="text-sm font-bold hover:text-primary transition-colors" href="#">API Docs</Link>
            <Link className="text-sm font-bold hover:text-primary transition-colors" href="#">Contact Support</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

lassName="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="font-bold text-lg text-slate-500 mb-1">New Content Coming Soon</h3>
            <p className="text-xs text-slate-400 font-medium">Variant 3 of 12</p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1280px] mx-auto px-6 py-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
        <p className="text-sm text-slate-500 font-medium">
          © 2025 AI Literacy Platform. All training modules are bonafide enterprise-grade content.
        </p>
        <div className="flex gap-6 text-sm font-bold text-slate-700">
          <Link href="#" className="hover:text-slate-900 transition-colors">Help Center</Link>
          <Link href="#" className="hover:text-slate-900 transition-colors">API Docs</Link>
          <Link href="#" className="hover:text-slate-900 transition-colors">Contact Support</Link>
        </div>
      </footer>
    </div>
  );
}
