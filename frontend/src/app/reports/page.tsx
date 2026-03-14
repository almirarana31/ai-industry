'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  AlertTriangle,
  FileBarChart,
  BookOpen,
  Settings,
  Download,
  Bell,
  MessageSquare,
  Sparkles,
  Search,
  Map,
  Medal,
  Award
} from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-[#0F161E] text-slate-200 font-sans overflow-hidden">

      {/* Left Sidebar */}
      <aside className="w-64 bg-[#131D26] border-r border-[#00F0FF]/10 flex flex-col justify-between shrink-0">

        <div>
          {/* Logo Area */}
          <div className="h-24 px-6 flex items-center gap-3 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <div>
              <h1 className="font-bold text-white leading-tight">Enterprise<br />Compliance</h1>
              <p className="text-[10px] text-[#00F0FF] font-medium tracking-wide">Sentinel Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex flex-col gap-1.5 overflow-y-auto">
            <Link href="/reports" className="flex items-center gap-3 px-4 py-3 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 rounded-xl font-bold text-sm transition-colors">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <Users className="w-5 h-5" /> Team Progress
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <AlertTriangle className="w-5 h-5" /> Risk Analysis
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <FileBarChart className="w-5 h-5" /> Compliance Gaps
            </Link>
            <Link href="/training" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <BookOpen className="w-5 h-5" /> Training Modules
            </Link>
            <Link href="/settings/profile" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <Settings className="w-5 h-5" /> Settings
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-white/5">
          <button className="w-full flex items-center justify-center gap-2 bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold text-sm py-3 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-transform hover:-translate-y-1">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0A1016]">

        {/* Top Header */}
        <header className="h-20 bg-[#131D26] border-b border-white/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-8">
            <h2 className="font-bold text-lg text-white">Compliance Analytics</h2>

            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search departments..."
                className="bg-[#1C2836] text-sm text-slate-300 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 w-72 border border-transparent focus:outline-none focus:border-[#00F0FF]/30 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="w-9 h-9 rounded-full bg-[#1C2836] flex items-center justify-center hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4 text-slate-400" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#1C2836] flex items-center justify-center hover:bg-white/10 transition-colors">
              <MessageSquare className="w-4 h-4 text-slate-400" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-white leading-none mb-1">Alex Morgan</p>
                <p className="text-[10px] text-[#00F0FF] font-medium tracking-wider uppercase">Compliance Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 border-2 border-[#131D26] flex items-center justify-center text-white font-bold text-sm shadow-md">
                AM
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">

          {/* Page Title & Insight Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Compliance Manager Reports</h1>
              <p className="text-slate-400 text-sm">Real-time departmental risk and training performance analytics.</p>
            </div>
            <button className="flex items-center gap-2 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 font-bold text-sm px-6 py-3 rounded-xl transition-colors backdrop-blur-sm self-start whitespace-nowrap">
              <Sparkles className="w-4 h-4" /> Generate AI Insight
            </button>
          </div>

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <div className="bg-[#131D26] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-32 hover:border-[#00F0FF]/30 transition-colors group">
              <h3 className="text-sm text-slate-400 font-medium">Total Completion</h3>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">88%</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center">~+5%</span>
              </div>
            </div>

            <div className="bg-[#131D26] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-32 hover:border-red-500/30 transition-colors group">
              <h3 className="text-sm text-slate-400 font-medium">High Risk Depts</h3>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-white group-hover:text-red-400 transition-colors">3</span>
                <span className="text-sm font-bold text-red-400 flex items-center">~-2%</span>
              </div>
            </div>

            <div className="bg-[#131D26] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-32 hover:border-orange-500/30 transition-colors group">
              <h3 className="text-sm text-slate-400 font-medium">Compliance Gap</h3>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-white group-hover:text-orange-400 transition-colors">12%</span>
                <span className="text-sm font-bold text-red-400 flex items-center">~-4%</span>
              </div>
            </div>

            <div className="bg-[#131D26] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-32 hover:border-[#00F0FF]/30 transition-colors group">
              <h3 className="text-sm text-slate-400 font-medium">Top Performers</h3>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">156</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center">~+12%</span>
              </div>
            </div>

          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* Risk Level by Department */}
            <div className="lg:col-span-2 bg-[#131D26] border border-white/5 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white">Risk Level by Department</h3>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#00F0FF]"></div> Compliance</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1C2836]"></div> Risk</span>
                </div>
              </div>

              <div className="flex flex-col gap-6">

                {[
                  { name: 'Engineering', score: 85, color: 'bg-[#00F0FF]' },
                  { name: 'Finance', score: 92, color: 'bg-[#00F0FF]' },
                  { name: 'Marketing', score: 65, color: 'bg-[#00F0FF]' },
                  { name: 'HR & Admin', score: 78, color: 'bg-[#00F0FF]' },
                  { name: 'Legal', score: 98, color: 'bg-[#00F0FF]' },
                ].map((dept, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-slate-300 font-medium">{dept.name}</span>
                    <div className="flex-1 h-8 bg-[#1C2836] rounded text-left overflow-hidden relative flex">
                      <div className={`h-full ${dept.color}`} style={{ width: `${dept.score}%` }}></div>
                    </div>
                    <span className={`w-8 text-right text-sm font-bold ${dept.score < 75 ? 'text-red-400' : 'text-[#00F0FF]'}`}>{dept.score}%</span>
                  </div>
                ))}

              </div>
            </div>

            {/* Regional Risk Heatmap */}
            <div className="bg-[#131D26] border border-white/5 rounded-2xl p-8 shadow-xl flex flex-col justify-between">
              <h3 className="text-lg font-bold text-white mb-6">Regional Risk Heatmap</h3>

              {/* Abstract Map Graphic */}
              <div className="flex-1 bg-[#0A1016] rounded-xl mb-6 relative overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 p-2 opacity-50">
                  <div className="bg-transparent"></div><div className="bg-transparent"></div><div className="bg-transparent"></div><div className="bg-[#00F0FF]/10 rounded"></div><div className="bg-transparent"></div>
                  <div className="bg-[#00F0FF]/20 rounded"></div><div className="bg-[#00F0FF]/10 rounded"></div><div className="bg-transparent"></div><div className="bg-transparent"></div><div className="bg-transparent"></div>
                  <div className="bg-transparent"></div><div className="bg-[#00F0FF]/40 rounded"></div><div className="bg-[#00F0FF]/10 rounded"></div><div className="bg-[#00F0FF]/20 rounded"></div><div className="bg-transparent"></div>
                  <div className="bg-transparent"></div><div className="bg-transparent"></div><div className="bg-[#00F0FF]/30 rounded"></div><div className="bg-transparent"></div><div className="bg-[#00F0FF]/10 rounded"></div>
                  <div className="bg-transparent"></div><div className="bg-transparent"></div><div className="bg-transparent"></div><div className="bg-transparent"></div><div className="bg-transparent"></div>
                </div>
                <Map className="w-16 h-16 text-[#00F0FF] z-10 opacity-80 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">North America</span>
                  <span className="text-[#00F0FF] font-bold">Low Risk</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">EMEA</span>
                  <span className="text-orange-400 font-bold">Moderate</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">APAC</span>
                  <span className="text-[#00F0FF] font-bold">Low Risk</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Critical Compliance Gaps */}
            <div className="bg-[#131D26] border border-red-500/20 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white">Critical Compliance Gaps</h3>
                <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-1 rounded font-bold tracking-wider uppercase">Immediate Action</span>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { title: 'Data Privacy Certification', dept: 'Marketing Department - 42% Completion', color: 'text-red-400', bg: 'bg-red-500/10' },
                  { title: 'AI Ethics Module 2', dept: 'Finance Team - 68% Completion', color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  { title: 'Compliance Disclosure', dept: 'Sales Department - 75% Completion', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                ].map((gap, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${gap.bg}`}>
                      <AlertTriangle className={`w-5 h-5 ${gap.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm mb-1">{gap.title}</h4>
                      <p className="text-xs text-slate-400">{gap.dept}</p>
                    </div>
                    <button className="text-sm font-bold text-[#00F0FF] border-b border-[#00F0FF]/30 hover:border-[#00F0FF] transition-colors pb-0.5">
                      Nudge Team
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Training Performers */}
            <div className="bg-[#131D26] border border-[#00F0FF]/20 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white">Top Training Performers</h3>
                <span className="text-[10px] bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 px-2 py-1 rounded font-bold tracking-wider uppercase">Leaderboard</span>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { name: 'Sarah Jenkins', dept: 'Legal • 100% Score', badges: 12 },
                  { name: 'David Chen', dept: 'Engineering • 98% Score', badges: 10 },
                  { name: 'Elena Rodriguez', dept: 'Operations • 97% Score', badges: 9 },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 shrink-0 shadow-inner flex items-center justify-center text-white font-bold text-xs border border-white/10">
                      {user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm mb-1">{user.name}</h4>
                      <p className="text-xs text-slate-400">{user.dept}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#00F0FF] font-bold text-sm bg-[#00F0FF]/10 px-3 py-1.5 rounded-lg border border-[#00F0FF]/20">
                      <Award className="w-4 h-4" /> {user.badges} badges
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
