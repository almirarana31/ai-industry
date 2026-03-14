'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, CheckCircle2, HelpCircle, Shield, Zap, Globe } from 'lucide-react';

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [annualToggle, setAnnualToggle] = useState(true);

  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col items-center">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00F0FF]/10 via-[#0F161E] to-[#0F161E] -z-10 pointer-events-none"></div>

      {/* Public Navbar (Reused from landing page) */}
      <nav className="w-full max-w-7xl px-6 md:px-12 py-6 flex items-center justify-between z-50">
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="w-10 h-10 rounded-lg bg-[#00F0FF] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-5 h-5 border-[2.5px] border-[#0F161E] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">Sentinel <span className="font-light opacity-80">Training</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/curriculum" className="text-slate-300 hover:text-white transition-colors">Curriculum</Link>
          <Link href="/enterprise" className="text-slate-300 hover:text-white transition-colors">For Enterprise</Link>
          <Link href="/pricing" className="text-[#00F0FF] transition-colors">Pricing</Link>
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
          <Link href="/enterprise" onClick={() => setMobileMenuOpen(false)}>For Enterprise</Link>
          <Link href="/pricing" className="text-[#00F0FF]" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <div className="flex flex-col gap-4 mt-8 w-full max-w-xs px-6">
            <Link href="/login" className="w-full py-4 text-center border border-white/20 rounded-xl">Sign In</Link>
            <Link href="/register" className="w-full py-4 text-center bg-[#00F0FF] text-[#0F161E] font-bold rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)]">Get Started</Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full max-w-7xl px-6 md:px-12 py-16 lg:py-24 flex flex-col items-center z-10">

        {/* Header Section */}
        <div className="text-center max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            Transparent Pricing
          </div>
          <h1 className="text-4xl lg:text-5xl lg:leading-[1.1] font-bold text-white mb-6 tracking-tight">
            Secure your workforce.<br />Scale your literacy.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Choose the plan that fits your organization’s size and compliance requirements. Every plan includes core AI security modules.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!annualToggle ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnualToggle(!annualToggle)}
              className="w-14 h-7 bg-[#1C2836] border border-white/10 rounded-full relative p-1 transition-colors hover:border-[#00F0FF]/30"
            >
              <div className={`w-5 h-5 bg-[#00F0FF] rounded-full transition-transform shadow-[0_0_10px_rgba(0,240,255,0.5)] ${annualToggle ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-bold flex items-center gap-2 ${annualToggle ? 'text-white' : 'text-slate-500'}`}>
              Annually <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-500/30">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-24 relative">

          {/* Starter Plan */}
          <div className="bg-[#16212B] rounded-3xl border border-white/10 p-8 flex flex-col shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-white">Starter</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6 min-h-[40px]">Perfect for small teams building foundational AI literacy.</p>
            <div className="mb-8 flex items-end gap-1">
              <span className="text-4xl font-bold text-white tracking-tight">${annualToggle ? '39' : '49'}</span>
              <span className="text-slate-500 text-sm font-medium mb-1">/ seat / mo</span>
            </div>
            <Link href="/register" className="w-full bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold py-3 rounded-xl transition-colors text-center mb-8">
              Start Free Trial
            </Link>
            <div className="flex flex-col gap-4 mt-auto">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Features</p>
              <ul className="flex flex-col gap-3 text-sm text-slate-300">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" /> Core AI Literacy Modules</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" /> Basic Knowledge Assessments</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" /> Community Access</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" /> Standard Email Support</li>
              </ul>
            </div>
          </div>

          {/* Professional Plan (Highlighted) */}
          <div className="bg-gradient-to-b from-[#1c2c3d] to-[#121c27] rounded-3xl border border-[#00F0FF]/50 p-8 flex flex-col shadow-[0_0_30px_rgba(0,240,255,0.15)] relative transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-300 z-10">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00F0FF] text-[#0F161E] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] whitespace-nowrap">
              Most Popular
            </div>

            <div className="flex items-center gap-3 mb-4 mt-2">
              <Shield className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="text-lg font-bold text-white">Professional</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6 min-h-[40px]">Advanced modules and reporting for growing organizations.</p>
            <div className="mb-8 flex items-end gap-1">
              <span className="text-4xl font-bold text-white tracking-tight">${annualToggle ? '79' : '99'}</span>
              <span className="text-slate-500 text-sm font-medium mb-1">/ seat / mo</span>
            </div>
            <Link href="/register" className="w-full bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold py-3 rounded-xl transition-colors text-center mb-8 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              Get Started
            </Link>
            <div className="flex flex-col gap-4 mt-auto">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Everything in Starter, plus:</p>
              <ul className="flex flex-col gap-3 text-sm text-slate-300">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#00F0FF] mt-0.5 shrink-0" /> Advanced Security Protocols</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#00F0FF] mt-0.5 shrink-0" /> Generative AI Specialist Path</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#00F0FF] mt-0.5 shrink-0" /> Manager Analytics Dashboard</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#00F0FF] mt-0.5 shrink-0" /> Single Sign-On (SSO)</li>
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[#16212B] rounded-3xl border border-white/10 p-8 flex flex-col shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Enterprise</h3>
            </div>
            <p className="text-sm text-slate-400 mb-6 min-h-[40px]">Custom compliance frameworks and dedicated support.</p>
            <div className="mb-8 flex items-end gap-1">
              <span className="text-4xl font-bold text-white tracking-tight">Custom</span>
            </div>
            <Link href="/enterprise" className="w-full bg-[#1C2836] hover:bg-white/10 border border-white/5 text-white font-bold py-3 rounded-xl transition-colors text-center mb-8">
              Contact Sales
            </Link>
            <div className="flex flex-col gap-4 mt-auto">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Everything in Pro, plus:</p>
              <ul className="flex flex-col gap-3 text-sm text-slate-300">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> Custom Module Creation</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> SCORM Exports for LMS</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> Dedicated Success Manager</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> White-label Branding</li>
              </ul>
            </div>
          </div>

        </div>

        {/* FAQs Section */}
        <div className="w-full max-w-4xl border-t border-white/10 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">Can't find the answer you're looking for? Reach out to our team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#16212B]/50 p-6 rounded-2xl border border-white/5">
              <h4 className="text-lg font-bold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" /> Can I change plans later?
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed ml-7">
                Yes, you can upgrade, downgrade, or cancel your subscription at any time. Prorated charges or credits will be automatically applied.
              </p>
            </div>
            <div className="bg-[#16212B]/50 p-6 rounded-2xl border border-white/5">
              <h4 className="text-lg font-bold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" /> What payment methods do you accept?
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed ml-7">
                We accept all major credit cards. For Enterprise plans, we also support invoicing and ACH transfers.
              </p>
            </div>
            <div className="bg-[#16212B]/50 p-6 rounded-2xl border border-white/5">
              <h4 className="text-lg font-bold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" /> Do you offer discounts for non-profits?
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed ml-7">
                Yes, we offer a 50% discount on all plans for qualifying non-profit organizations and educational institutions. Contact support to apply.
              </p>
            </div>
            <div className="bg-[#16212B]/50 p-6 rounded-2xl border border-white/5">
              <h4 className="text-lg font-bold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" /> Is my data secure?
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed ml-7">
                Security is our core offering. We are SOC2 Type II certified and fully compliant with GDPR and the upcoming EU AI Act data handling requirements.
              </p>
            </div>
          </div>
        </div>

      </main>

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
