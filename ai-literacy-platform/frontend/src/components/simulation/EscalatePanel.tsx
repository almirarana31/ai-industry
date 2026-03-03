'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DesktopWindow } from './DesktopWindow';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <path d="M12 9v4"/>
    <path d="M12 17h.01"/>
  </svg>
);

interface EscalationOption {
  id: string;
  label: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface EscalatePanelProps {
  onEscalate?: (option: EscalationOption, details: string) => void;
  onCancel?: () => void;
  context?: string;
}

const EscalatePanel: React.FC<EscalatePanelProps> = ({
  onEscalate,
  onCancel,
  context,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<EscalationOption | null>(null);
  const [details, setDetails] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const options: EscalationOption[] = [
    {
      id: 'bias',
      label: 'AI Bias or Discrimination',
      description: 'Report potential bias in AI output or recommendations',
      severity: 'high',
    },
    {
      id: 'privacy',
      label: 'Privacy Concern',
      description: 'Personal data may have been exposed or misused',
      severity: 'high',
    },
    {
      id: 'misinformation',
      label: 'AI Misinformation',
      description: 'AI generated incorrect or misleading information',
      severity: 'medium',
    },
    {
      id: 'policy',
      label: 'Policy Violation',
      description: 'Action may violate company AI usage policy',
      severity: 'medium',
    },
    {
      id: 'unsure',
      label: 'Unsure How to Proceed',
      description: 'Need guidance on appropriate AI usage',
      severity: 'low',
    },
    {
      id: 'other',
      label: 'Other Concern',
      description: 'Report another type of AI-related issue',
      severity: 'low',
    },
  ];

  const severityColors = {
    low: 'border-slate-600 hover:border-slate-500',
    medium: 'border-amber-500/30 hover:border-amber-500/50',
    high: 'border-red-500/30 hover:border-red-500/50',
  };

  const handleSubmit = async () => {
    if (!selectedOption) return;
    
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000)); // Simulate API call
    onEscalate?.(selectedOption, details);
    setIsSubmitting(false);
  };

  return (
    <DesktopWindow
      title="Escalate Issue"
      icon={<AlertIcon />}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Report an AI-Related Concern
          </h2>
          <p className="text-sm text-slate-400">
            Use this form to escalate any AI ethics, compliance, or safety concerns to your organization's compliance team. All reports are logged for audit purposes.
          </p>
        </div>

        {context && (
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs font-medium text-slate-400 mb-2">Context</p>
            <p className="text-sm text-slate-300">{context}</p>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white">What type of issue are you reporting?</p>
          <div className="grid gap-3">
            {options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={cn(
                  'w-full text-left p-4 rounded-lg border-2 transition-colors',
                  severityColors[option.severity],
                  selectedOption?.id === option.id
                    ? 'bg-slate-700/50 border-primary-500'
                    : 'bg-slate-800/50'
                )}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{option.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{option.description}</p>
                  </div>
                  {selectedOption?.id === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Details */}
        <Textarea
          label="Additional Details"
          placeholder="Describe the situation and why you're escalating this issue..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          hint="Include relevant context, what happened, and any supporting information."
        />

        {/* EU AI Act reference */}
        <div className="bg-primary-500/10 rounded-lg p-4 border border-primary-500/20">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400 flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <div>
              <p className="text-sm font-medium text-white">EU AI Act Compliance</p>
              <p className="text-xs text-slate-400 mt-1">
                Under the EU AI Act, organizations must maintain documentation of AI-related incidents. Your report will be included in compliance records and may be reviewed by compliance officers.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={!selectedOption}
          >
            Submit Report
          </Button>
        </div>
      </div>
    </DesktopWindow>
  );
};

export { EscalatePanel };
export type { EscalationOption };
