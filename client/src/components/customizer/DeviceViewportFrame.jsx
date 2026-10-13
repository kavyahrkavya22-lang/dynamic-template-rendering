import React from 'react';
import { motion } from 'framer-motion';

const DeviceViewportFrame = ({ viewport = 'desktop', children }) => {
  if (viewport === 'mobile') {
    return (
      <div className="py-8 px-4 flex justify-center items-start min-h-full">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-[375px] max-w-full rounded-[44px] border-[10px] border-slate-800 bg-slate-900 shadow-2xl overflow-hidden relative"
        >
          {/* Mobile Speaker/Camera Notch */}
          <div className="h-6 bg-slate-800 flex items-center justify-center relative z-20">
            <div className="w-20 h-3.5 bg-slate-950 rounded-full flex items-center justify-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <div className="w-2 h-2 rounded-full bg-indigo-900" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="max-h-[750px] overflow-y-auto bg-white dark:bg-slate-950">
            {children}
          </div>

          {/* Home Bar Indicator */}
          <div className="h-4 bg-slate-800 flex items-center justify-center">
            <div className="w-28 h-1 bg-slate-600 rounded-full" />
          </div>
        </motion.div>
      </div>
    );
  }

  if (viewport === 'tablet') {
    return (
      <div className="py-8 px-4 flex justify-center items-start min-h-full">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-[768px] max-w-full rounded-[32px] border-[12px] border-slate-800 bg-slate-900 shadow-2xl overflow-hidden relative"
        >
          {/* Tablet Camera */}
          <div className="h-4 bg-slate-800 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-950" />
          </div>

          {/* Screen Content */}
          <div className="max-h-[800px] overflow-y-auto bg-white dark:bg-slate-950">
            {children}
          </div>

          <div className="h-4 bg-slate-800" />
        </motion.div>
      </div>
    );
  }

  // Desktop (100% full preview)
  return <div className="w-full min-h-full">{children}</div>;
};

export default DeviceViewportFrame;
