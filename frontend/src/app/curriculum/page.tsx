'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, ShieldAlert, Cpu, Network, CheckCircle2 } from 'lucide-react';

export default function CurriculumPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00F0FF]/10 via-[#0F161E] to-[#0F161E] -z-10 pointer-events-none"></div>

      {/* Public Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-50">
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="w-10 h-10 rounded-lg bg-[#00F0FF] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-5 h-5 border-[2.5px] border-[#0F161E] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">Sentinel <span className="font-light opacity-80">Training</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/curriculum" className="text-[#00F0FF] transition-colors">Curriculum</Link>
          <Link href="/enterprise" className="text-slate-300 hover:text-white transition-colors">For Enterprise</Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-slate-300 hover:text-white text-sm font-bold transition-colors">Sign In</Link>
          <Link href="/register" className="bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transform hover:-translate-y-0.5">Get Started</Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F161E]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-xl font-medium md:hidden">
          <Link href="/curriculum" className="text-[#00F0FF]" onClick={() => setMobileMenuOpen(false)}>Curriculum</Link>
          <Link href="/enterprise" onClick={() => setMobileMenuOpen(false)}>For Enterprise</Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <div className="flex flex-col gap-4 mt-8 w-full max-w-xs px-6">
            <Link href="/login" className="w-full py-4 text-center border border-white/20 rounded-xl">Sign In</Link>
            <Link href="/register" className="w-full py-4 text-center bg-[#00F0FF] text-[#0F161E] font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)]">Get Started</Link>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-12 py-16 lg:py-24 text-center z-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          The industry standard <br />for AI literacy.
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-10">
          Explore our comprehensive module paths designed to take your team from foundational concepts to advanced generative AI security protocols.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm font-bold text-slate-300">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 4 Certification Paths</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 24 Modules</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> 120+ Interactive Syllabi</span>
        </div>
      </section>

      {/* Curriculum Paths */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 pb-24 z-10">

        {/* Path 1 */}
        <div className="bg-[#16212B] rounded-3xl border border-white/5 p-8 md:p-12 shadow-xl mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/5 blur-[80px] rounded-full group-hover:bg-[#00F0FF]/10 transition-colors pointer-events-none -mt-20 -mr-20"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#00F0FF]/10 flex items-center justify-center border border-[#00F0FF]/20 shrink-0">
              <BookOpen className="w-8 h-8 text-[#00F0FF]" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">1. Foundations of AI Automation</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                A non-technical introduction to what LLMs are, how they work, and their common use cases in the modern workplace.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 1.1: The AI Landscape</h4>
                  <p className="text-xs text-slate-500">Understanding predictive text vs generative reasoning.</p>
                </div>
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 1.2: Prompt Engineering Basics</h4>
                  <p className="text-xs text-slate-500">Writing effective instructions for predictable outputs.</p>
                </div>
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 1.3: Fact-checking & Hallucinations</h4>
                  <p className="text-xs text-slate-500">Identifying confident, yet incorrect, AI outputs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Path 2 */}
        <div className="bg-[#16212B] rounded-3xl border border-white/5 p-8 md:p-12 shadow-xl mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-colors pointer-events-none -mt-20 -mr-20"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <ShieldAlert className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">2. Data Privacy & Enterprise Security</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Critical training for handling sensitive corporate data, PII, and intellectual property when interacting with third-party APIs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 2.1: PII Redaction Protocols</h4>
                  <p className="text-xs text-slate-500">Sanitizing documents before LLM ingestion.</p>
                </div>
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 2.2: The Shadow IT Problem</h4>
                  <p className="text-xs text-slate-500">Risks of using unapproved generative tools.</p>
                </div>
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 2.3: Copyright & IP in Outputs</h4>
                  <p className="text-xs text-slate-500">Navigating the gray areas of AI-generated content ownership.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Path 3 */}
        <div className="bg-[#16212B] rounded-3xl border border-white/5 p-8 md:p-12 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-colors pointer-events-none -mt-20 -mr-20"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0">
              <Network className="w-8 h-8 text-indigo-400" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">3. Advanced System Integration (Technical)</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                For engineering teams: securely implementing RAG architectures, prompt injection defenses, and compliance-first system design.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 3.1: Securing RAG Pipelines</h4>
                  <p className="text-xs text-slate-500">Vector database access controls and multi-tenant isolation.</p>
                </div>
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 3.2: Defeating Prompt Injection</h4>
                  <p className="text-xs text-slate-500">Red-teaming techniques and input sanitization layers.</p>
                </div>
                <div className="bg-[#0F161E] border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Module 3.3: EU AI Act Architecture</h4>
                  <p className="text-xs text-slate-500">Technical requirements for logging, transparency, and bias testing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="w-full bg-[#121820] border-t border-white/5 py-12 px-6 md:px-12 mt-auto text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#00F0FF] flex items-center justify-center rotate-45">
            <div className="w-3 h-3 border-2 border-[#121820] -rotate-45"></div>
          </div>
          <span className="font-bold text-white">Sentinel Training</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
        </div>
        <p>© 2026 Sentinel Platforms. All rights reserved.</p>
      </footer>
    </div>
  );
}
