'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { analyticsAPI, trainingAPI } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';
import { useTrainingStore } from '@/store';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();
  const { modules, progress, setModules, setProgress } = useTrainingStore();

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch dashboard analytics
        const analyticsResponse = await analyticsAPI.getDashboard();
        if (analyticsResponse.success && analyticsResponse.data) {
          setDashboardData(analyticsResponse.data);
        }

        // Fetch training modules
        const modulesResponse = await trainingAPI.getModules();
        if (modulesResponse.success && modulesResponse.data) {
          setModules(modulesResponse.data);
        }

        // Fetch user progress
        const progressResponse = await trainingAPI.getProgress();
        if (progressResponse.success && progressResponse.data) {
          setProgress(progressResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setModules, setProgress]);

  // Get active and completed modules
  const activeModules = modules.filter(module => {
    const moduleProgress = progress.find(p => p.moduleId === module.id);
    return !moduleProgress || moduleProgress.status === 'IN_PROGRESS' || moduleProgress.status === 'NOT_STARTED';
  });

  const completedModules = modules.filter(module => {
    const moduleProgress = progress.find(p => p.moduleId === module.id);
    return moduleProgress?.status === 'COMPLETED' || moduleProgress?.status === 'CERTIFIED';
  });

  // Calculate total XP
  const totalXP = progress.reduce((sum, p) => sum + (p.bestScore || 0) * 100, 0);

  // Get module progress percentage
  const getModuleProgress = (moduleId: string) => {
    const moduleProgress = progress.find(p => p.moduleId === moduleId);
    return moduleProgress?.completionPercent || 0;
  };

  // Get module status
  const getModuleStatus = (moduleId: string) => {
    const moduleProgress = progress.find(p => p.moduleId === moduleId);
    return moduleProgress?.status || 'NOT_STARTED';
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter modules
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 bg-mesh">

      {/* Internal Top Navbar */}
      <nav className="sticky top-0 z-50 px-8 py-4 flex justify-between items-center glass-card border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="material-icons-round">bolt</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">AI<span className="text-primary">CORE</span></span>
          </Link>

          {/* Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold tracking-wide border-l border-slate-200 dark:border-slate-800 pl-8">
            <Link href="/dashboard" className="text-primary">Dashboard</Link>
            <Link href="/training" className="text-slate-500 hover:text-primary transition-colors">Training</Link>
            <Link href="/certifications" className="text-slate-500 hover:text-primary transition-colors">Certifications</Link>
            <Link href="/reports" className="text-slate-500 hover:text-primary transition-colors">Reports</Link>
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block relative">
            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search modules..."
              className="bg-slate-100 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl pl-10 pr-4 py-2 w-64 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </form>

          {/* XP Display */}
          <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-accent-warning text-sm">stars</span>
              <span className="text-sm font-bold font-mono">{Math.round(totalXP).toLocaleString()} XP</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <button 
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400" 
            onClick={() => document.documentElement.classList.toggle('dark')}
            aria-label="Toggle theme"
          >
            <span className="material-icons-round dark:hidden">dark_mode</span>
            <span className="material-icons-round hidden dark:block text-yellow-400">light_mode</span>
          </button>

          {/* Profile */}
          <Link href="/settings/profile" className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-primary overflow-hidden flex items-center justify-center shadow-lg shadow-primary/10 hover:scale-105 transition-transform">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl">👨‍💻</span>
            )}
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full overflow-hidden">

        {/* Left Main Area */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar">

          {/* Welcome Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 text-primary font-extrabold text-[10px] tracking-[0.2em] uppercase mb-3">
                <span className="material-icons-round text-lg">explore</span>
                MISSION CONTROL
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                Welcome Back, {user?.firstName || 'Agent'}.
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                Your overall AI literacy is <span className="text-primary font-extrabold underline decoration-primary/30 underline-offset-4">
                  {dashboardData?.overallProgress || 0}%
                </span> complete.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8 glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 dark:text-slate-500 font-extrabold uppercase tracking-[0.2em] mb-1">Total XP</span>
                <span className="text-2xl font-extrabold flex items-center gap-2">
                  <span className="material-icons-round text-primary">trending_up</span> 
                  {(totalXP / 1000).toFixed(1)}k
                </span>
              </div>
              <div className="w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 dark:text-slate-500 font-extrabold uppercase tracking-[0.2em] mb-1">Compliance</span>
                <span className="text-2xl font-extrabold text-accent-success">
                  {dashboardData?.complianceScore || 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          )}

          {/* Missions Tabs */}
          {!isLoading && (
            <>
              <div className="flex items-center gap-10 border-b border-slate-200 dark:border-slate-800 mb-10">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`pb-5 text-[10px] font-extrabold tracking-[0.2em] uppercase transition-all ${activeTab === 'active' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                  Active Missions ({activeModules.length})
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`pb-5 text-[10px] font-extrabold tracking-[0.2em] uppercase transition-all ${activeTab === 'completed' ? 'text-accent-success border-b-2 border-accent-success' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                  Completed ({completedModules.length})
                </button>
              </div>

              {/* Tab Content: Active Missions */}
              {activeTab === 'active' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {activeModules.length === 0 ? (
                    <div className="col-span-2 text-center py-20">
                      <span className="material-icons-round text-6xl text-slate-300 dark:text-slate-700 mb-4">check_circle</span>
                      <p className="text-slate-500 dark:text-slate-400 text-lg">All missions completed! Check out new modules.</p>
                      <Link href="/training" className="btn-primary btn-md mt-6 inline-flex items-center gap-2">
                        Browse Modules <span className="material-icons-round">arrow_forward</span>
                      </Link>
                    </div>
                  ) : (
                    activeModules.map((module, index) => {
                      const progressPercent = getModuleProgress(module.id);
                      const status = getModuleStatus(module.id);
                      const isInProgress = status === 'IN_PROGRESS';

                      return (
                        <div 
                          key={module.id}
                          className={`group relative glass-card rounded-3xl p-8 ${isInProgress ? 'border-2 border-primary/20' : 'border border-slate-200 dark:border-slate-800'} transition-all duration-300 hover:-translate-y-1 shadow-xl ${isInProgress ? 'shadow-primary/5' : 'shadow-sm'} overflow-hidden`}
                        >
                          {isInProgress && (
                            <div className="absolute top-0 right-0 p-5">
                              <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-4 py-1.5 rounded-full tracking-widest uppercase border border-primary/20">
                                In Progress
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between items-start mb-10">
                            <div className={`w-16 h-16 rounded-2xl ${isInProgress ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <span className="material-icons-round text-4xl">
                                {module.category === 'DATA_PRIVACY_SECURITY' ? 'shield' : 
                                 module.category === 'AI_FUNDAMENTALS' ? 'smart_toy' :
                                 module.category === 'BIAS_ETHICS' ? 'balance' :
                                 module.category === 'GOVERNANCE_ESCALATION' ? 'account_tree' :
                                 'psychology'}
                              </span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className={`text-3xl font-extrabold ${isInProgress ? 'text-primary' : 'text-slate-400'}`}>
                                {Math.round(progressPercent)}%
                              </span>
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Mastery</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-extrabold mb-3 tracking-tight">{module.title}</h3>
                          <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm leading-relaxed max-w-md font-medium">
                            {module.description}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                            <Link 
                              href={`/training/${module.id}`}
                              className={`${isInProgress ? 'btn-primary' : 'btn-secondary'} btn-md flex items-center gap-2 group/btn rounded-2xl`}
                            >
                              {isInProgress ? 'RESUME' : 'START'} MISSION 
                              <span className="material-icons-round group-hover/btn:translate-x-1 transition-transform">play_circle</span>
                            </Link>
                            <span className="text-slate-500 font-extrabold text-[10px] uppercase tracking-[0.2em]">
                              +{module.estimatedMinutes * 10} XP
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Tab Content: Completed Missions */}
              {activeTab === 'completed' && (
                <div className="flex flex-col gap-6">
                  {completedModules.length === 0 ? (
                    <div className="text-center py-20">
                      <span className="material-icons-round text-6xl text-slate-300 dark:text-slate-700 mb-4">pending_actions</span>
                      <p className="text-slate-500 dark:text-slate-400 text-lg">No completed missions yet. Start your first mission!</p>
                      <Link href="/training" className="btn-primary btn-md mt-6 inline-flex items-center gap-2">
                        Browse Modules <span className="material-icons-round">arrow_forward</span>
                      </Link>
                    </div>
                  ) : (
                    completedModules.map((module) => {
                      const moduleProgress = progress.find(p => p.moduleId === module.id);
                      const isCertified = moduleProgress?.status === 'CERTIFIED';

                      return (
                        <div 
                          key={module.id}
                          className="glass-card border-accent-success/20 rounded-3xl p-8 flex items-center justify-between shadow-lg shadow-accent-success/5 border border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform"
                        >
                          <div className="flex items-center gap-8">
                            <div className="w-16 h-16 rounded-2xl bg-accent-success/10 flex items-center justify-center text-accent-success border border-accent-success/20">
                              <span className="material-icons-round text-4xl">
                                {isCertified ? 'verified_user' : 'check_circle'}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-xl font-extrabold tracking-tight mb-2">{module.title}</h3>
                              <p className="text-sm text-slate-500 font-medium">{module.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <span className="bg-accent-success/20 text-accent-success text-[10px] font-extrabold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase flex items-center gap-2">
                              <span className="material-icons-round text-sm">stars</span> 
                              {isCertified ? 'Certified' : 'Completed'}
                            </span>
                            <Link 
                              href={`/training/${module.id}`}
                              className="text-xs font-bold text-slate-400 hover:text-primary underline underline-offset-4 decoration-primary/20 transition-all"
                            >
                              {isCertified ? 'View Certificate' : 'Review Module'}
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </>
          )}

        </main>

        {/* Right Sidebar */}
        <aside className="w-96 glass-card border-l border-slate-200 dark:border-slate-800 p-10 flex flex-col gap-10 overflow-y-auto shrink-0 hidden 2xl:flex no-scrollbar">

          {/* Daily Challenge */}
          <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/20 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full group-hover:bg-primary/20 transition-all"></div>

            <div className="mb-8 relative z-10">
              <span className="text-[10px] font-extrabold text-primary tracking-[0.2em] uppercase mb-2 block">Daily Challenge</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 leading-tight tracking-tight">Fix the Hallucination</h3>
            </div>

            <div className="glass-light border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-8 relative z-10 shadow-sm">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                &gt; The model confidently stated incorrect financial data. Implement a fact-checking pipeline.
              </p>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Expires in</span>
                <span className="text-slate-900 dark:text-white text-xl font-mono font-bold tracking-tight">04:22:15</span>
              </div>
              <Link href="/training" className="btn-primary btn-sm rounded-xl px-5 py-3 text-[10px] uppercase tracking-widest font-extrabold">
                ATTEMPT +500 XP
              </Link>
            </div>
          </div>

          {/* Top Operatives */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="font-extrabold text-lg tracking-tight flex items-center gap-3">
                <span className="material-icons-round text-primary">emoji_events</span> Top Operatives
              </h3>
              <Link href="/dashboard/leaderboard" className="text-[10px] font-extrabold tracking-widest uppercase text-primary hover:underline underline-offset-4 decoration-primary/30 transition-all">
                Full Board
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {dashboardData?.leaderboard?.slice(0, 3).map((leader: any, index: number) => (
                <div 
                  key={leader.id}
                  className={`flex items-center justify-between p-4 glass-light rounded-2xl ${index === 0 ? 'border border-primary/20 shadow-lg shadow-primary/5' : 'border border-slate-200 dark:border-slate-800'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`${index === 0 ? 'text-primary' : 'text-slate-400'} font-black text-sm w-4 text-center`}>
                      {index + 1}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${index === 0 ? 'bg-slate-900 text-white border-2 border-white dark:border-slate-800' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'} flex items-center justify-center text-xs font-bold shadow-md`}>
                      {leader.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span className={`font-bold text-sm ${index === 0 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'} tracking-tight`}>
                      {leader.name}
                    </span>
                  </div>
                  <span className={`text-sm ${index === 0 ? 'font-black text-primary' : 'font-bold text-slate-400'}`}>
                    {leader.xp.toLocaleString()}
                  </span>
                </div>
              )) || (
                // Fallback leaderboard data
                <>
                  <div className="flex items-center justify-between p-4 glass-light border border-primary/20 rounded-2xl shadow-lg shadow-primary/5">
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-black text-sm w-4 text-center">1</span>
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-md border-2 border-white dark:border-slate-800">SC</div>
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">Sarah Jenkins</span>
                    </div>
                    <span className="text-sm font-black text-primary">15,400</span>
                  </div>
                  <div className="flex items-center justify-between p-4 glass-light border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 font-bold text-sm w-4 text-center">2</span>
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">AM</div>
                      <span className="font-bold text-sm text-slate-600 dark:text-slate-400 tracking-tight">Artur M.</span>
                    </div>
                    <span className="text-sm font-bold text-slate-400">14,820</span>
                  </div>
                  <div className="flex items-center justify-between p-4 glass-light border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 font-bold text-sm w-4 text-center">3</span>
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">EM</div>
                      <span className="font-bold text-sm text-slate-600 dark:text-slate-400 tracking-tight">Elena M.</span>
                    </div>
                    <span className="text-sm font-bold text-slate-400">13,900</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
