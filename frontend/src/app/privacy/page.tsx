'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function PrivacyPage() {
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
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last Updated: March 1, 2026</p>

        <div className="prose prose-invert prose-slate max-w-none">
          <p>
            At Sentinel Platforms ("we", "us", "our"), we are deeply committed to protecting your privacy
            and ensuring the security of your data. As a platform dedicated to AI compliance and security
            training, we hold ourselves to the highest standards of data protection.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information that you configure within the platform, including:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong>Account Information:</strong> Name, work email address, and encrypted passwords.</li>
            <li><strong>Training Data:</strong> Course progress, quiz scores, and certification records.</li>
            <li><strong>Usage Data:</strong> Technical logs, IP addresses, and session information required for security monitoring.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. How We Use Your Data</h2>
          <p>Your data is exclusively used to provide, secure, and improve the Sentinel Training platform. We do not sell your personal data to third parties. Training scenario inputs are explicitly not used to train generative AI models.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Data Security & Compliance</h2>
          <p>
            We implement enterprise-grade security controls, including AES-256 encryption at rest and TLS 1.3 in transit.
            We are fully compliant with the GDPR, CCPA, and are SOC2 Type II certified. Platform infrastructure is hosted on isolated VPCs.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Your Rights</h2>
          <p>You have the right to access, correct, export, or delete your personal data. To exercise these rights, please consult your Enterprise Administrator or contact our Data Protection Officer at dpo@sentinel-platforms.com.</p>
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
          <Link href="/privacy" className="text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
        </div>
        <p>© 2026 Sentinel Platforms. All rights reserved.</p>
      </footer>
    </div>
  );
}
