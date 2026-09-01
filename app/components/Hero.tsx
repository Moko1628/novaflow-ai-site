'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroBackground from './HeroBackground';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <HeroBackground />

      {/* Content Layer */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          variants={itemVariants}
        >
          Travailler malin, avec NovaFlow AI.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-blue-100/90 mb-10 max-w-2xl mx-auto drop-shadow-md"
          variants={itemVariants}
        >
          Vos processus deviennent fluides, sans stress.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <a
            href="#offres"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
          >
            Découvrir nos offres
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
