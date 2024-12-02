import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const AIAccuracyChart = ({ accuracy }) => {
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0);
  const normalizedAccuracy = Math.min(Math.max(accuracy, 0), 100);

  useEffect(() => {
    const animationDuration = 1000;
    const steps = 60;
    const increment = normalizedAccuracy / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedAccuracy(prev => Math.min(prev + increment, normalizedAccuracy));
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, animationDuration / steps);

    return () => clearInterval(interval);
  }, [normalizedAccuracy]);

  const getGradientColor = (value) => {
    if (value < 33) return 'from-red-500 to-red-600';
    if (value < 66) return 'from-yellow-400 to-orange-500';
    return 'from-green-400 to-green-600';
  };

  const getIcon = (value) => {
    if (value < 33) return <AlertCircle className="w-6 h-6 text-red-500" />;
    if (value < 66) return <Activity className="w-6 h-6 text-orange-500" />;
    return <CheckCircle className="w-6 h-6 text-green-500" />;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg p-5 space-y-2 transition-colors duration-200">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold text-gray-900">Accuracy</h2>
        <div className="flex items-center justify-center space-x-2">
          {getIcon(normalizedAccuracy)} 
          <p className={`text-5xl font-black bg-gradient-to-r ${getGradientColor(normalizedAccuracy)} bg-clip-text text-transparent`}>
            {animatedAccuracy.toFixed(1)}%
          </p>
        </div>
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-24 flex items-center justify-center">
          <div className="relative w-full h-16 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full">
            <motion.div
              className="absolute top-0 right-0 bottom-0 bg-white rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: `${100 - animatedAccuracy}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 w-1 h-24 bg-gray-900 rounded-full shadow-lg"
              style={{ 
                left: `${animatedAccuracy}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ height: 0 }}
              animate={{ height: 24 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
          </div>
        </div>
        <div className="mt-2 flex justify-between text-xs font-bold text-gray-600">
          <span>Unsure</span>
          <span>Likely</span>
          <span>Sure</span>
        </div>
      </div>
    </div>
  );
};

export default AIAccuracyChart;
