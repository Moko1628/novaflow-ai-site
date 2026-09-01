'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionDecorationProps {
  variant?: 'light' | 'dark';
}

export default function SectionDecoration({ variant = 'light' }: SectionDecorationProps) {
  if (variant === 'dark') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
        <motion.div
          className="absolute top-0 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[80px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-right blob */}
      <motion.div
        className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[100px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bottom-left blob */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-purple-100/40 blur-[80px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Center subtle ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-blue-200/10" />
    </div>
  );
}
