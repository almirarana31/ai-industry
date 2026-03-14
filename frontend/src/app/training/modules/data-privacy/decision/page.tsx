'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, Eye, CheckCircle2, ChevronRight } from 'lucide-react';

export default function DecisionPointPage() {
  return (
    <div className="min-h-screen bg-[#1E2532] text-slate-100 font-sans p-6 md:p-8 flex flex-col">

      {/* Top Header */}
      <header className="flex items-center justify-between mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-500/20">
            {/* Guardian Logo */}
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-tight leading-tight">SENTINEL <span className="text-[#3B82F6] font-medium">TRAINING</span></h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SCENARIO 06 / 12</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-red-500 font-bold font-mono tracking-widest">00:14</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">XP POINTS</span>
            <span className="text-lg font-bold text-[#3B82F6]">2,450</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-slate-600 bg-slate-800 flex items-center justify-center overflow-hidden">
            <span className="text-lg">👨‍💻</span>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">

        {/* Left Column: Analysis Results */}
        <div className="w-full lg:w-[360px] flex flex-col gap-6 shrink-0">

          {/* Inspection Result Panel */}
          <div className="bg-[#242D3C] rounded-2xl p-6 border border-slate-700/50 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Inspection Result</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Automated scan completed. We've detected high-sensitivity PII (Personally Identifiable Information) in the source dataset.
            </p>

            <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-red-400 text-xs tracking-wider uppercase mb-1">Critical Security Alert</h4>
                <p className="text-red-400/80 text-sm leading-snug">
                  Dataset contains unmasked Social Security Numbers and private email addresses.
                </p>
              </div>
            </div>
          </div>

          {/* System Recommendation Panel */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden group">
            {/* Ambient animated glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6] opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity"></div>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-[#3B82F6]/20">
                <svg className="w-3.5 h-3.5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
              </div>
              <h3 className="font-bold text-white text-sm">System Recommendation</h3>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
              Based on Corporate Policy <span className="text-[#3B82F6]">#AI-092</span>, data containing unmasked PII must never be uploaded to external LLMs.
            </p>

            <div className="relative z-10">
              <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase mb-2">
                <span className="text-slate-500">Compliance Risk</span>
                <span className="text-red-500">Critical</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[90%] shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Data View & Actions */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">

          {/* Data Table View */}
          <div className="flex-1 bg-[#242D3C] rounded-2xl border border-slate-700/50 shadow-xl flex flex-col overflow-hidden">

            {/* Table Header */}
            <div className="p-4 bg-[#1E2532] border-b border-slate-700/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 tracking-widest uppercase">
                <Eye className="w-4 h-4 text-[#3B82F6]" />
                INSPECTED: CUSTOMER_DATA_FINAL.CSV
              </div>
              <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase border border-red-500/30">
                PII DETECTED
              </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[10px] font-bold tracking-widest text-slate-500 uppercase border-b border-slate-700/50">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">SSN</th>
                    <th className="px-6 py-4">Account Status</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">

                  {/* Row 1 */}
                  <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono">#8291</td>
                    <td className="px-6 py-4 font-medium text-white">Sarah Jenkins</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-medium border-l border-red-900/50">s.jenkins@gmail.com</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-mono tracking-wider border-r border-red-900/50">***-**-4492</td>
                    <td className="px-6 py-4">
                      <span className="text-[#20C997] bg-[#20C997]/10 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono">#8292</td>
                    <td className="px-6 py-4 font-medium text-white">Mark Thompson</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-medium border-l border-red-900/50">mark.t@outlook.com</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-mono tracking-wider border-r border-red-900/50">***-**-1182</td>
                    <td className="px-6 py-4">
                      <span className="text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded text-xs font-medium">Pending</span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono">#8293</td>
                    <td className="px-6 py-4 font-medium text-white">Elena Rodriguez</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-medium border-l border-red-900/50">e.rod@provider.net</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-mono tracking-wider border-r border-red-900/50">***-**-9901</td>
                    <td className="px-6 py-4">
                      <span className="text-[#20C997] bg-[#20C997]/10 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono">#8294</td>
                    <td className="px-6 py-4 font-medium text-white">James Wu</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-medium border-l border-red-900/50">j.wu@company.org</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-mono tracking-wider border-r border-red-900/50">***-**-5566</td>
                    <td className="px-6 py-4">
                      <span className="text-red-400 bg-red-500/10 px-2 py-1 rounded text-xs font-medium">Suspended</span>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-mono">#8295</td>
                    <td className="px-6 py-4 font-medium text-white">Linda Carter</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-medium border-l border-red-900/50 rounded-bl-lg">linda.c@live.com</td>
                    <td className="px-6 py-4 bg-red-950/40 text-red-400 font-mono tracking-wider border-r border-red-900/50 rounded-br-lg">***-**-2234</td>
                    <td className="px-6 py-4">
                      <span className="text-[#20C997] bg-[#20C997]/10 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>

          {/* Action Buttons (The Decision) */}
          <div className="flex flex-col sm:flex-row gap-6 shrink-0">

            {/* Failure Path */}
            <Link href="/training/modules/data-privacy/feedback/breach" className="flex-1 bg-[#242D3C] hover:bg-[#2A3444] rounded-2xl p-8 border border-slate-700/50 shadow-xl transition-all group flex flex-col items-center justify-center text-center cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)] mb-6 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload to ChatGPT</h3>
              <p className="text-slate-400 text-sm italic mb-6">External Processing</p>

              <div className="bg-red-500/20 text-red-400 px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase border border-red-500/30 w-full group-hover:bg-red-500/30 transition-colors">
                HIGH RISK
              </div>
            </Link>

            {/* Success Path */}
            <Link href="/training/modules/data-privacy/feedback/success" className="flex-1 bg-[#242D3C] hover:bg-[#2A3444] rounded-2xl p-8 border-2 border-[#20C997] shadow-[0_0_40px_rgba(32,201,151,0.15)] transition-all transform hover:-translate-y-1 group flex flex-col items-center justify-center text-center cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-[#20C997] flex items-center justify-center shadow-[0_0_30px_rgba(32,201,151,0.4)] mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-8 h-8 text-[#1E2532]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Use Internal Tool</h3>
              <p className="text-slate-400 text-sm italic mb-6">Private Cloud Deployment</p>

              <div className="bg-[#20C997] text-[#1E2532] px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase shadow-lg w-full group-hover:bg-[#1BA179] transition-colors">
                SAFE OPTION
              </div>
            </Link>

          </div>

        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-8 flex items-center justify-between text-[10px] font-mono text-slate-500 tracking-wider shrink-0">
        <div>
          <p>SYSTEM VERSION: 2.0.4-BETA // NODE-AL-99</p>
          <p>USER ID: AUTH-827-XJ</p>
        </div>
        <div className="bg-[#3B82F6]/10 text-[#3B82F6] px-3 py-1.5 rounded border border-[#3B82F6]/20 uppercase">
          DECISION PHASE: ACTIVE
        </div>
      </footer>

    </div>
  );
}

// Helper icon component
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
