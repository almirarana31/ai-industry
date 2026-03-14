'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  Download,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Server,
  ChevronDown,
  LockKeyhole,
  BarChart2
} from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col">

      {/* Top Navbar */}
      <nav className="h-20 bg-[#0F161E] border-b border-white/5 flex items-center justify-between px-8 shrink-0 relative z-20">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-[#0D9488] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform">
              <div className="w-4 h-4 border-2 border-[#0F161E] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Sentinel <span className="font-light opacity-80">Training</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium pl-8 border-l border-white/5">
            <Link href="/training" className="text-slate-400 hover:text-white transition-colors">Training</Link>
            <Link href="/compliance" className="text-[#00F0FF] border-b-2 border-[#00F0FF] pb-6 pt-6">Compliance</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Trust & Safety</Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">Resources</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search regulations..."
              className="bg-[#1C2836] text-sm text-slate-300 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 w-64 border border-transparent focus:outline-none focus:border-[#00F0FF]/30 transition-colors"
            />
          </div>

          <Link href="/login" className="bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold text-sm px-6 py-2.5 rounded-lg transition-transform hover:-translate-y-0.5 shadow-md">
            Enterprise Login
          </Link>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 border-2 border-[#0F161E] flex items-center justify-center shadow-md">
            {/* User avatar placeholder */}
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-16 flex flex-col relative">

        {/* Ambient Top Gradient */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00F0FF]/5 via-[#0F161E] to-[#0F161E] -z-10"></div>

        {/* Page Header Area */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Regulatory Compliance<br />
              <span className="text-[#00F0FF]">Overview</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl">
              Detailed alignment with EU AI Act, GDPR, and global safety standards for enterprise-grade AI deployment. Ensure your workforce is trained on the latest legal frameworks.
            </p>

            <div className="flex items-center gap-8 border-b border-white/5">
              <button className="text-[#00F0FF] font-bold pb-4 border-b-2 border-[#00F0FF] flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                EU AI Act
              </button>
              <button className="text-slate-400 hover:text-white font-medium pb-4 border-b-2 border-transparent transition-colors flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> GDPR Compliance
              </button>
              <button className="text-slate-400 hover:text-white font-medium pb-4 border-b-2 border-transparent transition-colors flex items-center gap-2">
                <LockKeyhole className="w-4 h-4" /> ISO/IEC 42001
              </button>
            </div>
          </div>

          {/* Action Buttons & Badges */}
          <div className="flex flex-col gap-4 shrink-0">
            <button className="flex items-center gap-3 bg-transparent hover:bg-white/5 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl transition-colors w-full justify-center">
              <Download className="w-5 h-5" /> Download Compliance Whitepaper
            </button>

            <div className="bg-gradient-to-r from-[#112224] to-[#16212B] border border-[#0D9488]/30 rounded-xl p-4 flex items-center gap-4 shadow-lg w-full">
              <div className="w-12 h-12 bg-[#00F0FF] rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <ShieldCheck className="w-6 h-6 text-[#0F161E]" />
              </div>
              <div>
                <h4 className="font-bold text-white">Trust & Safety Certified</h4>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Global Standard 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Accordions */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Regulatory Articles & Frameworks</h2>
              <span className="bg-[#00F0FF]/15 text-[#00F0FF] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#00F0FF]/20">Variant 10</span>
            </div>

            <div className="flex flex-col gap-4">

              {/* Accordion 1 */}
              <div className="bg-[#16212B] border border-white/5 hover:border-[#00F0FF]/30 rounded-2xl p-6 transition-colors shadow-lg group">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Article 5: Prohibited Practices</h3>
                      <p className="text-xs text-slate-500 font-medium mb-4">Compliance Level: Mandatory</p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Prohibition of AI systems that deploy subliminal techniques, exploit vulnerabilities, or are used for social scoring by public authorities.
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-500 cursor-pointer" />
                </div>
              </div>

              {/* Accordion 2 */}
              <div className="bg-[#16212B] border border-white/5 hover:border-[#00F0FF]/30 rounded-2xl p-6 transition-colors shadow-lg group">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                      <AlertTriangle className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Article 6: High-Risk Systems</h3>
                      <p className="text-xs text-slate-500 font-medium mb-4">Compliance Level: High Priority</p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Classification of AI systems as high-risk if they are intended for use as safety components or products covered by EU harmonization legislation.
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-500 cursor-pointer" />
                </div>
              </div>

              {/* Accordion 3 */}
              <div className="bg-[#16212B] border border-white/5 hover:border-[#00F0FF]/30 rounded-2xl p-6 transition-colors shadow-lg group">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center shrink-0 border border-[#00F0FF]/20">
                      <Eye className="w-6 h-6 text-[#00F0FF]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Article 52: Transparency Obligations</h3>
                      <p className="text-xs text-slate-500 font-medium mb-4">Compliance Level: Required</p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Ensuring that natural persons are aware they are interacting with an AI system, unless this is obvious from the context of use.
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-500 cursor-pointer" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Status Cards */}
          <div className="flex flex-col gap-8">

            {/* Compliance Status Card */}
            <div className="bg-[#16212B] border border-white/5 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/20 flex items-center justify-center">
                  <BarChart2 className="w-4 h-4 text-[#00F0FF]" />
                </div>
                <h3 className="text-lg font-bold text-white">Compliance Status</h3>
              </div>

              <div className="flex flex-col gap-5 mb-8">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">EU AI Act Alignment</span>
                    <span className="text-[#00F0FF] font-bold">85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C2836] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00F0FF] w-[85%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">GDPR Data Privacy</span>
                    <span className="text-[#00F0FF] font-bold">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C2836] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00F0FF] w-[92%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-medium">Safety Protocols</span>
                    <span className="text-[#00F0FF] font-bold">78%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1C2836] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00F0FF] w-[78%]"></div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors">
                View Full Audit Report
              </button>
            </div>

            {/* Secure Learning Environment Image Card */}
            <div className="bg-[#16212B] border border-white/5 rounded-2xl overflow-hidden shadow-xl relative group">
              <div className="h-48 bg-gradient-to-br from-blue-900 to-slate-900 relative flex items-center justify-center overflow-hidden">
                {/* Abstract representation of server room */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <Server className="w-16 h-16 text-[#00F0FF]/50 z-10 drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]" />

                {/* Top light beam effect */}
                <div className="absolute top-0 w-32 h-32 bg-[#00F0FF] opacity-30 blur-[60px] transform -translate-y-1/2"></div>
              </div>

              <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-[#16212B] via-[#16212B] to-transparent pt-12">
                <h3 className="text-lg font-bold text-white mb-2">Secure Learning Environment</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All training data is encrypted and stored locally in EU-based servers.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Standardized Footer */}
      <footer className="border-t border-white/5 py-8 px-8 bg-[#0F161E] shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#0D9488] flex items-center justify-center rotate-45 transform">
              <div className="w-3 h-3 border-2 border-[#0F161E] -rotate-45"></div>
            </div>
            <p className="text-xs text-slate-500 font-medium">© 2025 Sentinel Training. Professional Compliance Edition.</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Legal Notice</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Ensure the icon used in the Compliance Status card is imported correctly if FileBarChart doesn't exist
import { BarChart2 as FileBarChartIcon } from 'lucide-react';
// I'll swap FileBarChart to BarChart2 just in case if there's an import issue with older lucide.
// Actually I'll use BarChart3 or BarChart instead.
