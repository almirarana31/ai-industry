'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, KeyRound, ShieldAlert } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#0F161E] flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden text-slate-200 font-sans">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00F0FF]/5 via-transparent to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[120px] rounded-full -z-10"></div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">

        {/* Logo Header */}
        <Link href="/" className="flex items-center justify-center gap-3 group mb-10 mx-auto">
          <div className="w-10 h-10 rounded-xl bg-[#00F0FF] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            <div className="w-5 h-5 border-[2.5px] border-[#0F161E] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">Sentinel <span className="font-light opacity-80">Training</span></span>
        </Link>

        {/* Form Card */}
        <div className="bg-[#16212B]/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">

          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent bg-size-200 opacity-80"></div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#1C2836] border border-white/5 flex items-center justify-center mb-6 shadow-inner relative">
              <div className="absolute inset-0 bg-[#00F0FF]/10 rounded-full animate-ping opacity-20 hidden"></div>
              <KeyRound className="w-8 h-8 text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Reset your password</h2>
            <p className="text-slate-400 text-sm leading-relaxed px-2">
              Enter your work email address and we'll send you instructions to securely reset your password.
            </p>
          </div>

          <form className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-wider text-slate-400 uppercase ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#00F0FF] transition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-[#0F161E]/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]/50 transition-colors shadow-inner"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold text-[15px] py-4 rounded-xl flex items-center justify-center gap-2 mt-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transform hover:-translate-y-0.5">
              Send Reset Link
            </button>

          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3 bg-[#00F0FF]/5 p-4 rounded-xl border-dashed border-[#00F0FF]/20">
            <ShieldAlert className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              For enterprise security reasons, password reset links expire after 15 minutes. Attempting multiple invalid resets may temporarily lock your account.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/login" className="inline-flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white font-medium transition-colors group">
            <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:-translate-x-1 group-hover:text-white transition-all" />
            Back to Sign In
          </Link>
        </div>

      </div>

    </div>
  );
}
