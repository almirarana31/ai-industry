'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, ArrowRight, BookX, ArrowRightCircle } from 'lucide-react';

export default function ComplianceBreachPage() {
  return (
    <div className="min-h-screen bg-[#1A1D27] text-slate-100 font-sans flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-[#1A1D27] to-[#1A1D27]">

      {/* Top Bar Nav */}
      <nav className="absolute top-0 w-full px-8 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold tracking-widest text-white uppercase text-sm">SHIELD AI</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono text-red-500 tracking-widest uppercase animate-pulse">TRAINING SESSION ACTIVE</span>
          <div className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-slate-400">VAR 7/12</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mt-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">

        {/* Glowing Title Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="bg-red-950/40 border border-red-500/30 px-6 py-2 rounded-full flex items-center gap-3 mb-8 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-[10px] font-bold tracking-widest uppercase">CRITICAL ERROR DETECTED</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white text-center tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            COMPLIANCE <span className="text-red-500">BREACH</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 text-center font-medium max-w-xl">
            Your last action triggered a data privacy violation.
          </p>
        </div>

        {/* Penalty Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Compliance Score Decrease */}
          <div className="bg-[#1F2332] rounded-2xl p-8 border border-white/5 shadow-xl flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-4">COMPLIANCE SCORE</p>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-black text-slate-600 line-through decoration-red-500/50">400</span>
              <span className="text-2xl font-black text-slate-500">➔</span>
              <span className="text-6xl font-black text-red-500 text-shadow-sm">65</span>
            </div>
            <p className="text-xs font-bold text-red-500 tracking-wider flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></svg>
              -35% DECREASE
            </p>
          </div>

          {/* Incident Recorded */}
          <div className="bg-[#1F2332] rounded-2xl p-8 border border-white/5 shadow-xl flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-4">TOTAL INCIDENTS</p>
            <div className="text-6xl font-black text-white mb-4">01</div>
            <p className="text-xs font-bold text-[#F59E0B] tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              +1 RECORDED
            </p>
          </div>

          {/* XP Penalty */}
          <div className="bg-[#1F2332] rounded-2xl p-8 border border-white/5 shadow-xl flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-4">EXPERIENCE POINTS</p>
            <div className="text-6xl font-black text-slate-400 mb-4">-50</div>
            <p className="text-xs font-bold text-slate-400 tracking-wider">XP PENALTY APPLIED</p>
          </div>

        </div>

        {/* Detailed Explanation Block */}
        <div className="w-full bg-[#1F2332] rounded-2xl border-l-4 border-l-red-500 border-t border-r border-b border-white/5 p-8 flex flex-col md:flex-row gap-8 shadow-xl mb-12 relative overflow-hidden">
          {/* Subtle bg glow */}
          <div className="absolute left-0 top-0 w-32 h-64 bg-red-500/5 blur-[100px] pointer-events-none"></div>

          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <BookX className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-white tracking-wide">GDPR VIOLATION: ART. 5(1)(B)</h2>
            </div>

            <div className="space-y-4 text-sm md:text-base text-slate-300 leading-relaxed">
              <p>
                By feeding un-anonymized customer telemetry data directly into the public Large Language Model (LLM) for analysis, you have violated the <strong>Purpose Limitation</strong> principle of GDPR.
              </p>
              <p>
                Proprietary data and PII (Personally Identifiable Information) must be scrubbed through the <span className="text-red-400 italic font-medium">Secure Gateway</span> before interacting with external AI providers.
              </p>
            </div>
          </div>

          {/* Reference Links */}
          <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 relative z-10 flex flex-col justify-center">
            <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4">POLICY REFERENCES</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-sm text-white hover:text-red-400 cursor-pointer transition-colors">
                <div className="w-1.5 h-4 bg-red-500 rounded-sm mt-0.5 shrink-0"></div>
                <span className="font-medium">IT Security Policy v4.2 (Section 8)</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-white hover:text-red-400 cursor-pointer transition-colors">
                <div className="w-1.5 h-4 bg-red-500 rounded-sm mt-0.5 shrink-0"></div>
                <span className="font-medium">AI Governance Framework 2024</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-white hover:text-red-400 cursor-pointer transition-colors">
                <div className="w-1.5 h-4 bg-red-500 rounded-sm mt-0.5 shrink-0"></div>
                <span className="font-medium">GDPR Article 5: Principles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-6">
          <Link href="/training/modules/data-privacy/simulation" className="flex-1 bg-[#242A38] hover:bg-[#2C3445] text-white font-bold text-lg py-5 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            Try Again
          </Link>
          <Link href="/training/modules/data-privacy/conversation" className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-lg py-5 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all flex items-center justify-center gap-3">
            Continue Training
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

      </div>

      {/* Bottom Footer Info */}
      <footer className="absolute bottom-0 w-full px-8 py-6 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
        <span className="text-slate-500">SESSION_ID: 882-AX-9 &nbsp;&nbsp;&nbsp; ENCRYPTION: AES-256</span>
        <span className="text-red-900 font-bold bg-red-500/10 px-3 py-1.5 rounded">SYSTEM_WARNING: COMPLIANCE_THRESHOLD_LOW</span>
      </footer>

    </div>
  );
}
