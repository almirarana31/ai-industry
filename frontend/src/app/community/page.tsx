'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Settings,
  Search,
  MessageSquare,
  ThumbsUp,
  Share2,
  Award,
  Hash,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col">

      {/* Internal Top Navbar */}
      <nav className="h-20 bg-[#16212B] border-b border-white/5 flex items-center justify-between px-8 shrink-0 sticky top-0 z-50">
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
                placeholder="Search discussions..."
                className="bg-[#1C2836] text-sm text-slate-300 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 w-64 border border-transparent focus:outline-none focus:border-[#00F0FF]/30 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/certifications" className="text-slate-400 hover:text-white transition-colors">Certifications</Link>
            <Link href="/academy" className="text-slate-400 hover:text-white transition-colors">Academy</Link>
            <Link href="/community" className="text-[#00F0FF] border-b-2 border-[#00F0FF] pb-6 pt-6 tracking-wide">Community</Link>
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

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 md:p-12 gap-10 flex flex-col lg:flex-row items-start">

        {/* Main Feed Column */}
        <div className="flex-1 w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-8">Team Discussions</h1>

          {/* New Post Input */}
          <div className="bg-[#16212B] rounded-2xl border border-white/5 p-6 mb-8 shadow-lg">
            <div className="flex gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shrink-0 border border-[#0F161E] flex items-center justify-center">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <textarea
                className="w-full bg-[#1C2836] border border-white/5 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/50 transition-colors resize-none h-24"
                placeholder="Share your thoughts, ask a question, or post an insight..."
              ></textarea>
            </div>
            <div className="flex items-center justify-between pl-14">
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Hash className="w-5 h-5" />
                </button>
              </div>
              <button className="bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold text-sm px-6 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                Post Update
              </button>
            </div>
          </div>

          {/* Feed Filter */}
          <div className="flex items-center gap-6 border-b border-white/5 mb-8">
            <button className="text-[#00F0FF] font-bold pb-4 border-b-2 border-[#00F0FF]">Top Recent</button>
            <button className="text-slate-400 hover:text-white font-medium pb-4 border-b-2 border-transparent transition-colors">Q&A Updates</button>
            <button className="text-slate-400 hover:text-white font-medium pb-4 border-b-2 border-transparent transition-colors">Announcements</button>
          </div>

          {/* Feed Posts */}
          <div className="flex flex-col gap-6">

            {/* Post 1: Certification Achievement */}
            <div className="bg-[#16212B] rounded-2xl border border-white/5 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden shrink-0"><img src="https://ui-avatars.com/api/?name=Sarah+Chen&background=1C2836&color=fff" alt="SC" /></div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Sarah Chen</h4>
                    <p className="text-xs text-slate-500">Security Engineering Lead • 2h ago</p>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg></button>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Just completed the rigorous <span className="text-[#00F0FF]">#GenerativeAISpecialist</span> module. The scenario involving PII redaction before vector database injection was incredibly eye-opening. Highly recommend it to the entire backend team!
              </p>

              {/* Embedded Certificate Mockup */}
              <div className="bg-[#121820] border border-white/5 rounded-xl p-4 flex items-center gap-4 mb-4 mt-2">
                <div className="w-12 h-12 bg-[#00F0FF]/10 rounded border border-[#00F0FF]/20 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#00F0FF] font-bold mb-1">New Certification Earned</p>
                  <p className="font-bold text-white text-sm">Generative AI Specialist</p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-sm text-slate-400">
                <button className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ThumbsUp className="w-4 h-4" /> 24</button>
                <button className="flex items-center gap-2 hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /> 3 Comments</button>
                <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto"><Share2 className="w-4 h-4" /> Share</button>
              </div>
            </div>

            {/* Post 2: Question */}
            <div className="bg-[#16212B] rounded-2xl border border-white/5 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden shrink-0"><img src="https://ui-avatars.com/api/?name=David+Kim&background=0D9488&color=fff" alt="DK" /></div>
                  <div>
                    <h4 className="font-bold text-white text-sm">David Kim</h4>
                    <p className="text-xs text-slate-500">Product Manager • 4h ago</p>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Has anyone successfully implemented the new <span className="text-emerald-400">#AIAct</span> Article 52 transparency guidelines in a customer-facing chatbot? Need examples of how the "system disclosure" UI should look without disrupting the chat flow.
              </p>
              <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-sm text-slate-400">
                <button className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ThumbsUp className="w-4 h-4" /> 8</button>
                <button className="flex items-center gap-2 hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /> 12 Comments</button>
                <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto"><Share2 className="w-4 h-4" /> Share</button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar Columns */}
        <div className="w-full lg:w-80 flex flex-col gap-8 shrink-0">

          {/* Trending Topics */}
          <div className="bg-[#16212B] rounded-2xl border border-white/5 p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Trending Topics
            </h3>
            <div className="flex flex-col gap-4">
              <Link href="#" className="group">
                <p className="text-sm text-slate-300 font-medium group-hover:text-[#00F0FF] transition-colors">#EUAIAct</p>
                <p className="text-xs text-slate-500">142 discussions this week</p>
              </Link>
              <Link href="#" className="group">
                <p className="text-sm text-slate-300 font-medium group-hover:text-[#00F0FF] transition-colors">#RAGImplementation</p>
                <p className="text-xs text-slate-500">89 discussions this week</p>
              </Link>
              <Link href="#" className="group">
                <p className="text-sm text-slate-300 font-medium group-hover:text-[#00F0FF] transition-colors">#DataPrivacy</p>
                <p className="text-xs text-slate-500">65 discussions this week</p>
              </Link>
            </div>
          </div>

          {/* Mini Top Performers Leaderboard */}
          <div className="bg-gradient-to-br from-[#1c2c3d] to-[#121c27] rounded-2xl border border-[#00F0FF]/20 p-6 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Weekly Recognition
            </h3>

            <div className="flex flex-col gap-4">

              <div className="flex items-center gap-3">
                <span className="text-[#00F0FF] font-bold text-sm w-4">1.</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs border border-amber-500/30">SC</div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium truncate">Sarah Chen</p>
                  <p className="text-[10px] text-slate-400">8,450 XP</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-bold text-sm w-4">2.</span>
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs">EL</div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium truncate">Ethan Lee</p>
                  <p className="text-[10px] text-slate-400">7,200 XP</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-bold text-sm w-4">3.</span>
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs">MR</div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium truncate">Maya R.</p>
                  <p className="text-[10px] text-slate-400">6,950 XP</p>
                </div>
              </div>

            </div>

            <Link href="/dashboard/leaderboard" className="block text-center mt-6 text-xs font-bold text-[#00F0FF] hover:underline underline-offset-4">
              View Full Leaderboard
            </Link>
          </div>

        </div>
      </main>

    </div>
  );
}
