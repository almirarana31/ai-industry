'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe,
  Users,
  History,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  UserMinus,
  Settings,
  Bell,
  Search,
  Rocket,
  BrainCircuit,
  Award
} from 'lucide-react';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#111822] text-slate-100 font-sans flex flex-col">

      {/* Top Application Navbar */}
      <nav className="h-20 bg-[#0F151E] border-b border-white/5 flex items-center justify-between px-8 shrink-0 relative z-20">
        <div className="flex items-center gap-12">
          <Link href="/training" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-[#14B8A6] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform">
              <div className="w-4 h-4 border-2 border-[#0F151E] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Sentinel Training</span>
          </Link>

          {/* Global Search */}
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14B8A6]/60 group-focus-within:text-[#14B8A6]" />
            <input
              type="text"
              placeholder="Search rankings..."
              className="bg-[#18232D] text-sm text-slate-300 placeholder-[#14B8A6]/40 rounded-lg pl-10 pr-4 py-2.5 w-64 border border-[#14B8A6]/10 focus:outline-none focus:border-[#14B8A6]/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/training" className="text-slate-400 hover:text-white transition-colors">Training</Link>
            <Link href="/dashboard/leaderboard" className="text-[#14B8A6] border-b-2 border-[#14B8A6] pb-6 pt-6">Leaderboard</Link>
            <Link href="/reports" className="text-slate-400 hover:text-white transition-colors">Reports</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-[#14B8A6] transition-colors relative">
              <Bell className="w-5 h-5 fill-current opacity-80" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F151E]"></div>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-[#14B8A6] transition-colors">
              <Settings className="w-5 h-5 fill-current opacity-80" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-[#0F151E] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-orange-800 font-bold text-sm">AR</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">

          {/* Left Column: Leaderboard List */}
          <div className="flex-[2] flex flex-col gap-8 min-w-0">

            {/* Header Area */}
            <div>
              <div className="flex items-center gap-2 text-[#14B8A6] text-[10px] font-black tracking-widest uppercase mb-4">
                <ShieldCheck className="w-4 h-4" />
                SEASON 4 • WEEK 12
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-sm">
                Weekly Training Leaderboard
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                Compete with your peers to master AI security and compliance. Variant 11 of 12.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-white/10 mt-2">
              <button className="flex items-center gap-2 text-[#14B8A6] border-b-2 border-[#14B8A6] pb-4 text-sm font-bold">
                <Globe className="w-4 h-4" />
                Global Rankings
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-white pb-4 text-sm font-bold transition-colors">
                <Users className="w-4 h-4" />
                Internal Teams
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-white pb-4 text-sm font-bold transition-colors">
                <History className="w-4 h-4" />
                Past Winners
              </button>
            </div>

            {/* Ranking Table */}
            <div className="bg-[#151E28] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left whitespace-nowrap">

                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-bold tracking-widest text-[#14B8A6] uppercase bg-white/5">
                    <th className="px-8 py-5">Rank</th>
                    <th className="px-8 py-5">Team / Division</th>
                    <th className="px-8 py-5 text-right">XP Earned</th>
                    <th className="px-8 py-5 text-right">Compliance</th>
                  </tr>
                </thead>

                <tbody className="text-sm font-medium">

                  {/* Rank 1 */}
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-[#FCD34D] drop-shadow-[0_0_10px_rgba(252,211,77,0.4)]">01</span>
                        <Award className="w-5 h-5 text-[#FCD34D]" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-[#14B8A6]/20 text-[#14B8A6] font-bold text-xs flex items-center justify-center">CS</div>
                        <span className="text-white text-base">Cyber Sentinels</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="bg-[#14B8A6]/10 text-[#14B8A6] font-mono px-3 py-1.5 rounded-full text-xs border border-[#14B8A6]/20">12,450 XP</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#14B8A6] w-[98%]"></div>
                        </div>
                        <span className="font-bold text-white w-6 text-right">98</span>
                      </div>
                    </td>
                  </tr>

                  {/* Rank 2 */}
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.2)]">02</span>
                        <Award className="w-5 h-5 text-slate-300" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-[#14B8A6]/10 text-slate-300 font-bold text-xs flex items-center justify-center border border-white/5">DD</div>
                        <span className="text-white text-base">Data Defenders</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="bg-[#14B8A6]/10 text-[#14B8A6] font-mono px-3 py-1.5 rounded-full text-xs border border-[#14B8A6]/20">11,800 XP</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#14B8A6] w-[95%]"></div>
                        </div>
                        <span className="font-bold text-white w-6 text-right">95</span>
                      </div>
                    </td>
                  </tr>

                  {/* Rank 3 */}
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-[#D97706] drop-shadow-[0_0_10px_rgba(217,119,6,0.3)]">03</span>
                        <Award className="w-5 h-5 text-[#D97706]" />
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-[#14B8A6]/10 text-slate-300 font-bold text-xs flex items-center justify-center border border-white/5">PP</div>
                        <span className="text-white text-base">Privacy Pilots</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="bg-[#14B8A6]/10 text-[#14B8A6] font-mono px-3 py-1.5 rounded-full text-xs border border-[#14B8A6]/20">10,200 XP</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#14B8A6] w-[92%]"></div>
                        </div>
                        <span className="font-bold text-white w-6 text-right">92</span>
                      </div>
                    </td>
                  </tr>

                  {/* Rank 4 */}
                  <tr className="hover:bg-white/5 transition-colors group opacity-60 hover:opacity-100">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-slate-500">04</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-white/5">RR</div>
                        <span className="text-white text-base">Risk Reducers</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="bg-[#14B8A6]/10 text-[#14B8A6] font-mono px-3 py-1.5 rounded-full text-xs border border-[#14B8A6]/20">9,950 XP</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#14B8A6] opacity-70 w-[89%]"></div>
                        </div>
                        <span className="font-bold text-white w-6 text-right">89</span>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>

              <div className="p-4 border-t border-white/5 text-center">
                <button className="text-xs font-bold tracking-widest uppercase text-[#14B8A6] hover:text-[#0D9488] transition-colors">View All 124 Teams</button>
              </div>
            </div>

            {/* Featured Achievements */}
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5 text-[#14B8A6]" />
                <h3 className="text-xl font-bold text-white tracking-wide">Featured Achievements</h3>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">

                <div className="min-w-[280px] bg-[#151E28] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:border-[#14B8A6]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#14B8A6]/10 flex items-center justify-center shrink-0 border border-[#14B8A6]/20">
                    <BrainCircuit className="w-6 h-6 text-[#14B8A6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1">Compliance Guru</h4>
                    <p className="text-[10px] text-[#14B8A6] font-mono">Rare Badge • 0.5% Earned</p>
                  </div>
                </div>

                <div className="min-w-[280px] bg-[#151E28] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:border-[#14B8A6]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#14B8A6]/10 flex items-center justify-center shrink-0 border border-[#14B8A6]/20">
                    <ShieldCheck className="w-6 h-6 text-[#14B8A6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1">Security Spartan</h4>
                    <p className="text-[10px] text-[#14B8A6] font-mono">Uncommon • 12% Earned</p>
                  </div>
                </div>

                <div className="min-w-[280px] bg-[#151E28] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:border-[#14B8A6]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#14B8A6]/10 flex items-center justify-center shrink-0 border border-[#14B8A6]/20">
                    <Rocket className="w-6 h-6 text-[#14B8A6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1">AI Pioneer</h4>
                    <p className="text-[10px] text-[#14B8A6] font-mono">Rare • 2% Earned</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Widgets */}
          <div className="w-full xl:w-[380px] flex flex-col gap-6 shrink-0">

            {/* Personal Status Widget */}
            <div className="bg-[#151E28] border border-[#14B8A6]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(20,184,166,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8A6] opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity"></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <p className="text-[10px] font-bold tracking-widest text-[#14B8A6] uppercase">PERSONAL STATUS</p>
                <span className="bg-[#14B8A6]/10 text-[#14B8A6] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#14B8A6]/20">TOP 15%</span>
              </div>

              <h2 className="text-3xl font-black text-white tracking-tight mb-8 relative z-10">Rank #14</h2>

              <div className="mb-6 relative z-10">
                <div className="flex justify-between text-[10px] font-medium text-slate-400 mb-2">
                  <span>Progress to Rank #13</span>
                  <span className="text-[#14B8A6] font-mono">450 XP needed</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#14B8A6] w-[75%] shadow-[0_0_10px_rgba(20,184,166,0.8)]"></div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 mb-6 relative z-10">
                <ArrowUpRight className="w-5 h-5 text-[#14B8A6] shrink-0" />
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  You've climbed <span className="text-[#14B8A6] font-bold">4 positions</span> since last week. Keep it up!
                </p>
              </div>

              <button className="w-full bg-[#109081] hover:bg-[#0D7A6D] text-white font-bold text-sm py-4 rounded-xl transition-colors shadow-lg shadow-[#14B8A6]/20 flex items-center justify-center gap-2 relative z-10">
                View Detailed Progress
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Team Analytics Widget */}
            <div className="bg-[#151E28] border border-white/5 rounded-2xl p-6 shadow-xl flex-1 flex flex-col">

              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#14B8A6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">Team Analytics</h3>
              </div>

              <div className="space-y-6 mb-8 flex-1">

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Compliance Score</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-black text-white">87/100</span>
                      <span className="text-[10px] font-bold text-[#10B981]">+2.4%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Modules Completed</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-black text-white">42/48</span>
                      <span className="text-[10px] font-bold text-[#3B82F6]">88%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <UserMinus className="w-5 h-5 text-[#14B8A6]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Incidents Prevented</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-black text-white">156</span>
                      <span className="text-[8px] tracking-widest font-bold bg-[#14B8A6]/10 text-[#14B8A6] px-2 py-0.5 rounded border border-[#14B8A6]/20">ELITE</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Tiny Graph */}
              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] font-medium text-slate-500 mb-4">Risk Exposure Over Time</p>
                <div className="flex items-end gap-1.5 h-16 w-full opacity-80">
                  {[40, 60, 45, 80, 50, 65, 90, 75, 40].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-[#0F766E] to-[#14B8A6] rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
}

// Helper icons
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
  );
}
