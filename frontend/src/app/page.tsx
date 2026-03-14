'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 bg-mesh relative overflow-hidden">
      
      {/* Navigation Navbar */}
      <nav className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-8 py-10">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="material-icons-round text-2xl">bolt</span>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
            AI<span className="text-primary">CORE</span>
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-extrabold tracking-widest uppercase text-slate-500 dark:text-slate-400">
          <Link href="/curriculum" className="hover:text-primary transition-colors">Curriculum</Link>
          <Link href="/compliance" className="hover:text-primary transition-colors">Compliance</Link>
          <Link href="/enterprise" className="hover:text-primary transition-colors">Enterprise</Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-sm font-extrabold tracking-widest uppercase text-slate-900 dark:text-white hover:text-primary transition-colors">
            Log In
          </Link>
          <Link
            href="/register"
            className="btn-primary btn-md rounded-2xl"
          >
            Early Access
          </Link>
        </div>
      </nav>

      {/* Main Content (Hero) */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center pt-10 pb-20 px-8 text-center">
        {/* New Badge */}
        <div className="mb-10 inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card border-primary/20 shadow-xl shadow-primary/5">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
          <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase">New: Compliance Modules 2.0</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-extrabold text-6xl md:text-8xl leading-[1.1] tracking-tight text-slate-900 dark:text-white max-w-5xl">
          Master AI.<br />
          <span className="text-primary underline decoration-primary/20 underline-offset-8">Stay Compliant.</span><br />
          Level Up.
        </h1>

        {/* Hero Description */}
        <p className="mt-10 text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
          The ultimate AI literacy training platform for high-performance teams. Master prompt engineering, governance, and ethics through immersive simulations.
        </p>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center gap-6">
          <Link href="/dashboard" className="btn-primary btn-lg rounded-[2rem] px-12 group">
            Begin Training
            <span className="material-icons-round ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>

          <Link href="/docs" className="btn-secondary btn-lg rounded-[2rem] px-12">
            View Sandbox
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-32 w-full max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">12k+</h3>
              <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Learners</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">50+</h3>
              <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Modules</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">99%</h3>
              <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Compliance</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">2.5k</h3>
              <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Partners</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 glass-card px-8 py-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-500 text-[10px] font-bold tracking-[0.2em]">
            <div className="w-6 h-4 bg-primary/10 border border-primary/30 flex items-center justify-center rounded-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            </div>
            <p>© 2026 AI CORE // ALL RIGHTS RESERVED</p>
          </div>

          <div className="flex items-center gap-10 text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
            <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

t (XP) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
          className="absolute left-10 md:left-20 bottom-32 -translate-y-12"
        >
          <div className="w-[200px] h-[72px] bg-[#0c1624] border border-white/5 rounded-full shadow-xl flex items-center px-5 gap-4 hover:border-brand-cyan/30 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#132c3d] flex items-center justify-center">
              <Settings className="w-4 h-4 text-brand-cyan" />
            </div>
            <div className="flex flex-col flex-1 w-full gap-1.5">
              <span className="text-[10px] font-bold text-white tracking-widest">CURRENT XP</span>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="h-full bg-brand-cyan"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right widget (Security) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1, type: "spring" }}
          className="absolute right-10 md:right-20 top-[-600px]"
        >
          <div className="h-[72px] bg-[#0c1624] border border-white/5 rounded-full shadow-xl flex items-center px-5 gap-4 hover:border-brand-cyan/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#112a40] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#22d3ee] fill-brand-cyan/20" />
            </div>
            <div className="flex flex-col pr-4">
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-0.5">Security Level</span>
              <span className="text-sm font-bold text-white leading-tight">Enterprise Grade</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section & Divider */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-10 md:mt-24 mb-16"
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-16"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <div className="flex flex-col items-center justify-center gap-1 group">
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight group-hover:text-brand-cyan transition-colors">12k+</h3>
            <p className="text-[10px] md:text-xs font-mono text-slate-500 tracking-[0.2em] uppercase">Active Learners</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 group">
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight group-hover:text-brand-cyan transition-colors">50+</h3>
            <p className="text-[10px] md:text-xs font-mono text-slate-500 tracking-[0.2em] uppercase">Modules</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 group">
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight group-hover:text-brand-cyan transition-colors">99%</h3>
            <p className="text-[10px] md:text-xs font-mono text-slate-500 tracking-[0.2em] uppercase">Compliance Rate</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 group">
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight group-hover:text-brand-cyan transition-colors">2.5k</h3>
            <p className="text-[10px] md:text-xs font-mono text-slate-500 tracking-[0.2em] uppercase">Corporate Partners</p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-white/5 bg-[#06101c]/80 backdrop-blur-sm px-6 py-6 md:py-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-3 text-slate-500 text-xs font-mono">
            <div className="w-5 h-3 bg-brand-cyan/20 border border-brand-cyan/50 flex items-center justify-center rounded-[2px]">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></div>
            </div>
            <p>© 2025 SENTINEL // SYST_READY</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
