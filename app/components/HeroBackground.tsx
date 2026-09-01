'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />

      {/* Animated glowing mesh blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[140px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* SVG Converging Data Flows & Network Nodes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Converging curved paths toward center */}
        <motion.path
          d="M 100,150 Q 720,400 1340,180"
          stroke="url(#lineGrad1)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.path
          d="M 150,750 Q 720,500 1290,720"
          stroke="url(#lineGrad2)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.2, delay: 0.3, ease: 'easeOut' }}
        />
        <motion.path
          d="M 200,450 Q 720,450 1240,450"
          stroke="url(#lineGrad1)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
        />
        <motion.path
          d="M 400,100 Q 720,450 1040,800"
          stroke="url(#lineGrad2)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.5, delay: 0.2, ease: 'easeOut' }}
        />
        <motion.path
          d="M 1100,120 Q 720,450 340,780"
          stroke="url(#lineGrad1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.5, delay: 0.4, ease: 'easeOut' }}
        />

        {/* Floating Node Circles */}
        {[
          { cx: 300, cy: 250, r: 4, color: '#3b82f6' },
          { cx: 1150, cy: 300, r: 5, color: '#a855f7' },
          { cx: 500, cy: 650, r: 3.5, color: '#06b6d4' },
          { cx: 950, cy: 680, r: 4.5, color: '#ec4899' },
          { cx: 720, cy: 450, r: 6, color: '#ffffff' },
        ].map((node, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.color}
              filter="url(#glow)"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r * 3}
              stroke={node.color}
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Subtle bottom fade overlay for seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent opacity-90" />
    </div>
  );
}
