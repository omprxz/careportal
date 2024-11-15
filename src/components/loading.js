'use client'

import { motion } from 'framer-motion'

const heartbeatVariants = {
  animate: {
    scale: [1, 1.2, 1, 0.8, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
}

const lineVariants = {
  initial: { pathLength: 0, pathOffset: 0 },
  animate: {
    pathLength: 1,
    pathOffset: 1,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

const textVariants = {
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      opacity: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  }
}

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="relative w-64 h-32">
        <svg
          viewBox="0 0 400 100"
          className="w-full h-full"
        >
          <motion.path
            d="M 0 50 L 100 50 L 150 0 L 200 100 L 250 0 L 300 100 L 350 50 L 400 50"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            variants={lineVariants}
            initial="initial"
            animate="animate"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          className="absolute left-1/2 top-1/2 w-4 h-4 -ml-2 -mt-2 bg-red-500 rounded-full"
          variants={heartbeatVariants}
          animate="animate"
        />
      </div>
      <motion.p
        className="mt-6 text-lg font-semibold text-indigo-700"
        variants={textVariants}
        animate="animate"
      >
        Analyzing your symptoms...
      </motion.p>
    </div>
  )
}