'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn, formatRelativeTime, truncate } from '@/lib/utils';
import { useSimulationStore } from '@/store';
import { DesktopWindow } from './DesktopWindow';
import type { Email } from '@/types';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

interface EmailAppProps {
  emails?: Email[];
  onEmailClick?: (email: Email) => void;
  onReply?: (email: Email, content: string) => void;
}

const EmailApp: React.FC<EmailAppProps> = ({
  emails: propEmails,
  onEmailClick,
  onReply,
}) => {
  const { emails: storeEmails, markEmailRead } = useSimulationStore();
  const emails = propEmails || storeEmails;
  
  const [selectedEmail, setSelectedEmail] = React.useState<Email | null>(null);
  const [isReplying, setIsReplying] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState('');

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      markEmailRead(email.id);
    }
    onEmailClick?.(email);
  };

  const handleReply = () => {
    if (selectedEmail && replyContent.trim()) {
      onReply?.(selectedEmail, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  const toolbar = (
    <div className="flex items-center gap-2">
      <button className="btn-ghost text-sm flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" x2="12" y1="15" y2="3"/>
        </svg>
        Inbox
      </button>
      <button className="btn-ghost text-sm flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2 11 13"/>
          <path d="m22 2-7 20-4-9-9-4 20-7Z"/>
        </svg>
        Sent
      </button>
    </div>
  );

  return (
    <DesktopWindow
      title="Email"
      icon={<EmailIcon />}
      toolbar={toolbar}
    >
      <div className="flex h-full">
        {/* Email list */}
        <div className="w-80 border-r border-slate-700 overflow-y-auto">
          {emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <EmailIcon />
              <p className="mt-2 text-sm">No emails</p>
            </div>
          ) : (
            emails.map((email) => (
              <motion.button
                key={email.id}
                onClick={() => handleEmailClick(email)}
                className={cn(
                  'w-full text-left p-4 border-b border-slate-700/50 transition-colors',
                  selectedEmail?.id === email.id
                    ? 'bg-slate-700/50'
                    : 'hover:bg-slate-800/50',
                  !email.isRead && 'border-l-2 border-l-primary-500'
                )}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        'text-sm truncate',
                        !email.isRead ? 'text-white font-semibold' : 'text-slate-300'
                      )}
                    >
                      {email.from.name}
                    </p>
                    <p
                      className={cn(
                        'text-sm truncate mt-0.5',
                        !email.isRead ? 'text-white' : 'text-slate-400'
                      )}
                    >
                      {email.subject}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-1">
                      {truncate(email.preview || email.body, 60)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-slate-500">
                      {formatRelativeTime(email.timestamp)}
                    </span>
                    {email.priority === 'high' && (
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                    )}
                    {email.hasAttachment && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                    )}
                  </div>
                </div>
              </motion.button>
            ))
          )}
        </div>

        {/* Email content */}
        <div className="flex-1 flex flex-col">
          {selectedEmail ? (
            <>
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-lg font-semibold text-white">
                  {selectedEmail.subject}
                </h2>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-ai-purple flex items-center justify-center text-white text-sm font-medium">
                      {selectedEmail.from.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-white">{selectedEmail.from.name}</p>
                      <p className="text-xs text-slate-400">
                        to me • {formatRelativeTime(selectedEmail.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 whitespace-pre-wrap">
                    {selectedEmail.body}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-700">
                {isReplying ? (
                  <div className="space-y-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply..."
                      className="input w-full min-h-[100px] resize-none"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsReplying(false)}
                        className="btn-secondary text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleReply}
                        className="btn-primary text-sm"
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsReplying(true)}
                      className="btn-secondary text-sm flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 17 4 12 9 7"/>
                        <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                      </svg>
                      Reply
                    </button>
                    <button className="btn-ghost text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 17 20 12 15 7"/>
                        <path d="M4 18v-2a4 4 0 0 1 4-4h12"/>
                      </svg>
                      Forward
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <EmailIcon />
                <p className="mt-2 text-sm">Select an email to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DesktopWindow>
  );
};

export { EmailApp };
