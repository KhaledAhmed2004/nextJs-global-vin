"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { IoCarSharp } from "react-icons/io5";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

// Fixed particle positions to avoid hydration mismatch
const particlePositions = [
  { initialX: -50, initialY: 30, animateX: 120, animateY: -80 },
  { initialX: 60, initialY: -40, animateX: -100, animateY: 60 },
  { initialX: -30, initialY: -60, animateX: 80, animateY: 100 },
  { initialX: 70, initialY: 50, animateX: -120, animateY: -40 },
  { initialX: -80, initialY: 20, animateX: 60, animateY: -90 },
  { initialX: 40, initialY: -30, animateX: -80, animateY: 70 },
];

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Show loading for 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155]"
        >
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-orange-500 rounded-full blur-2xl"
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -50 }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1], // Spring-like bounce
              }}
              className="mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(30, 58, 138, 0.5)",
                    "0 0 60px rgba(30, 58, 138, 0.8)",
                    "0 0 20px rgba(30, 58, 138, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-[#1E3A8A] p-6 rounded-2xl"
              >
                <IoCarSharp size={60} className="text-white" />
              </motion.div>
            </motion.div>

            {/* Text animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Global
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                  VIN
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-gray-400 text-lg"
              >
                Vehicle History Reports Worldwide
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "200px" }}
              exit={{ opacity: 0, width: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-10 h-1 bg-gray-700 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full"
              />
            </motion.div>

            {/* Floating particles */}
            {isMounted && particlePositions.map((pos, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: pos.initialX,
                  y: pos.initialY,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: pos.animateX,
                  y: pos.animateY,
                }}
                transition={{
                  duration: 2.5 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;