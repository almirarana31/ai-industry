'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldAlert,
  Menu,
  CreditCard,
  Bell,
  Camera,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function ProfileSettingsPage() {
  const [publicProfile, setPublicProfile] = useState(true);

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
            <Link href="/training" className="text-slate-400 hover:text-white transition-colors">Courses</Link>
            <Link href="/settings/profile" className="text-[#0D9488] border-b-2 border-[#0D9488] pb-6 pt-6">Settings</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group hidden md:block">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              type="text"
              placeholder="Search resources..."
              className="bg-[#1C2836] text-sm text-slate-300 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 w-64 border border-transparent focus:outline-none focus:border-[#0D9488]/30 transition-colors"
            />
          </div>

          <div className="w-10 h-10 rounded-full bg-[#1C2836] flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-slate-400" />
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-[#16212B] flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm tracking-tighter">AR</span>
          </div>
        </div>
      </nav>

      {/* Main Settings Layout */}
      <main className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">

        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-8">

          <div className="flex flex-col gap-1">
            <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3 px-4">System Settings</h4>

            <Link href="/settings/profile" className="flex items-center gap-4 px-4 py-3 text-[#00F0FF] bg-[#00F0FF]/10 rounded-xl font-bold text-sm transition-colors">
              <User className="w-5 h-5" /> Account Profile
            </Link>
            <Link href="/settings/privacy" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <ShieldAlert className="w-5 h-5" /> Security & Privacy
            </Link>
            <Link href="/settings/integrations" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <Menu className="w-5 h-5" /> Integrations
            </Link>
            <Link href="#billing" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <CreditCard className="w-5 h-5" /> Billing & Plan
            </Link>
            <Link href="#notifications" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <Bell className="w-5 h-5" /> Notifications
            </Link>
          </div>

          {/* Pro Member Status Widget */}
          <div className="bg-[#1C2836]/40 border border-[#00F0FF]/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <h3 className="text-[10px] font-bold text-[#00F0FF] tracking-widest uppercase mb-3">Pro Member Status</h3>
            <p className="text-sm text-slate-300 font-medium mb-4 leading-relaxed">
              You have access to all enterprise training modules.
            </p>
            <div className="h-1.5 w-full bg-[#0F161E] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00F0FF] to-blue-500 w-[85%]"></div>
            </div>
          </div>

        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6 max-w-3xl">

          {/* Header */}
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Account Profile</h1>
            <p className="text-slate-400 text-sm">Manage your public presence and professional credentials on the Sentinel platform.</p>
          </div>

          {/* Avatar Card */}
          <div className="bg-[#16212B] border border-white/5 rounded-2xl p-6 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ffd89e] to-[#e49b6d] border-4 border-[#16212B] shadow-lg flex items-center justify-center overflow-hidden">
                  {/* Avatar Placeholder */}
                  <svg className="w-16 h-16 text-white/50 transform translate-y-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#00F0FF] rounded-full flex items-center justify-center shadow-lg border-2 border-[#16212B] hover:scale-110 transition-transform">
                  <Camera className="w-3.5 h-3.5 text-[#0F161E]" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Alex Rivera</h2>
                <p className="text-sm text-slate-400 mb-2">Senior AI Strategy Consultant</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-[#00F0FF]/10 text-[#00F0FF] px-2 py-1 rounded">Certified Expert</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 text-slate-300 px-2 py-1 rounded border border-white/10">Instructor</span>
                </div>
              </div>
            </div>
            <button className="bg-[#1C2836] hover:bg-[#253446] border border-white/5 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Replace Photo
            </button>
          </div>

          {/* Personal Details Card */}
          <div className="bg-[#16212B] border border-white/5 rounded-2xl p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Personal Details</h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">First Name</label>
                <input
                  type="text"
                  defaultValue="Alex"
                  className="bg-[#0F161E] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">Last Name</label>
                <input
                  type="text"
                  defaultValue="Rivera"
                  className="bg-[#0F161E] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">Email Address</label>
              <input
                type="email"
                defaultValue="alex.rivera@enterprise-ai.com"
                className="bg-[#0F161E] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">Bio</label>
              <textarea
                rows={3}
                defaultValue="Expert in Generative AI implementation for Fortune 500 companies. Focused on ethical AI scaling and literacy."
                className="bg-[#0F161E] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Middle Togglers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#16212B] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">Public Profile</h4>
                <div
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${publicProfile ? 'bg-[#00F0FF]' : 'bg-slate-700'}`}
                  onClick={() => setPublicProfile(!publicProfile)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${publicProfile ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
              <p className="text-sm text-slate-400">Make your profile and certifications visible to potential employers.</p>
            </div>

            <div className="bg-[#16212B] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">LinkedIn Sync</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
                  <span className="text-[10px] font-bold text-[#00F0FF] tracking-wider uppercase">Connected</span>
                </div>
              </div>
              <p className="text-sm text-slate-400">Automatically post certification milestones to your LinkedIn feed.</p>
            </div>
          </div>

          {/* Security Credentials */}
          <div className="bg-[#16212B] border border-white/5 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 14v1.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 15.5V14m3-3h.01M12 11a1 1 0 100-2 1 1 0 000 2zm6 2a2 2 0 11-4 0m-4-2a2 2 0 10-4 0m8 2H5m14 0h-4z" />
              </svg>
              <h3 className="text-lg font-bold text-white">Security Credentials</h3>
            </div>

            <div className="flex flex-col gap-2 mb-6 relative">
              <label className="text-xs font-semibold text-slate-400 tracking-wide">Current Password</label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="bg-[#0F161E] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
              />
              <Eye className="absolute right-4 top-9 w-4 h-4 text-slate-500 cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="bg-[#0F161E] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors placeholder-slate-600"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Repeat new password"
                  className="bg-[#0F161E] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F0FF]/50 transition-colors placeholder-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-6 mt-2 mb-8">
            <button className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
              Discard Changes
            </button>
            <button className="bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] text-sm font-bold px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:-translate-y-0.5">
              Save Profile Changes
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#1C1616] border border-red-500/20 rounded-2xl p-8 flex items-center justify-between shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-red-500 mb-1">Delete Account</h3>
              <p className="text-sm text-slate-400">Permanently remove your account and all associated certification data.</p>
            </div>
            <button className="border border-red-500 hover:bg-red-500/10 text-red-500 text-sm font-bold px-6 py-2.5 rounded-lg transition-colors">
              Delete Account
            </button>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-auto px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-sm text-slate-500">© 2025 Sentinel. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
