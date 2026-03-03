'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatRelativeTime } from '@/lib/utils';
import { useSimulationStore } from '@/store';
import { DesktopWindow } from './DesktopWindow';
import type { NPCMessage } from '@/types';

const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
);

interface AIAssistantAppProps {
  messages?: NPCMessage[];
  onSendMessage?: (content: string) => void;
  onAnalyzePrompt?: (prompt: string) => void;
  isTyping?: boolean;
  aiName?: string;
}

const AIAssistantApp: React.FC<AIAssistantAppProps> = ({
  messages: propMessages,
  onSendMessage,
  onAnalyzePrompt,
  isTyping: propIsTyping,
  aiName = 'CoPilot AI',
}) => {
  const { aiMessages, isTyping: storeIsTyping, addAIMessage } = useSimulationStore();
  const messages = propMessages || aiMessages;
  const isTyping = propIsTyping ?? storeIsTyping;
  
  const [inputValue, setInputValue] = React.useState('');
  const [showWarning, setShowWarning] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage: NPCMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: inputValue,
        timestamp: new Date().toISOString(),
      };
      addAIMessage(userMessage);
      onSendMessage?.(inputValue);
      onAnalyzePrompt?.(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Check for risky patterns in input
  React.useEffect(() => {
    const riskyPatterns = [
      /confidential/i,
      /password/i,
      /social security/i,
      /credit card/i,
      /personal data/i,
      /salary/i,
      /employee.*(record|data)/i,
    ];
    const hasRisk = riskyPatterns.some((pattern) => pattern.test(inputValue));
    setShowWarning(hasRisk);
  }, [inputValue]);

  const suggestedPrompts = [
    'Help me write a professional email',
    'Summarize the key points of a document',
    'Generate ideas for a project proposal',
    'Review my code for best practices',
  ];

  return (
    <DesktopWindow
      title={aiName}
      icon={<BotIcon />}
    >
      <div className="flex flex-col h-full">
        {/* AI Header */}
        <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-primary-600/10 to-ai-purple/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-ai-purple flex items-center justify-center">
              <BotIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{aiName}</p>
              <p className="text-xs text-slate-400">AI Assistant • Always Available</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            Remember: Do not share sensitive or confidential information with AI systems.
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-ai-purple/20 flex items-center justify-center">
                <BotIcon />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                How can I help you today?
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                I can help with writing, analysis, coding, and more.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInputValue(prompt)}
                    className="p-3 text-left text-sm bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 text-slate-300 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-ai-purple flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <BotIcon />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[75%]',
                    message.role === 'user'
                      ? 'bg-primary-600 text-white rounded-2xl rounded-br-sm px-4 py-2'
                      : 'ai-message'
                  )}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <p
                    className={cn(
                      'text-xs mt-2',
                      message.role === 'user' ? 'text-primary-200' : 'text-slate-500'
                    )}
                  >
                    {formatRelativeTime(message.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-ai-purple flex items-center justify-center flex-shrink-0">
                <BotIcon />
              </div>
              <div className="ai-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Warning banner */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-3 bg-amber-500/10 border-t border-amber-500/30"
            >
              <div className="flex items-center gap-2 text-amber-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <path d="M12 9v4"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span>Your message may contain sensitive information. Please review before sending.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the AI assistant..."
              className={cn(
                'input flex-1 min-h-[44px] max-h-32 resize-none py-2.5',
                showWarning && 'border-amber-500/50 focus:border-amber-500'
              )}
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="btn-primary p-2.5 aspect-square"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13"/>
                <path d="m22 2-7 20-4-9-9-4 20-7Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </DesktopWindow>
  );
};

export { AIAssistantApp };
