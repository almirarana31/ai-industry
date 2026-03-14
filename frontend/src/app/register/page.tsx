'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F161E] flex flex-col md:flex-row text-slate-200 font-sans">

      {/* Left Column: Branding & Testimonials (Hidden on small screens) */}
      <div className="hidden md:flex flex-col flex-1 bg-gradient-to-br from-[#12222b] to-[#0a1016] p-12 border-r border-white/5 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#00F0FF]/10 via-transparent to-transparent pointer-events-none"></div>

        <Link href="/" className="flex items-center gap-3 group w-fit relative z-10">
          <div className="w-10 h-10 rounded-lg bg-[#00F0FF] flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-5 h-5 border-[2.5px] border-[#0F161E] -rotate-45 group-hover:-rotate-90 transition-transform"></div>
          </div>
          <span className="font-bold text-2xl text-white tracking-tight">Sentinel <span className="font-light opacity-80">Training</span></span>
        </Link>

        <div className="mt-auto mb-auto relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8">
            <ShieldCheck className="w-4 h-4" /> Enterprise Security First
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Master AI literacy and secure your corporate future.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-12">
            Join thousands of professionals mastering generative AI models, ethical deployment, and data privacy protocols.
          </p>

          {/* Testimonial Card */}
          <div className="bg-[#16212B]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl relative inline-block">
            <svg className="absolute -top-4 -left-4 w-8 h-8 text-[#00F0FF]/40 rotate-180" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" /></svg>
            <p className="text-slate-300 italic mb-4 relative z-10 leading-relaxed text-sm lg:text-base">
              "The Sentinel modules completely standardized our engineering team's approach to LLM security. The certification paths are incredibly rigorous."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                EJ
              </div>
              <div>
                <p className="font-bold text-white text-sm">Elena Jenkins</p>
                <p className="text-xs text-slate-500">VP of Engineering, CloudCore Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-[#0F161E]">

        {/* Mobile Logo */}
        <Link href="/" className="md:hidden flex items-center gap-3 group w-fit mb-12">
          <div className="w-8 h-8 rounded-lg bg-[#00F0FF] flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-4 h-4 border-[2px] border-[#0F161E] -rotate-45"></div>
          </div>
          <span className="font-bold text-xl text-white tracking-tight">Sentinel</span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create your account</h2>
            <p className="text-slate-400">Join the platform to start your certification journey.</p>
          </div>

          <form className="flex flex-col gap-5">

            {/* Name Input */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#00F0FF] transition-colors" />
                <input
                  type="text"
                  placeholder="Alex Rivera"
                  className="w-full bg-[#16212B] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]/50 transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#00F0FF] transition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-[#16212B] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]/50 transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#00F0FF] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full bg-[#16212B] border border-white/5 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]/50 transition-colors shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Must be at least 8 characters long and contain a number or symbol.</p>
            </div>

            {/* Submit Button */}
            <Link href="/dashboard" className="w-full bg-[#00F0FF] hover:bg-[#00e0ef] text-[#0F161E] font-bold text-[15px] py-4 rounded-xl flex items-center justify-center gap-2 mt-4 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transform hover:-translate-y-0.5">
              Create Account <ArrowRight className="w-5 h-5" />
            </Link>

          </form>

          {/* Social Auth (Mock) */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Or continue with</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-[#16212B] hover:bg-white/5 border border-white/5 py-3 rounded-xl transition-colors font-semibold text-sm text-slate-300">
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#16212B] hover:bg-white/5 border border-white/5 py-3 rounded-xl transition-colors font-semibold text-sm text-slate-300">
                Microsoft
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 mt-10">
            Already have an account? <Link href="/login" className="text-[#00F0FF] font-bold hover:underline underline-offset-4">Sign in</Link>
          </p>

        </div>
      </div>

    </div>
  );
}
