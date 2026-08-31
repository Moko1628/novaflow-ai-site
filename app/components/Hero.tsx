'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  // Animation de convergence
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      <motion.div
        className="container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          variants={itemVariants}
        >
          Travailler malin, avec NovaFlow AI.
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Vos processus deviennent fluides, sans stress.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <a
            href="#offres"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            Découvrir nos offres
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
