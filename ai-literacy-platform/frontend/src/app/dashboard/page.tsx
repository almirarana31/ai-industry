'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress, CircularProgress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/store/auth.store';
import { trainingAPI, analyticsAPI } from '@/lib/api';
import { formatMinutes } from '@/lib/utils';
import type { TrainingModule, DashboardAnalytics } from '@/types';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [modules, setModules] = React.useState<TrainingModule[]>([]);
  const [analytics, setAnalytics] = React.useState<DashboardAnalytics | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesRes, analyticsRes] = await Promise.all([
          trainingAPI.getModules(),
          analyticsAPI.getDashboard(),
        ]);

        if (modulesRes.success && modulesRes.data) {
          setModules(modulesRes.data);
        }
        if (analyticsRes.success && analyticsRes.data) {
          setAnalytics(analyticsRes.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout>
      <Header
        title={`${greeting()}, ${user?.firstName}!`}
        description="Track your AI literacy progress and continue training"
        actions={
          <Link href="/training">
            <Button>Continue Training</Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Overall Progress"
            value={`${analytics?.overallProgress || 0}%`}
            subtitle="Completion rate"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"/>
                <path d="m19 9-5 5-4-4-3 3"/>
              </svg>
            }
            color="primary"
          />
          <StatsCard
            title="Compliance Score"
            value={analytics?.complianceScore || 0}
            subtitle="Out of 100"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            }
            color="success"
          />
          <StatsCard
            title="Modules Completed"
            value={`${analytics?.modulesCompleted || 0}/${analytics?.totalModules || 0}`}
            subtitle="Training modules"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                <path d="m9 9.5 2 2 4-4"/>
              </svg>
            }
            color="ai"
          />
          <StatsCard
            title="Time Invested"
            value={formatMinutes(analytics?.totalTimeSpent || 0)}
            subtitle="Total training time"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            }
            color="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Training */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Continue Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-slate-800/50 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : modules.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p>No training modules available.</p>
                  </div>
                ) : (
                  modules.slice(0, 3).map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ModuleCard module={module} />
                    </motion.div>
                  ))
                )}
                {modules.length > 3 && (
                  <Link href="/training">
                    <Button variant="ghost" className="w-full">
                      View all modules ({modules.length})
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Compliance Status */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <CircularProgress
                    value={analytics?.complianceScore || 0}
                    size={120}
                    strokeWidth={10}
                    variant={
                      (analytics?.complianceScore || 0) >= 80
                        ? 'success'
                        : (analytics?.complianceScore || 0) >= 50
                        ? 'warning'
                        : 'danger'
                    }
                  />
                  <Badge
                    variant={
                      (analytics?.complianceScore || 0) >= 80
                        ? 'success'
                        : (analytics?.complianceScore || 0) >= 50
                        ? 'warning'
                        : 'danger'
                    }
                    className="mt-4"
                  >
                    {(analytics?.complianceScore || 0) >= 80
                      ? 'Compliant'
                      : (analytics?.complianceScore || 0) >= 50
                      ? 'At Risk'
                      : 'Action Required'}
                  </Badge>
                </div>

                <div className="mt-6 space-y-3 border-t border-slate-700 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Risk Awareness</span>
                    <span className="text-white">{analytics?.riskAwarenessScore || 0}%</span>
                  </div>
                  <Progress value={analytics?.riskAwarenessScore || 0} variant="warning" />

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">AI Usage Score</span>
                    <span className="text-white">{analytics?.aiUsageScore || 0}%</span>
                  </div>
                  <Progress value={analytics?.aiUsageScore || 0} variant="ai" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics?.recentActivity && analytics.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {analytics.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{activity.moduleName}</p>
                        <p className="text-xs text-slate-400">{activity.date}</p>
                      </div>
                    </div>
                    <Badge variant={activity.score >= 80 ? 'success' : 'warning'}>
                      {activity.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-4">
                No recent activity. Start a training module to see your progress here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'ai';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  const colors = {
    primary: 'bg-primary-500/10 text-primary-400',
    success: 'bg-green-500/10 text-green-400',
    warning: 'bg-amber-500/10 text-amber-400',
    ai: 'bg-ai-purple/10 text-ai-purple',
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Module Card Component
interface ModuleCardProps {
  module: TrainingModule;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const progress = module.completedScenarios
    ? Math.round((module.completedScenarios / module.totalScenarios) * 100)
    : 0;

  const difficultyColors = {
    BEGINNER: 'badge-success',
    INTERMEDIATE: 'badge-warning',
    ADVANCED: 'badge-danger',
  };

  return (
    <Link href={`/training/${module.id}`}>
      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-primary-500/50 transition-colors cursor-pointer group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-white group-hover:text-primary-400 transition-colors">
                {module.title}
              </h3>
              <Badge className={difficultyColors[module.difficulty as keyof typeof difficultyColors]}>
                {module.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-slate-400 mt-1 line-clamp-1">
              {module.description}
            </p>
          </div>
          <div className="ml-4 text-right">
            <p className="text-lg font-semibold text-white">{progress}%</p>
            <p className="text-xs text-slate-400">Complete</p>
          </div>
        </div>
        <div className="mt-3">
          <Progress value={progress} size="sm" />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>{module.completedScenarios || 0} / {module.totalScenarios} scenarios</span>
          <span>{module.estimatedTime} min</span>
        </div>
      </div>
    </Link>
  );
};
