'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, ShieldCheck, Database, Sliders, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function EnterprisePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-[#0F161E] to-[#0F161E] -z-10 pointer-events-none"></div>

      {/* Public Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-50">
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="w-10 h-10 rounded-lg bg-[#00F0FF] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-5 h-5 border-[2.5px] border-[#0F161E] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">Sentinel <span className="font-light opacity-80">Training</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/curriculum" className="text-slate-300 hover:text-white transition-colors">Curriculum</Link>
          <Link href="/enterprise" className="text-[#00F0FF] transition-colors">For Enterprise</Link>
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
          <Link href="/curriculum" onClick={() => setMobileMenuOpen(false)}>Curriculum</Link>
          <Link href="/enterprise" className="text-[#00F0FF]" onClick={() => setMobileMenuOpen(false)}>For Enterprise</Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <div className="flex flex-col gap-4 mt-8 w-full max-w-xs px-6">
            <Link href="/login" className="w-full py-4 text-center border border-white/20 rounded-xl">Sign In</Link>
            <Link href="/register" className="w-full py-4 text-center bg-[#00F0FF] text-[#0F161E] font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)]">Get Started</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">

        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
            Sentinel Enterprise Architecture
          </div>
          <h1 className="text-4xl lg:text-6xl lg:leading-[1.1] font-bold text-white mb-6 tracking-tight">
            Deploy AI safety at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#00F0FF]">global scale.</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-10">
            Equip your workforce with secure LLM practices. Integrate directly with your existing LMS via SCORM, enforce SSO, and manage compliance across thousands of employees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transform hover:-translate-y-0.5 whitespace-nowrap">
              Contact Enterprise Sales
            </button>
            <Link href="/pricing" className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
              View Standard Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sales Form Card */}
        <div className="bg-[#16212B]/80 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none -mt-20 -mr-20"></div>
          <h3 className="text-2xl font-bold text-white mb-2">Request a Demo</h3>
          <p className="text-sm text-slate-400 mb-8">Discuss custom compliance modules and integration requirements.</p>

          <form className="flex flex-col gap-5 relative z-10">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">First Name</label>
                <input type="text" className="bg-[#0F161E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Jane" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
                <input type="text" className="bg-[#0F161E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Doe" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Work Email</label>
              <input type="email" className="bg-[#0F161E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="jane@company.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Size</label>
              <select className="bg-[#0F161E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer">
                <option>100 - 499 employees</option>
                <option>500 - 999 employees</option>
                <option>1,000 - 4,999 employees</option>
                <option>5,000+ employees</option>
              </select>
            </div>

            <button className="w-full bg-white hover:bg-slate-200 text-[#0F161E] font-bold px-8 py-4 rounded-xl transition-colors mt-2">
              Submit Request
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-2">
              By submitting this form, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </form>
        </div>

      </section>

      {/* Feature Grid */}
      <section className="w-full bg-[#121820] py-24 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Built for the modern enterprise</h2>
            <p className="text-lg text-slate-400">
              Sentinel Enterprise provides the administrative controls necessary to manage risk across thousands of LLM endpoints and human interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Enterprise-Grade Security</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  SAML-based Single Sign-On (SSO), advanced Role-Based Access Control (RBAC), and automated provisioning via SCIM.
                </p>
                <ul className="flex flex-col gap-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Okta & Azure AD Integration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> SOC2 Type II Certified</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center shrink-0">
                <Database className="w-6 h-6 text-[#00F0FF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">LMS & SCORM Integration</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Export Sentinel training modules directly to your existing Learning Management System using standard SCORM 1.2 or 2004 endpoints.
                </p>
                <ul className="flex flex-col gap-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Workday & Cornerstone Support</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Automated Grade Syncing</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Sliders className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Custom Corporate Modules</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Work with our instructional design team to build custom AI literacy modules tailored specifically to your internal data policies and engineering stack.
                </p>
                <ul className="flex flex-col gap-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Proprietary Concept Integration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> White-label Branding</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Dedicated Success Manager</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Get a dedicated Customer Success Manager (CSM) to help you define KPI targets, analyze compliance reports, and map out quarterly training goals.
                </p>
                <ul className="flex flex-col gap-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Quarterly Business Reviews (QBRs)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority SLAs</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#121820] py-12 px-6 md:px-12 mt-auto text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-6">
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
