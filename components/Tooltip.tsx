
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TooltipState } from '../types';

interface TooltipProps {
  tooltip: TooltipState;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltip }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Direct DOM manipulation for high-performance mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const x = e.clientX + 20;
        const y = e.clientY - 20;
        containerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    if (tooltip.visible) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tooltip.visible]);

  return (
    <>
      <div 
        ref={containerRef} 
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none', willChange: 'transform' }}
      >
        <AnimatePresence>
          {tooltip.visible && tooltip.content && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.15 }}
              className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 p-4 rounded-lg shadow-2xl min-w-[180px]"
            >
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2">{tooltip.content.name}</h3>
                
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-200 text-sm">Active Clients:</span>
                  <span className="text-white font-mono font-bold text-lg">
                    {tooltip.content.clients || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Status:</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    tooltip.content.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    tooltip.content.status === 'Growing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {tooltip.content.status || 'N/A'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Tooltip;
