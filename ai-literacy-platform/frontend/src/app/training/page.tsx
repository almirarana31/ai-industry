'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { trainingAPI } from '@/lib/api';
import type { TrainingModule } from '@/types';

export default function TrainingPage() {
  const [modules, setModules] = React.useState<TrainingModule[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('all');

  React.useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await trainingAPI.getModules();
        if (response.success && response.data) {
          setModules(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch modules:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  const filteredModules = React.useMemo(() => {
    if (activeTab === 'all') return modules;
    if (activeTab === 'in-progress') {
      return modules.filter(
        (m) => m.completedScenarios && m.completedScenarios > 0 && m.completedScenarios < m.totalScenarios
      );
    }
    if (activeTab === 'completed') {
      return modules.filter((m) => m.completedScenarios === m.totalScenarios);
    }
    if (activeTab === 'not-started') {
      return modules.filter((m) => !m.completedScenarios || m.completedScenarios === 0);
    }
    return modules;
  }, [modules, activeTab]);

  const categories = React.useMemo(() => {
    const cats = new Map<string, TrainingModule[]>();
    modules.forEach((module) => {
      const category = module.category || 'General';
      if (!cats.has(category)) {
        cats.set(category, []);
      }
      cats.get(category)!.push(module);
    });
    return cats;
  }, [modules]);

  return (
    <DashboardLayout>
      <Header
        title="Training Modules"
        description="Complete AI literacy modules to improve your compliance score"
      />

      <div className="p-6">
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <QuickStat
            label="Total Modules"
            value={modules.length}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
            }
          />
          <QuickStat
            label="Completed"
            value={modules.filter((m) => m.completedScenarios === m.totalScenarios).length}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            }
            color="success"
          />
          <QuickStat
            label="In Progress"
            value={modules.filter((m) => m.completedScenarios && m.completedScenarios > 0 && m.completedScenarios < m.totalScenarios).length}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4"/>
                <path d="m16.2 7.8 2.9-2.9"/>
                <path d="M18 12h4"/>
                <path d="m16.2 16.2 2.9 2.9"/>
                <path d="M12 18v4"/>
                <path d="m4.9 19.1 2.9-2.9"/>
                <path d="M2 12h4"/>
                <path d="m4.9 4.9 2.9 2.9"/>
              </svg>
            }
            color="warning"
          />
          <QuickStat
            label="Not Started"
            value={modules.filter((m) => !m.completedScenarios || m.completedScenarios === 0).length}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
              </svg>
            }
            color="slate"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Modules</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="not-started">Not Started</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-48 bg-slate-800/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredModules.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
                <p>No modules found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ModuleCard module={module} />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Quick Stat Component
interface QuickStatProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'slate';
}

const QuickStat: React.FC<QuickStatProps> = ({
  label,
  value,
  icon,
  color = 'primary',
}) => {
  const colors = {
    primary: 'bg-primary-500/10 text-primary-400',
    success: 'bg-green-500/10 text-green-400',
    warning: 'bg-amber-500/10 text-amber-400',
    slate: 'bg-slate-700/50 text-slate-400',
  };

  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
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

  const isCompleted = progress === 100;
  const isInProgress = progress > 0 && progress < 100;

  const difficultyConfig = {
    BEGINNER: { label: 'Beginner', class: 'badge-success' },
    INTERMEDIATE: { label: 'Intermediate', class: 'badge-warning' },
    ADVANCED: { label: 'Advanced', class: 'badge-danger' },
  };

  const difficulty = difficultyConfig[module.difficulty as keyof typeof difficultyConfig] || {
    label: module.difficulty,
    class: 'badge',
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    fundamentals: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    ethics: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
      </svg>
    ),
    governance: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      </svg>
    ),
    legal: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    privacy: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  };

  const icon = categoryIcons[(module.category || '').toLowerCase()] || (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    </svg>
  );

  return (
    <Link href={`/training/${module.id}`}>
      <Card className="h-full hover:border-primary-500/50 transition-colors cursor-pointer group">
        <CardContent className="pt-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-ai-purple/20 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform">
              {icon}
            </div>
            <div className="flex items-center gap-2">
              {isCompleted && (
                <Badge variant="success">Completed</Badge>
              )}
              {isInProgress && (
                <Badge variant="warning">In Progress</Badge>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">
            {module.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 flex-1">
            {module.description}
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400">Progress</span>
              <span className="text-white font-medium">{progress}%</span>
            </div>
            <Progress value={progress} size="sm" variant={isCompleted ? 'success' : 'default'} />
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className={difficulty.class}>{difficulty.label}</Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {module.estimatedTime}m
              </span>
              <span>{module.totalScenarios} scenarios</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
