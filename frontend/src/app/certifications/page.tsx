'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Settings,
  Share2,
  CheckCircle2,
  Clock,
  Download,
  Linkedin,
  Lock,
  Compass,
  Award
} from 'lucide-react';

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col">

      {/* Top Navbar */}
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
                placeholder="Search certifications..."
                className="bg-[#1C2836] text-sm text-slate-300 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 w-64 border border-transparent focus:outline-none focus:border-[#00F0FF]/30 transition-colors"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/certifications" className="text-[#00F0FF] border-b-2 border-[#00F0FF] pb-6 pt-6 tracking-wide">Certifications</Link>
            <Link href="/training" className="text-slate-400 hover:text-white transition-colors">Courses</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Community</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/settings/notifications" className="w-9 h-9 rounded-full bg-[#1C2836] flex items-center justify-center hover:bg-white/10 transition-colors">
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12 flex flex-col">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#0D9488]/20 text-[#00F0FF] border border-[#00F0FF]/30 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">
              <Award className="w-3.5 h-3.5" /> Enterprise CredentialHub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Digital Credentials</h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Manage, verify, and share your professional AI milestones with the global industry network.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold px-6 py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-transform hover:-translate-y-1 whitespace-nowrap">
            <Share2 className="w-5 h-5" /> Share Public Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-white/5 mb-10">
          <button className="flex items-center gap-2 text-[#00F0FF] font-bold pb-4 border-b-2 border-[#00F0FF]">
            <Award className="w-4 h-4" /> All Certificates
          </button>
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-300 font-medium pb-4 border-b-2 border-transparent transition-colors">
            <CheckCircle2 className="w-4 h-4" /> Completed (12)
          </button>
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-300 font-medium pb-4 border-b-2 border-transparent transition-colors">
            <Clock className="w-4 h-4" /> In Progress (4)
          </button>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

          {/* Card 1: Gen AI */}
          <div className="bg-[#16212B] rounded-2xl border border-white/5 hover:border-[#00F0FF]/30 overflow-hidden shadow-xl group transition-all">
            <div className="h-48 bg-gradient-to-br from-[#1b3b4d] to-[#12222b] relative p-6 flex items-center justify-center overflow-hidden">
              <span className="absolute top-4 right-4 bg-[#00F0FF] text-[#0F161E] text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-md z-10">Verified</span>
              {/* Abstract graphic */}
              <div className="w-32 h-32 absolute opacity-30 right-0 bottom-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00F0FF] to-transparent mix-blend-screen"></div>
              <svg className="w-24 h-24 text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Generative AI<br />Specialist</h3>
                <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0" />
              </div>
              <div className="text-xs text-slate-400 font-medium flex gap-2 mb-1">
                <span className="w-4 text-center">📅</span> Issued: March 14, 2025
              </div>
              <div className="text-xs text-slate-400 font-medium flex gap-2 mb-8">
                <span className="w-4 text-center">◎</span> ID: GAI-8829-XL
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C2836] hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg border border-white/5 transition-colors">
                  <Download className="w-4 h-4 text-[#00F0FF]" /> PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C2836] hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg border border-white/5 transition-colors">
                  <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: AI Ethics */}
          <div className="bg-[#16212B] rounded-2xl border border-white/5 hover:border-[#00F0FF]/30 overflow-hidden shadow-xl group transition-all">
            <div className="h-48 bg-gradient-to-br from-[#1f302b] to-[#111c18] relative p-6 flex items-center justify-center overflow-hidden">
              <span className="absolute top-4 right-4 bg-[#00F0FF] text-[#0F161E] text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-md z-10">Verified</span>
              <div className="w-32 h-32 absolute opacity-30 right-0 bottom-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500 to-transparent mix-blend-screen"></div>
              <svg className="w-24 h-24 text-yellow-500/80 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white">AI Ethics &<br />Governance</h3>
                <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0" />
              </div>
              <div className="text-xs text-slate-400 font-medium flex gap-2 mb-1">
                <span className="w-4 text-center">📅</span> Issued: Jan 20, 2025
              </div>
              <div className="text-xs text-slate-400 font-medium flex gap-2 mb-8">
                <span className="w-4 text-center">◎</span> ID: ETH-0012-BB
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C2836] hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg border border-white/5 transition-colors">
                  <Download className="w-4 h-4 text-[#00F0FF]" /> PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C2836] hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg border border-white/5 transition-colors">
                  <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Locked */}
          <div className="bg-[#121820] rounded-2xl border border-white/5 overflow-hidden shadow-xl relative opacity-80">
            <div className="absolute inset-0 z-20 flex flex-col items-center pt-24 pb-8 px-6 text-center">
              <Lock className="w-10 h-10 text-slate-500 mb-4 drop-shadow-md" />
              <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-12">Locked Milestone</p>
              <h3 className="text-xl font-bold text-slate-300 mb-2">Neural Architect Expert</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-auto">Master the creation of complex neural architectures and deep learning frameworks from scratch.</p>
              <button className="w-full bg-[#1C2836] border border-white/5 text-slate-400 font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 mt-6 cursor-not-allowed">
                <Lock className="w-4 h-4" /> View Progress Path
              </button>
            </div>

            {/* Background of locked card has a dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px]"></div>
            <div className="h-48 bg-[#16212B] flex items-center justify-center">
              <svg className="w-24 h-24 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <div className="p-6 h-56 bg-[#16212B]"></div>
          </div>

          {/* Card 4: NLP */}
          <div className="bg-[#16212B] rounded-2xl border border-white/5 hover:border-[#00F0FF]/30 overflow-hidden shadow-xl group transition-all">
            <div className="h-48 bg-gradient-to-br from-[#1a2f42] to-[#121d2b] relative p-6 flex items-center justify-center overflow-hidden">
              <span className="absolute top-4 right-4 bg-[#00F0FF] text-[#0F161E] text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-md z-10">Verified</span>
              <div className="w-32 h-32 absolute opacity-30 right-0 bottom-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 to-transparent mix-blend-screen"></div>
              <svg className="w-24 h-24 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white">NLP Advanced<br />Mastery</h3>
                <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0" />
              </div>
              <div className="text-xs text-slate-400 font-medium flex gap-2 mb-1">
                <span className="w-4 text-center">📅</span> Issued: Nov 12, 2024
              </div>
              <div className="text-xs text-slate-400 font-medium flex gap-2 mb-8">
                <span className="w-4 text-center">◎</span> ID: NLP-5510-QM
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C2836] hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg border border-white/5 transition-colors">
                  <Download className="w-4 h-4 text-[#00F0FF]" /> PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C2836] hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg border border-white/5 transition-colors">
                  <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Card 5: AI Business Strategy */}
          <div className="bg-[#16212B] rounded-2xl border border-white/5 hover:border-[#00F0FF]/30 overflow-hidden shadow-xl group transition-all">
            <div className="h-48 bg-gradient-to-br from-[#122e33] to-[#0d1c21] relative p-6 flex items-center justify-center overflow-hidden">
              <span className="absolute top-4 right-4 bg-[#00F0FF] text-[#0F161E] text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-md z-10">Verified</span>
              <div className="w-32 h-32 absolute opacity-30 right-0 bottom-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 to-transparent mix-blend-screen"></div>
              <svg className="w-24 h-24 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] z-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white">AI Business<br />Strategy</h3>
                <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0" />
              </div>
              <div className="text-xs text-slate-400 font-medium flex gap-2 mb-1">
                <span className="w-4 text-center">📅</span> Issued: Oct 05, 2024
              </div>
              <div className="text-xs text-slate-400 font-medium flex gap-2 mb-8">
                <span className="w-4 text-center">◎</span> ID: BIZ-9942-ZT
              </div>
              <div className="flex items-center gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C2836] hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg border border-white/5 transition-colors">
                  <Download className="w-4 h-4 text-[#00F0FF]" /> PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1C2836] hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg border border-white/5 transition-colors">
                  <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Card 6: New Career Path */}
          <div className="bg-[#111A23] rounded-2xl border-2 border-dashed border-[#00F0FF]/30 hover:border-[#00F0FF] hover:bg-[#162430] overflow-hidden shadow-xl group transition-all flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[400px]">
            <div className="w-20 h-20 rounded-full bg-[#00F0FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-10 h-10 text-[#00F0FF]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">New Career Path?</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Discover 40+ specialized certifications waiting for you.
            </p>
            <Link href="/training" className="bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold text-sm px-8 py-3.5 rounded-xl transition-transform hover:-translate-y-1 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              BROWSE ACADEMY
            </Link>
          </div>

        </div>

        {/* Load More Button */}
        <div className="flex flex-col flex-1 items-center justify-center mb-8">
          <p className="text-xs text-slate-500 mb-4 font-medium">Showing 5 of 12 active certifications</p>
          <button className="bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
            Load More Credentials <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0F161E] py-8 text-xs text-slate-500 font-medium px-8 w-full mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-[#0D9488] rounded flex items-center justify-center">
              <div className="w-2 h-2 border border-white rotate-45"></div>
            </div>
            <p>© 2025 Sentinel. All credentials are blockchain-verified.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Terms of Verification</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact Registrar</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
