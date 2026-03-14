'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldAlert,
  Menu,
  CreditCard,
  Bell,
  CheckCircle2,
  Blocks
} from 'lucide-react';

export default function IntegrationsSettingsPage() {
  const [slackActive, setSlackActive] = useState(true);
  const [teamsActive, setTeamsActive] = useState(false);
  const [oktaActive, setOktaActive] = useState(true);
  const [entraActive, setEntraActive] = useState(false);

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

            <Link href="/settings/profile" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <User className="w-5 h-5" /> Account Profile
            </Link>
            <Link href="/settings/privacy" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
              <ShieldAlert className="w-5 h-5" /> Security & Privacy
            </Link>
            <Link href="/settings/integrations" className="flex items-center gap-4 px-4 py-3 text-[#00F0FF] bg-[#00F0FF]/10 rounded-xl font-bold text-sm transition-colors">
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
        <div className="flex-1 flex flex-col max-w-4xl">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Enterprise Tool Integrations</h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">Connect your existing workforce tools to automate enrollment, sync progress, and enable seamless single sign-on for your entire organization.</p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex gap-8 border-b border-white/10 mb-8">
            <button className="text-[#00F0FF] font-semibold text-sm pb-4 border-b-2 border-[#00F0FF]">Communication</button>
            <button className="text-slate-400 hover:text-white font-semibold text-sm pb-4 border-b-2 border-transparent transition-colors">Identity (SSO)</button>
            <button className="text-slate-400 hover:text-white font-semibold text-sm pb-4 border-b-2 border-transparent transition-colors">Learning Management (LMS)</button>
            <button className="text-slate-400 hover:text-white font-semibold text-sm pb-4 border-b-2 border-transparent transition-colors">Data Export</button>
          </div>

          {/* Communication Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

            {/* Slack Card */}
            <div className="bg-[#16212B] border border-white/5 hover:border-[#00F0FF]/30 rounded-2xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    {/* Placeholder for Slack Icon */}
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522-2.52H15.165z" /></svg>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-[#00F0FF]/15 text-[#00F0FF] px-2.5 py-1 rounded-full">Active</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Slack</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Send course reminders, daily AI tips, and certification notifications directly to Slack channels.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-500 font-medium">Last synced: 2h ago</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-300">Settings</span>
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${slackActive ? 'bg-[#00F0FF]' : 'bg-slate-700'}`}
                    onClick={() => setSlackActive(!slackActive)}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${slackActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Microsoft Teams Card */}
            <div className="bg-[#16212B] border border-white/5 hover:border-[#00F0FF]/30 rounded-2xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-lg">
                    {/* Placeholder for Teams Icon - "T" */}
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 text-slate-400 px-2.5 py-1 rounded-full border border-white/10">Not Configured</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Microsoft Teams</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Integrate training modules directly into Teams tabs and enable automated bot reminders.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-500 font-medium italic">Ready to connect</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-300">Connect</span>
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${teamsActive ? 'bg-[#00F0FF]' : 'bg-slate-700'}`}
                    onClick={() => setTeamsActive(!teamsActive)}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${teamsActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Identity Providers Header */}
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#00F0FF]" />
            <h2 className="text-xl font-bold text-white">Identity Providers</h2>
          </div>

          {/* Identity Providers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

            {/* Okta Card */}
            <div className="bg-[#16212B] border border-white/5 hover:border-[#00F0FF]/30 rounded-2xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                    {/* Placeholder for Okta */}
                    <div className="w-6 h-6 rounded-full border-4 border-slate-800"></div>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-[#00F0FF]/15 text-[#00F0FF] px-2.5 py-1 rounded-full">Active</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Okta</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Provision and deprovision users automatically. Secure access with Enterprise Single Sign-On.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400 font-medium">SSO + Provisioning Enabled</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-300">Configure</span>
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${oktaActive ? 'bg-[#00F0FF]' : 'bg-slate-700'}`}
                    onClick={() => setOktaActive(!oktaActive)}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${oktaActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Microsoft Entra ID Card */}
            <div className="bg-[#16212B] border border-white/5 hover:border-[#00F0FF]/30 rounded-2xl p-6 shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg p-2.5">
                    {/* Placeholder for Microsoft */}
                    <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                      <div className="bg-[#F25022]"></div>
                      <div className="bg-[#7FBA00]"></div>
                      <div className="bg-[#00A4EF]"></div>
                      <div className="bg-[#FFB900]"></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 text-slate-400 px-2.5 py-1 rounded-full border border-white/10">Not Configured</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Microsoft Entra ID</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Formerly Azure AD. Sync your corporate directory and enable seamless sign-in for Microsoft accounts.</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-500 font-medium italic">Setup required</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-300">Connect</span>
                  <div
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${entraActive ? 'bg-[#00F0FF]' : 'bg-slate-700'}`}
                    onClick={() => setEntraActive(!entraActive)}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${entraActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Custom Integration CTA Banner */}
          <div className="bg-gradient-to-r from-[#113133] to-[#16212B] border border-[#0D9488]/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-[#0D9488]/20 flex items-center justify-center shrink-0">
                <Blocks className="w-7 h-7 text-[#00F0FF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Need a custom integration?</h3>
                <p className="text-sm text-slate-400">Our API allows you to build custom connections for your internal infrastructure.</p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-transparent hover:bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 font-bold text-sm px-6 py-3 rounded-lg transition-colors">
              View API Docs
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}
