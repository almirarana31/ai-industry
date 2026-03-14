'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Settings,
  Search,
  BookOpen,
  Filter,
  PlayCircle,
  Clock,
  Award,
  Lock,
  Star
} from 'lucide-react';

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col">

      {/* Internal Top Navbar (Reused from Certs/Dashboard) */}
      <nav className="h-20 bg-[#16212B] border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-12">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-[#0D9488] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform">
              <div className="w-4 h-4 border-2 border-[#16212B] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Sentinel <span className="font-light opacity-80">Training</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium pl-8 border-l border-white/5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search modules..."
                className="bg-[#1C2836] text-sm text-slate-300 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 w-64 border border-transparent focus:outline-none focus:border-[#00F0FF]/30 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/certifications" className="text-slate-400 hover:text-white transition-colors">Certifications</Link>
            <Link href="/academy" className="text-[#00F0FF] border-b-2 border-[#00F0FF] pb-6 pt-6 tracking-wide">Academy</Link>
            <Link href="/community" className="text-slate-400 hover:text-white transition-colors">Community</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/settings/profile" className="w-9 h-9 rounded-full bg-[#1C2836] flex items-center justify-center hover:bg-white/10 transition-colors">
            <Bell className="w-4 h-4 text-[#00F0FF]" />
          </Link>
          <Link href="/settings/profile" className="w-9 h-9 rounded-full bg-[#1C2836] flex items-center justify-center hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4 text-[#00F0FF]" />
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-[#16212B] flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
            <span className="text-white font-bold text-sm tracking-tighter">AR</span>
          </div>
        </div>
      </nav>

      {/* Main Layout: Sidebar & Grid */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Filter Sidebar */}
        <aside className="w-64 bg-[#16212B] border-r border-white/5 flex flex-col overflow-y-auto hidden md:flex">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#00F0FF]" /> Catalog Filters
            </h2>
          </div>

          <div className="p-6 flex flex-col gap-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">By Category</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 text-sm text-slate-300 hover:text-white cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[#00F0FF] flex items-center justify-center bg-[#00F0FF] border-[#00F0FF]">
                    <svg className="w-3 h-3 text-[#0F161E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Data Privacy & Security
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-300 hover:text-white cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[#00F0FF]"></div>
                  Generative AI Models
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-300 hover:text-white cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[#00F0FF]"></div>
                  AI Ethics & Governance
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-300 hover:text-white cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[#00F0FF]"></div>
                  Business Strategy
                </label>
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Proficiency Level</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 text-sm text-slate-300 hover:text-white cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[#00F0FF] flex items-center justify-center bg-[#00F0FF] border-[#00F0FF]">
                    <svg className="w-3 h-3 text-[#0F161E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  Foundation (L1)
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-300 hover:text-white cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[#00F0FF]"></div>
                  Advanced (L2)
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-300 hover:text-white cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[#00F0FF]"></div>
                  Expert (L3)
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full p-8 md:p-12">

          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Training Academy</h1>
                <p className="text-slate-400">Master enterprise AI protocols through interactive simulations.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-500">Sort by:</span>
                <select className="bg-[#1C2836] border border-white/5 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-[#00F0FF]/50 cursor-pointer">
                  <option>Recommended</option>
                  <option>Newest</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Active Course Card (Clickable to /training module) */}
              <Link href="/training" className="bg-[#16212B] rounded-2xl border border-[#00F0FF]/30 overflow-hidden shadow-xl group transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,240,255,0.1)] flex flex-col">
                <div className="h-40 bg-gradient-to-br from-[#12222b] to-[#12222b] relative p-6 flex items-start justify-between overflow-hidden">
                  <span className="bg-[#00F0FF] text-[#0F161E] text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-md z-10 relative">In Progress</span>
                  <div className="w-32 h-32 absolute opacity-30 -right-4 -bottom-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00F0FF] to-transparent mix-blend-screen"></div>
                  <BookOpen className="w-12 h-12 text-[#00F0FF] opacity-50 relative z-10" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">Data Privacy & Security Protocols</h3>
                  <p className="text-xs text-slate-400 mb-6 flex-1">Learn to handle PII and navigate compliance scenarios involving corporate data and large language models.</p>

                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-400 font-medium">Completion</span>
                      <span className="text-[#00F0FF] font-bold">45%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1C2836] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00F0FF] w-[45%]"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" /> 45 mins left
                    </div>
                    <button className="flex items-center gap-1.5 bg-[#1C2836] group-hover:bg-[#00F0FF] group-hover:text-[#0F161E] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                      Resume <PlayCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Link>

              {/* Not Started Course Card */}
              <div className="bg-[#16212B] rounded-2xl border border-white/5 overflow-hidden shadow-xl hover:border-white/20 transition-all flex flex-col group cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-[#1f302b] to-[#111c18] relative p-6 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start z-10 relative">
                    <span className="bg-slate-700 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded z-10">Not Started</span>
                    <div className="flex gap-1 text-yellow-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 text-slate-600" />
                    </div>
                  </div>
                  <Award className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500/20" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">AI Ethics & Governance Frameworks</h3>
                  <p className="text-xs text-slate-400 mb-6 flex-1">Understand bias mitigation, transparency, and aligning AI systems with corporate values.</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-[#1C2836] text-slate-300 text-[10px] px-2 py-1 rounded font-medium">Ethics</span>
                    <span className="bg-[#1C2836] text-slate-300 text-[10px] px-2 py-1 rounded font-medium">Level 1</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" /> 2.5 hours total
                    </div>
                    <button className="flex items-center gap-1.5 bg-[#1C2836] group-hover:bg-white text-white group-hover:text-[#0F161E] text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                      Start <PlayCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Locked Course Card */}
              <div className="bg-[#121820] rounded-2xl border border-white/5 overflow-hidden shadow-xl relative opacity-80 flex flex-col">
                <div className="absolute inset-0 bg-black/40 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[1px]">
                  <div className="w-12 h-12 rounded-full bg-[#1C2836] flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5 text-slate-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-300 mb-1">Prerequisite Required</h3>
                  <p className="text-xs text-slate-500">Complete "Data Privacy & Security" to unlock.</p>
                </div>

                <div className="h-40 bg-[#16212B] relative p-6"></div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-500 mb-2 leading-tight blur-[2px]">Advanced LLM Integration</h3>
                  <p className="text-xs text-slate-600 mb-6 flex-1 blur-[2px]">Technical deep dive into vector databases and setting up RAG pipelines securely.</p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
