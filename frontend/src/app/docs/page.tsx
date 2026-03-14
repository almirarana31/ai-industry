'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, FileText, Code, CheckCircle, Search, ChevronRight } from 'lucide-react';

export default function DocsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col">
      {/* Public Navbar */}
      <nav className="w-full mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-50 border-b border-white/5 bg-[#16212B]">
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="w-10 h-10 rounded-lg bg-[#00F0FF] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-5 h-5 border-[2.5px] border-[#0F161E] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">Sentinel <span className="font-light opacity-80">Training</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/curriculum" className="text-slate-300 hover:text-white transition-colors">Curriculum</Link>
          <Link href="/enterprise" className="text-slate-300 hover:text-white transition-colors">For Enterprise</Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input type="text" placeholder="Search docs..." className="bg-[#1C2836] border border-transparent focus:border-[#00F0FF]/30 text-sm text-slate-300 rounded-lg pl-10 pr-4 py-2 w-64 transition-colors focus:outline-none" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          </div>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar Menu */}
        <aside className="w-64 bg-[#16212B] border-r border-white/5 overflow-y-auto hidden md:block shrink-0">
          <div className="p-6">
            <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">Getting Started</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-400 mb-8">
              <li><a href="#" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> Introduction</a></li>
              <li><a href="#" className="flex items-center gap-2 text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> Platform Overview</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> Account Setup</a></li>
            </ul>

            <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">For Administrators</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-400 mb-8">
              <li><a href="#" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> SSO Integration</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> SCORM Exports</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> Generating Reports</a></li>
            </ul>

            <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">API Reference</h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li><a href="#" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> Authentication</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> Users Endpoint</a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-[#00F0FF] transition-colors"><ChevronRight className="w-3 h-3" /> Webhooks</a></li>
            </ul>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 max-w-4xl p-8 md:p-12 overflow-y-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Platform Overview</h1>
          <p className="text-lg text-slate-400 mb-12 border-b border-white/10 pb-8">
            Sentinel Training is the enterprise platform for generative AI literacy, securing your workforce against LLM-based risks and ensuring EU AI Act compliance.
          </p>

          <div className="prose prose-invert prose-slate max-w-none">

            <h2 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#00F0FF]" /> Core Architecture
            </h2>
            <p>
              The platform is divided into three primary layers: the administrative compliance dashboard, the interactive training academy (modules), and the digital credentials gallery. Administrators can manage training tracks and view analytics regarding the preparedness of their workforce.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#00F0FF]" /> Module Types
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-400 mb-8 mt-4 bg-[#16212B] p-6 rounded-xl border border-white/5">
              <li><strong className="text-white">Conceptual Video:</strong> High-level overviews of LLM mechanics and copyright issues.</li>
              <li><strong className="text-white">Interactive Sandbox:</strong> Simulation environments where employees practice PII redaction and prompt injection defenses in a safe terminal.</li>
              <li><strong className="text-white">Compliance Quiz:</strong> Graded assessments mapping directly to SOC2 and ISO compliance requirements.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-[#00F0FF]" /> Example API Integration
            </h2>
            <p>Enterprise tiers can programmatically extract certification events into their internal HR systems using our REST API endpoint. Below is a sample cURL request to fetch recent user completion data.</p>

            <div className="bg-[#1C2836] border border-white/10 rounded-xl p-4 my-6 font-mono text-sm overflow-x-auto">
              <span className="text-pink-400">curl</span> -X GET \
              <br />&nbsp;&nbsp;<span className="text-green-400">"https://api.sentinel-platforms.com/v1/workforce/certifications"</span> \
              <br />&nbsp;&nbsp;-H <span className="text-yellow-300">"Authorization: Bearer sk_live_your_secret_key"</span> \
              <br />&nbsp;&nbsp;-H <span className="text-yellow-300">"Content-Type: application/json"</span>
            </div>

          </div>
        </main>
      </div>

    </div>
  );
}
