'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Settings,
  Shield,
  Smartphone,
  Laptop,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function SecuritySettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

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
            <Link href="/settings/security" className="text-sm font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-4 py-2.5 rounded-lg transition-colors">
              Login & Security
            </Link>
            <Link href="/settings/privacy" className="text-sm text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">
              Data Privacy
            </Link>
            <Link href="/settings/integrations" className="text-sm text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">
              Enterprise Integrations
            </Link>
            <Link href="/settings/billing" className="text-sm text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-colors">
              Billing & Plans
            </Link>
          </nav>
        </aside>

        {/* Main Settings Area */}
        <main className="flex-1 overflow-y-auto w-full p-8 md:p-12">
          <div className="max-w-3xl mx-auto">

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Login & Security</h1>
              <p className="text-slate-400">Manage your password, 2-step verification, and active sessions.</p>
            </div>

            {/* Two-Factor Authentication Card */}
            <div className="bg-[#16212B] rounded-2xl border border-white/5 p-8 mb-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center border border-[#00F0FF]/20 shrink-0">
                  <Shield className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    Two-Factor Authentication (2FA)
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">Enabled</span>
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-lg mb-4">
                    Protect your account from unauthorized access by requiring a second authentication method in addition to your Sentinel password.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2836] border border-white/5 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Authenticator App</h4>
                  <p className="text-xs text-slate-500">Primary method (e.g., Google Authenticator, Authy)</p>
                </div>
                <button className="bg-transparent border border-white/10 hover:bg-white/5 text-slate-300 font-bold text-sm px-4 py-2 rounded-lg transition-colors">
                  Edit
                </button>
              </div>
            </div>

            {/* Active Sessions Card */}
            <div className="bg-[#16212B] rounded-2xl border border-white/5 p-8 shadow-lg">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Active Sessions</h3>
                <p className="text-sm text-slate-400">Review the devices that are currently logged into your account.</p>
              </div>

              <div className="flex flex-col">

                {/* Current Device */}
                <div className="flex items-center justify-between py-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1C2836] flex items-center justify-center shrink-0">
                      <Laptop className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        MacBook Pro 16"
                        <span className="bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-[#00F0FF]/20">This Device</span>
                      </h4>
                      <p className="text-xs text-slate-500">San Francisco, CA • Chrome 120.0 • Active now</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>

                {/* Mobile Device */}
                <div className="flex items-center justify-between py-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1C2836] flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">iPhone 14 Pro Max</h4>
                      <p className="text-xs text-slate-500">San Jose, CA • iOS App • Last active 3h ago</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors">
                    Log out
                  </button>
                </div>

                {/* Suspicious Device */}
                <div className="flex items-center justify-between py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                      <Laptop className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        Windows 11 PC
                        <span className="bg-red-500/20 text-red-400 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-red-500/30 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Unrecognized IP
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500">London, UK • Edge 119.0 • Last active Yesterday</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-all text-white">
                    Revoke Access
                  </button>
                </div>

              </div>

              <div className="mt-6 pt-6 border-t border-white/5 text-right">
                <button className="text-sm font-bold text-red-400 hover:text-red-300 hover:underline underline-offset-4 transition-all">
                  Log out of all devices
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
