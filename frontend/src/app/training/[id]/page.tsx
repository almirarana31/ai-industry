'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress, CircularProgress } from '@/components/ui/Progress';
import { trainingAPI } from '@/lib/api';
import type { TrainingModule, Scenario } from '@/types';

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;

  const [module, setModule] = React.useState<TrainingModule | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await trainingAPI.getModule(moduleId);
        if (response.success && response.data) {
          setModule(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch module:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (moduleId) {
      fetchModule();
    }
  }, [moduleId]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!module) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-slate-400 mb-4">Module not found</p>
          <Link href="/training">
            <Button>Back to Training</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const progress = module.completedScenarios
    ? Math.round((module.completedScenarios / module.totalScenarios) * 100)
    : 0;

  const nextScenario = module.scenarios?.find(
    (s) => s.status !== 'completed'
  );

  return (
    <DashboardLayout>
      <Header
        title={module.title}
        description={module.description}
        actions={
          <Link href="/training">
            <Button variant="ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back to Training
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* Module Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/20 to-ai-purple/20 flex items-center justify-center text-primary-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                      <path d="m9 9.5 2 2 4-4"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        className={
                          module.difficulty === 'BEGINNER'
                            ? 'badge-success'
                            : module.difficulty === 'INTERMEDIATE'
                            ? 'badge-warning'
                            : 'badge-danger'
                        }
                      >
                        {module.difficulty}
                      </Badge>
                      <Badge>{module.category}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{module.title}</h2>
                    <p className="text-slate-400">{module.description}</p>

                    <div className="flex items-center gap-6 mt-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {module.estimatedTime} minutes
                      </span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                        </svg>
                        {module.totalScenarios} scenarios
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Your Progress</span>
                    <span className="text-sm font-medium text-white">{progress}%</span>
                  </div>
                  <Progress
                    value={progress}
                    variant={progress === 100 ? 'success' : 'default'}
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    {module.completedScenarios || 0} of {module.totalScenarios} scenarios completed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Continue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <CircularProgress
                    value={progress}
                    size={100}
                    strokeWidth={8}
                    variant={progress === 100 ? 'success' : 'ai'}
                  />
                </div>

                {nextScenario ? (
                  <Link
                    href={`/training/${moduleId}/scenario/${nextScenario.id}`}
                    className="block"
                  >
                    <Button className="w-full" size="lg">
                      {progress > 0 ? 'Continue Training' : 'Start Training'}
                    </Button>
                  </Link>
                ) : (
                  <Button className="w-full" size="lg" disabled>
                    All Scenarios Completed
                  </Button>
                )}

                {progress === 100 && (
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                    <p className="text-sm text-green-400 font-medium">
                      Module Completed!
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      You can review scenarios anytime
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Objectives */}
        {module.objectives && module.objectives.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {module.objectives.map((objective, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span className="text-slate-300">{objective}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Scenarios List */}
        <Card>
          <CardHeader>
            <CardTitle>Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {module.scenarios?.map((scenario, index) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  index={index}
                  moduleId={moduleId}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

interface ScenarioCardProps {
  scenario: Scenario;
  index: number;
  moduleId: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, index, moduleId }) => {
  const isCompleted = scenario.status === 'completed';
  const isLocked = scenario.status === 'locked';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={isLocked ? '#' : `/training/${moduleId}/scenario/${scenario.id}`}
        className={isLocked ? 'cursor-not-allowed' : ''}
      >
        <div
          className={`p-4 rounded-lg border transition-colors ${
            isLocked
              ? 'bg-slate-800/30 border-slate-700/30 opacity-50'
              : isCompleted
              ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/40'
              : 'bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isCompleted
                  ? 'bg-green-500/20 text-green-400'
                  : isLocked
                  ? 'bg-slate-700/50 text-slate-500'
                  : 'bg-primary-500/20 text-primary-400'
              }`}
            >
              {isCompleted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : isLocked ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              ) : (
                <span className="font-semibold">{index + 1}</span>
              )}
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-white">{scenario.title}</h4>
              <p className="text-sm text-slate-400 line-clamp-1">
                {scenario.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {scenario.score !== undefined && (
                <Badge variant={scenario.score >= 80 ? 'success' : 'warning'}>
                  {scenario.score}%
                </Badge>
              )}
              {!isLocked && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
