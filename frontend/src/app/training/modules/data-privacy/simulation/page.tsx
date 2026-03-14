'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Moon, Paperclip, Download, Cloud, Shield, FileText, AlertTriangle } from 'lucide-react';

export default function SimulationPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] text-slate-900 font-sans flex flex-col">
      {/* Top Navbar */}
      <nav className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4D6EF7] flex items-center justify-center shadow-md">
            {/* Navigtaor Icon */}
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-800 leading-tight">Sentinel <span className="text-[#4D6EF7]">Pro</span></h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SIMULATION MODE: ACTIVE</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-700">Scenario 5 of 12</span>
            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#4D6EF7] w-[40%]"></div>
            </div>
          </div>
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          <Moon className="w-5 h-5 text-slate-400" />
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">JD</div>
        </div>
      </nav>

      {/* Main Mail App Interface */}
      <main className="flex-1 flex overflow-hidden">

        {/* Left Pane: Inbox List */}
        <div className="w-[300px] bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mail..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#4D6EF7] transition-colors"
                disabled
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Active Email Item */}
            <div className="p-4 border-l-4 border-[#4D6EF7] bg-[#F8FAFC] cursor-pointer">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-slate-800">Sarah Chen</span>
                <span className="text-[10px] font-bold text-[#4D6EF7] uppercase tracking-wider">JUST NOW</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-1">URGENT: Customer Analysis for Q3</h4>
              <p className="text-xs text-slate-500 italic line-clamp-2">"Hi, can you run a quick sentiment analysis on the attached..."</p>
            </div>

            {/* Inactive Email 1 */}
            <div className="p-4 border-l-4 border-transparent hover:bg-slate-50 cursor-pointer border-b border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-slate-600">HR Benefits</span>
                <span className="text-[10px] font-medium text-slate-400">2h ago</span>
              </div>
              <h4 className="text-sm font-medium text-slate-700 mb-1 line-clamp-1">Quarterly Wellness Update</h4>
              <p className="text-xs text-slate-400 line-clamp-1">The new policy updates are now live...</p>
            </div>

            {/* Inactive Email 2 */}
            <div className="p-4 border-l-4 border-transparent hover:bg-slate-50 cursor-pointer border-b border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-slate-600">System Admin</span>
                <span className="text-[10px] font-medium text-slate-400">4h ago</span>
              </div>
              <h4 className="text-sm font-medium text-slate-700 mb-1 line-clamp-1">Password Expiry Notice</h4>
              <p className="text-xs text-slate-400 line-clamp-1">Your password expires in 3 days...</p>
            </div>
          </div>
        </div>

        {/* Center Pane: Email Content */}
        <div className="flex-1 bg-white flex flex-col min-w-0">

          {/* Email Header */}
          <div className="p-6 md:p-8 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm mt-1">
                SC
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">URGENT: Customer Analysis for Q3</h2>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">Sarah Chen</span>
                  <span>&lt;sarah.chen@company.com&gt;</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>Today at 10:42 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto">
            <div className="prose prose-sm max-w-3xl text-slate-700 space-y-4">
              <p>Hi team,</p>
              <p>
                I hope you're having a good morning. I need a quick favor—could you please run a detailed sentiment and behavioral analysis on the latest customer data dump? We have a board meeting in two hours and I need some high-level insights for my presentation.
              </p>
              <p>
                I've attached the latest CSV export (`customers.csv`) which contains the raw feedback and user profiles. Let me know as soon as you have the results.
              </p>
              <p>
                Thanks!<br />
                <strong>Sarah Chen</strong><br />
                <span className="text-slate-400">Director of Operations</span>
              </p>
            </div>

            {/* Attachment Widget */}
            <div className="mt-10 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">
                <Paperclip className="w-4 h-4" />
                Attachments (1)
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">

                {/* File Header */}
                <div className="p-4 bg-white flex items-center justify-between border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#20C997]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#20C997]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">customers.csv</h4>
                      <p className="text-xs text-slate-500">1.2 MB • Spreadsheet</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#4D6EF7] px-4 py-2 rounded-lg border border-[#4D6EF7]/20 hover:bg-[#4D6EF7]/5 transition-colors uppercase tracking-widest">
                    Download
                  </button>
                </div>

                {/* File Preview */}
                <div className="bg-slate-50 overflow-x-auto">
                  <table className="w-fulltext-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs text-slate-500 font-semibold bg-white">
                        <th className="px-4 py-3 font-medium">customer_id</th>
                        <th className="px-4 py-3 font-medium">full_name</th>
                        <th className="px-4 py-3 font-medium">email_address</th>
                        <th className="px-4 py-3 font-medium">last_purchase</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700 divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 text-slate-500">#44921</td>
                        <td className="px-4 py-3 bg-red-50/50 font-medium">Robert J.<br />Harrison</td>
                        <td className="px-4 py-3 bg-red-50/50">r.harrison99@gmail.com</td>
                        <td className="px-4 py-3 text-slate-500">2023-11-12</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-slate-500">#44922</td>
                        <td className="px-4 py-3 bg-red-50/50 font-medium">Maria<br />Gonzales</td>
                        <td className="px-4 py-3 bg-red-50/50">m.gonz84@outlook.com</td>
                        <td className="px-4 py-3 text-slate-500">2023-11-14</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-slate-500">#44923</td>
                        <td className="px-4 py-3 bg-red-50/50 font-medium">James<br />Wilson</td>
                        <td className="px-4 py-3 bg-red-50/50">j.wilson.contractor@corp.com</td>
                        <td className="px-4 py-3 text-slate-500">2023-11-15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Warning Banner */}
                <div className="bg-[#FFFBEB] border-t border-[#FDE68A] p-3 flex items-center justify-center gap-2 text-xs font-bold text-[#D97706] tracking-widest uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  WARNING: PERSONALLY IDENTIFIABLE INFORMATION (PII) DETECTED IN PREVIEW
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Actions List */}
        <div className="w-[320px] lg:w-[380px] bg-[#F8FAFC] border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-6 md:p-8 flex-1 overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 text-center mb-2">Make Your Choice</h3>
            <p className="text-sm text-slate-500 text-center mb-8">Sarah is waiting. How do you proceed?</p>

            <div className="flex flex-col gap-4">

              {/* Option 1: ChatGPT */}
              <Link href="/training/modules/data-privacy/decision" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative cursor-pointer block group">
                <div className="absolute top-4 right-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                  HIGH RISK
                </div>
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cloud className="w-5 h-5 text-red-500" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Upload to ChatGPT</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Quickest results. Upload the CSV directly to a public AI model for analysis.
                </p>
              </Link>

              {/* Option 2: Internal Tool (Recommended) */}
              <Link href="/training/modules/data-privacy/decision" className="bg-white rounded-2xl p-5 border-2 border-[#4D6EF7] shadow-[0_4px_20px_rgba(77,110,247,0.15)] relative cursor-pointer block transform hover:-translate-y-1 transition-all">
                <div className="absolute top-0 right-4 bg-[#4D6EF7] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-b-md shadow-sm">
                  RECOMMENDED
                </div>
                <div className="w-10 h-10 rounded-full bg-[#EAEFFE] flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-[#4D6EF7]" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Use Internal AI Tool</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Process the data using the company's secure, private LLM instance that masks PII.
                </p>
              </Link>

              {/* Option 3: Manual */}
              <Link href="/training/modules/data-privacy/decision" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer block group">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="12" x2="3" y2="12" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="18" x2="3" y2="18" /></svg>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Manual Analysis</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Safest but slowest. Manually summarize the data in Excel. May miss the deadline.
                </p>
              </Link>

            </div>
          </div>

          <div className="p-4 bg-[#F1F5F9] border-t border-slate-200 m-4 rounded-xl border flex items-start gap-3">
            <div className="mt-0.5">
              <svg className="w-4 h-4 text-[#4D6EF7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Pro Tip:</strong> Always check for <strong className="text-red-500">PII</strong> (Names, Emails, IDs) before uploading any files to external AI services.
            </p>
          </div>

        </div>

      </main>

      {/* Footer Details */}
      <footer className="w-full bg-white border-t border-slate-200 px-6 py-2 flex items-center justify-between shrink-0 text-[10px] font-bold tracking-widest uppercase text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#20C997]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#20C997]"></div>
            SIMULATOR CONNECTED
          </span>
          <span>VERSION 1.4.2-STABLE</span>
        </div>
        <span>© 2025 AI NAVIGATOR PLATFORM • ENTERPRISE TRAINING MODULE</span>
      </footer>

    </div>
  );
}
