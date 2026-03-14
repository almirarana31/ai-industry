'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  HelpCircle,
  FileText,
  User,
  ShieldAlert,
  Lock,
  Menu,
  CreditCard,
  BarChart,
  Brain,
  Trophy,
  Network,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useConsentStore } from '@/store/consent.store';

export default function PrivacySettingsPage() {
  const {
    consentData,
    isLoading,
    isSaving,
    error,
    fetchConsent,
    updateConsent,
    toggleConsent,
    syncConsent,
  } = useConsentStore();

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Fetch consent data on mount
  useEffect(() => {
    fetchConsent();
  }, [fetchConsent]);

  // Handle toggle
  const handleToggle = (code: string) => {
    toggleConsent(code);
  };

  // Handle save
  const handleSave = async () => {
    if (!consentData) return;

    const updates = consentData.consents.map(c => ({
      code: c.code,
      is_agree: c.is_agree,
    }));

    await updateConsent(updates);

    if (!error) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } else {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
    }
  };

  // Handle sync
  const handleSync = async () => {
    await syncConsent();
    if (!error) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  // Get consent by code helper
  const getConsentByCode = (code: string) => {
    return consentData?.consents.find(c => c.code === code);
  };

  return (
    <div className="min-h-screen bg-[#111A1B] text-slate-200 font-sans flex flex-col">

      {/* Top Simple Navbar */}
      <nav className="h-20 bg-[#162325] border-b border-[#0D9488]/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-12">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-[#0D9488] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform">
              <div className="w-4 h-4 border-2 border-[#162325] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">AI Literacy <span className="font-light opacity-80">Academy</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium pl-8 border-l border-white/5">
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/courses" className="text-slate-400 hover:text-white transition-colors">Courses</Link>
            <Link href="/settings/privacy" className="text-[#0D9488] border-b-2 border-[#0D9488] pb-6 pt-6">Privacy</Link>
            <Link href="/settings" className="text-slate-400 hover:text-white transition-colors">Settings</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group hidden md:block">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input
              type="text"
              placeholder="Search resources..."
              className="bg-[#1C2C2E] text-sm text-slate-300 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 w-64 border border-transparent focus:outline-none focus:border-[#0D9488]/30 transition-colors"
            />
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-[#162325] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden">
            {/* Replace with an image or initials. Using initials for visual similarity to mockup */}
            <span className="text-orange-900 font-bold text-sm tracking-tighter">AR</span>
          </div>
        </div>
      </nav>

      {/* Main Settings Layout */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

          {/* Left Sidebar Menu */}
          <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">

            <div className="flex flex-col gap-1">
              <Link href="/settings/profile" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
                <User className="w-5 h-5" /> Profile Details
              </Link>
              <Link href="/settings/security" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
                <ShieldAlert className="w-5 h-5" /> Account Security
              </Link>
              <Link href="/settings/privacy" className="flex items-center gap-4 px-4 py-3 text-[#0D9488] bg-[#0D9488]/10 rounded-xl font-bold text-sm">
                <Lock className="w-5 h-5 text-[#0D9488]" /> Data Authorization
              </Link>
              <Link href="/settings/integrations" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
                <Menu className="w-5 h-5" /> Integrations
              </Link>
              <Link href="/settings/billing" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm">
                <CreditCard className="w-5 h-5" /> Subscription
              </Link>
            </div>

            {/* Privacy Score Widget */}
            <div className="bg-[#1C2C2E] border-l-4 border-[#0D9488] rounded-xl rounded-l-none p-5 shadow-lg mt-4">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#0D9488]" />
                <h3 className="text-white font-bold text-sm">Privacy Impact</h3>
              </div>

              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#0D9488]/20 text-[#0D9488] px-2 py-0.5 rounded">OPTIMAL SCORE</span>
                <span className="text-sm font-bold text-[#0D9488]">84/100</span>
              </div>

              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[#0D9488] w-[84%]"></div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Your current settings strike a perfect balance between personal privacy and AI performance enhancement.
              </p>
            </div>

            {/* Resources Menu */}
            <div className="bg-[#1C2C2E]/50 border border-white/5 rounded-xl p-5">
              <h4 className="text-[10px] font-bold tracking-widest text-[#0D9488] uppercase mb-4">RESOURCES</h4>
              <div className="flex flex-col gap-3">
                <Link href="#" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                  <FileText className="w-4 h-4 text-slate-500" /> Privacy Policy
                </Link>
                <Link href="#" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                  <ShieldCheck className="w-4 h-4 text-slate-500" /> Data Safety Shield
                </Link>
                <Link href="#" className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                  <HelpCircle className="w-4 h-4 text-slate-500" /> Consent FAQ
                </Link>
              </div>
            </div>

          </aside>

          {/* Main Content Area */}
          <div className="flex-1 bg-[#162325] border border-white/5 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">

            {/* Decorative background glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#0D9488] opacity-5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="max-w-2xl relative z-10">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-3xl font-black text-white tracking-tight">Data Authorization & Consent</h1>
                <button
                  onClick={handleSync}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                  title="Sync with Privasimu"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Sync
                </button>
              </div>
              <p className="text-slate-400 leading-relaxed mb-2">
                Control how your interaction data shapes your AI learning journey. Transparency is our priority.
              </p>
              {consentData?.lastSyncedAt && (
                <p className="text-xs text-slate-500 mb-10">
                  Last synced: {new Date(consentData.lastSyncedAt).toLocaleString()}
                </p>
              )}

              {/* Loading State */}
              {isLoading && !consentData && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-[#0D9488] animate-spin" />
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-red-500 font-bold text-sm mb-1">Error Loading Consent Data</h3>
                    <p className="text-red-400 text-xs">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">

                {/* Render consent items dynamically from API */}
                {consentData?.consents.map((consent, index) => {
                  const icons = [BarChart, Brain, Trophy, Network];
                  const colors = ['[#0D9488]', '[#0D9488]', 'orange-500', 'indigo-400'];
                  const Icon = icons[index % icons.length];
                  const color = colors[index % colors.length];

                  return (
                    <div
                      key={consent.code}
                      className="bg-[#1A2A2D] border border-white/5 hover:border-[#0D9488]/30 rounded-2xl p-6 flex items-start gap-5 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center shrink-0 group-hover:bg-${color}/20 transition-colors`}>
                        <Icon className={`w-5 h-5 text-${color}`} />
                      </div>
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="text-white font-bold text-base mb-1">{consent.name}</h3>
                        <p className="text-sm text-slate-400 leading-snug">
                          {consent.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle(consent.code)}
                        disabled={isLoading || isSaving}
                        className={`shrink-0 w-12 h-6 rounded-full transition-colors relative flex items-center disabled:opacity-50 ${consent.is_agree ? 'bg-[#0D9488]' : 'bg-slate-700'}`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${consent.is_agree ? 'translate-x-6' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                  );
                })}

              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-6 mt-12 pt-8 border-t border-white/5">
                <button
                  onClick={() => fetchConsent()}
                  disabled={isLoading}
                  className="text-slate-300 hover:text-white font-bold text-sm transition-colors disabled:opacity-50"
                >
                  Reset to Saved
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading || isSaving || !consentData}
                  className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#0D9488]/20 hover:shadow-[#0D9488]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Preferences'
                  )}
                </button>
              </div>

              {/* Success Toast */}
              {showSuccessToast && (
                <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold">Preferences saved successfully!</span>
                </div>
              )}

              {/* Error Toast */}
              {showErrorToast && (
                <div className="fixed bottom-8 right-8 bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-bold">Failed to save preferences</span>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-[10px] text-slate-600 font-medium shrink-0 max-w-6xl mx-auto w-full flex justify-between px-8">
        <span>© 2024 Sentinel. Secure Enterprise Edition.</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
          <Link href="#" className="hover:text-slate-400">GDPR Compliance</Link>
          <Link href="#" className="hover:text-slate-400">Contact Support</Link>
        </div>
      </footer>
    </div>
  );
}
                <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-white font-bold text-base mb-1">Team Leaderboard Visibility</h3>
                    <p className="text-sm text-slate-400 leading-snug">
                      Display your progress scores on the organizational leaderboard.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('leaderboard')}
                    className={`shrink-0 w-12 h-6 rounded-full transition-colors relative flex items-center ${toggles.leaderboard ? 'bg-[#0D9488]' : 'bg-slate-700'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${toggles.leaderboard ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>

                {/* Toggle Item 4 */}
                <div className="bg-[#1A2A2D] border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 flex items-start gap-5 transition-colors group opacity-80 hover:opacity-100">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                    <Network className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-white font-bold text-base mb-1">Third-Party AI Evaluation</h3>
                    <p className="text-sm text-slate-400 leading-snug">
                      Send metadata to verified partners for advanced literacy scoring.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('thirdParty')}
                    className={`shrink-0 w-12 h-6 rounded-full transition-colors relative flex items-center ${toggles.thirdParty ? 'bg-[#0D9488]' : 'bg-slate-700'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${toggles.thirdParty ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </button>
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-6 mt-12 pt-8 border-t border-white/5">
                <button className="text-slate-300 hover:text-white font-bold text-sm transition-colors">
                  Reset Defaults
                </button>
                <button className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#0D9488]/20 hover:shadow-[#0D9488]/40">
                  Save Preferences
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-[10px] text-slate-600 font-medium shrink-0 max-w-6xl mx-auto w-full flex justify-between px-8">
        <span>© 2024 Sentinel. Secure Enterprise Edition.</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
          <Link href="#" className="hover:text-slate-400">GDPR Compliance</Link>
          <Link href="#" className="hover:text-slate-400">Contact Support</Link>
        </div>
      </footer>
    </div>
  );
}
