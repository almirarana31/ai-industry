'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatRelativeTime } from '@/lib/utils';
import { useSimulationStore } from '@/store';
import { DesktopWindow } from './DesktopWindow';
import type { NPCMessage } from '@/types';

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

interface ChatAppProps {
  messages?: NPCMessage[];
  onSendMessage?: (content: string) => void;
  npcName?: string;
  npcRole?: string;
  isTyping?: boolean;
}

const ChatApp: React.FC<ChatAppProps> = ({
  messages: propMessages,
  onSendMessage,
  npcName = 'Sarah Chen',
  npcRole = 'Colleague',
  isTyping: propIsTyping,
}) => {
  const { chatMessages, isTyping: storeIsTyping, addChatMessage } = useSimulationStore();
  const messages = propMessages || chatMessages;
  const isTyping = propIsTyping ?? storeIsTyping;
  
  const [inputValue, setInputValue] = React.useState('');
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
      addChatMessage(userMessage);
      onSendMessage?.(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DesktopWindow title="Internal Chat" icon={<ChatIcon />}>
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="p-4 border-b border-slate-700 flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-medium">
              {npcName.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{npcName}</p>
            <p className="text-xs text-slate-400">{npcRole} • Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl px-4 py-2',
                    message.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-sm'
                      : 'bg-slate-700 text-slate-200 rounded-bl-sm'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={cn(
                      'text-xs mt-1',
                      message.role === 'user' ? 'text-primary-200' : 'text-slate-400'
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
              className="flex items-center gap-2"
            >
              <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-4 py-3">
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

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="input flex-1 min-h-[44px] max-h-32 resize-none py-2.5"
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

export { ChatApp };
