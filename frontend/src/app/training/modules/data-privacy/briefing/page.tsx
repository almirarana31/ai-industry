'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Clock, AlertTriangle, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

export default function MissionBriefingPage() {
  return (
    <div className="min-h-screen bg-[#111827] text-slate-100 font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">

        {/* Header Tags */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-[#3B82F6] text-xs font-mono tracking-widest uppercase mb-2">Variant 04 // Simulation</p>
            <h1 className="text-4xl font-bold text-white tracking-tight">Scenario Mission Briefing</h1>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            <p>ID: AI-LLM-2025-0012</p>
            <p>Status: Awaiting Deployment</p>
          </div>
        </div>

        {/* Main Briefing Card */}
        <div className="bg-[#1E293B] rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">

          {/* Top Section: Story/Context */}
          <div className="p-8 md:p-10 relative">
            {/* Background decorative shield */}
            <Shield className="absolute right-10 top-1/2 transform -translate-y-1/2 w-48 h-48 text-slate-800 opacity-20" strokeWidth={1} />

            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">The Customer Data Dilemma</h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl relative z-10">
              A critical request has arrived from the Marketing Department. They've asked you to run a bulk analysis of customer sentiment using an unvetted public AI tool. Your decisions here will determine the integrity of our internal data silos.
            </p>
          </div>

          <div className="h-px w-full bg-slate-700"></div>

          {/* Middle Section: Objectives & Stats */}
          <div className="flex flex-col md:flex-row">

            {/* Objectives List */}
            <div className="flex-1 p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-700">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#3B82F6] mb-6">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" /></svg>
                Mission Objectives
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-[#3B82F6] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">Identify PII (Personally Identifiable Information) risk within raw prompt datasets.</p>
                </div>
                <div className="flex items-start gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-[#3B82F6] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">Evaluate the trade-offs between processing speed and data compliance protocols.</p>
                </div>
                <div className="flex items-start gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-[#3B82F6] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">Implement proper anonymization techniques before external AI interaction.</p>
                </div>
              </div>
            </div>

            {/* Stats & Risk */}
            <div className="w-full md:w-80 p-8 md:p-10 flex flex-col justify-center bg-[#192231]">
              <div className="mb-8">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">Est. Time</p>
                <div className="flex items-center gap-2 text-2xl font-bold text-white">
                  <Clock className="w-6 h-6 text-slate-300" />
                  5 Mins
                </div>
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">Potential Reward</p>
                <div className="flex items-center gap-2 text-2xl font-bold text-[#F59E0B]">
                  <div className="w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#192231]">
                    <span className="text-sm">★</span>
                  </div>
                  150 XP
                </div>
              </div>

              <div className="bg-red-950/30 border border-red-900/50 rounded-xl px-4 py-3 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider leading-tight">High Risk<br />Compliance</p>
                </div>
              </div>
            </div>

          </div>

          <div className="h-px w-full bg-slate-700"></div>

          {/* Bottom Section: Actions */}
          <div className="bg-[#151D2A] p-6 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-2 text-sm text-slate-400 max-w-sm">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Failure to follow protocol may result in simulation restart.</p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-4 rounded-xl bg-[#1E293B] hover:bg-slate-700 text-white font-bold transition-colors border border-slate-700 text-center leading-tight">
                Review<br />Protocol
              </button>
              <Link href="/training/modules/data-privacy/simulation" className="flex-1 sm:flex-none px-8 py-4 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-bold transition-colors shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 text-center leading-tight">
                Accept<br />Mission
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center mt-6 px-2">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase">Current Rank</p>
              <p className="text-sm font-mono text-slate-300">Lead Analyst I</p>
            </div>
            <div className="w-24 h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full w-1/2 bg-[#3B82F6]"></div>
            </div>
          </div>
          <p className="text-xs font-mono text-slate-500">SYSTEM_STABLE // 124.50.21.0</p>
        </div>

      </div>
    </div>
  );
}
