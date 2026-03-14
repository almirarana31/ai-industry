'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function TermsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F161E] text-slate-200 font-sans flex flex-col">
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
          <Link href="/enterprise" className="text-slate-300 hover:text-white transition-colors">For Enterprise</Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-12">Effective Date: March 1, 2026</p>

        <div className="prose prose-invert prose-slate max-w-none">
          <p>
            Welcome to Sentinel Training ("we", "us", "our"). By accessing or using our platform
            located at sentinel-training.com (the "Service"), you agree to comply with and be bound
            by the following terms and conditions.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. License & Usage</h2>
          <p>We grant you a limited, non-exclusive, non-transferable license to access our training materials
            for your internal personal or corporate educational purposes. The copying, redistribution, or unauthorized
            SCORM extraction of modules outside of Enterprise agreements is strictly prohibited.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Account Responsibility</h2>
          <p>If you create an account, you are responsible for maintaining the security of your password
            and for all activities that occur under the account. You must immediately notify us of any unauthorized
            uses of your account or any other breaches of security.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Subscriptions & Billing</h2>
          <p>Certain components of our Service are billed on a subscription basis ("Subscriptions"). You will be
            billed in advance on a recurring schedule. Enterprise customers may utilize invoice billing subject to a
            Master Service Agreement (MSA).</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Limitation of Liability</h2>
          <p>In no event shall Sentinel Training be liable for any indirect, incidental, special, consequential
            or punitive damages, including without limitation localized compliance failures, data loss, or other
            intangible losses resulting from your access to or use of the Service.</p>
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
          <Link href="/terms" className="text-white transition-colors">Terms of Service</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
        </div>
        <p>© 2026 Sentinel Platforms. All rights reserved.</p>
      </footer>
    </div>
  );
}
