'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Settings,
  CreditCard,
  Download,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function BillingSettingsPage() {
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
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/certifications" className="text-slate-400 hover:text-white transition-colors">Certifications</Link>
            <Link href="/settings/profile" className="text-[#00F0FF] border-b-2 border-[#00F0FF] pb-6 pt-6 tracking-wide">Settings</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/settings/profile" className="w-9 h-9 rounded-full bg-[#1C2836] flex items-center justify-center hover:bg-white/10 transition-colors">
            <Bell className="w-4 h-4 text-[#00F0FF]" />
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-[#16212B] flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform">
            <span className="text-white font-bold text-sm tracking-tighter">AR</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar Layout */}
        <aside className="w-64 bg-[#16212B] border-r border-white/5 p-6 hidden md:block">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Account Settings</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/settings/profile" className="text-sm text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">
              Account Profile
            </Link>
            <Link href="/settings/security" className="text-sm text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">
              Login & Security
            </Link>
            <Link href="/settings/privacy" className="text-sm text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">
              Data Privacy
            </Link>
            <Link href="/settings/integrations" className="text-sm text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">
              Enterprise Integrations
            </Link>
            <Link href="/settings/billing" className="text-sm font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-4 py-2.5 rounded-lg transition-colors">
              Billing & Plans
            </Link>
          </nav>
        </aside>

        {/* Main Settings Area */}
        <main className="flex-1 overflow-y-auto w-full p-8 md:p-12">
          <div className="max-w-4xl mx-auto">

            <div className="mb-10 flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Billing & Plans</h1>
                <p className="text-slate-400">Manage your subscription, payment methods, and billing history.</p>
              </div>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold px-4 py-2 mt-4 md:mt-0 rounded-lg transition-colors">
                Contact Support
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

              {/* Current Plan Card */}
              <div className="md:col-span-2 bg-[#16212B] rounded-2xl border border-[#00F0FF]/20 p-8 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F0FF]/10 blur-[80px] rounded-full pointer-events-none -mt-20 -mr-20"></div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                      Sentinel Professional
                      <span className="bg-[#00F0FF]/20 text-[#00F0FF] text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-[#00F0FF]/30">Current Plan</span>
                    </h3>
                    <p className="text-sm text-slate-400">Billed annually ($1,200/year)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white tracking-tight">$100<span className="text-sm text-slate-500 font-medium">/mo</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Up to 50 active learners
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Advanced LLM Modules
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Manager Analytics
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> Single Sign-On (SSO)
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <button className="bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold text-sm px-6 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    Manage Subscription
                  </button>
                  <button className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors">
                    Cancel Plan
                  </button>
                </div>
              </div>

              {/* Upgrade Promo Card */}
              <div className="bg-gradient-to-b from-[#1c2c3d] to-[#121c27] rounded-2xl border border-indigo-500/30 p-8 shadow-xl flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Upgrade to Enterprise</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Need custom compliance modules and dedicated SCORM exports?
                </p>
                <Link href="/enterprise" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  Contact Sales
                </Link>
              </div>
            </div>

            {/* Payment Method & History Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Payment Method */}
              <div className="bg-[#16212B] rounded-2xl border border-white/5 p-8 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">Payment Method</h3>
                  <button className="text-sm font-bold text-[#00F0FF] hover:text-[#00e0ef] transition-colors">Update</button>
                </div>

                <div className="bg-[#1C2836] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center border border-white/10 shrink-0">
                    <CreditCard className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                    <p className="text-xs text-slate-500">Expires 12/26</p>
                  </div>
                  <span className="bg-slate-700 text-slate-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Default</span>
                </div>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  Your next billing date is <span className="font-bold text-slate-300">March 14, 2026</span> for the amount of <span className="font-bold text-slate-300">$1,200</span>.
                </p>
              </div>

              {/* Billing History */}
              <div className="bg-[#16212B] rounded-2xl border border-white/5 p-8 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-6">Billing History</h3>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div>
                      <p className="text-sm font-bold text-white">Mar 14, 2025</p>
                      <p className="text-xs text-slate-500">Sentinel Professional - Annual</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-white">$1,200</span>
                      <button className="text-slate-400 hover:text-[#00F0FF] transition-colors"><Download className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div>
                      <p className="text-sm font-bold text-white">Mar 14, 2024</p>
                      <p className="text-xs text-slate-500">Sentinel Professional - Annual</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-white">$1,200</span>
                      <button className="text-slate-400 hover:text-[#00F0FF] transition-colors"><Download className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Mar 14, 2023</p>
                      <p className="text-xs text-slate-500">Sentinel Starter - Annual</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-white">$450</span>
                      <button className="text-slate-400 hover:text-[#00F0FF] transition-colors"><Download className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
