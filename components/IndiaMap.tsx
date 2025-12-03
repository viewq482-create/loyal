
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import { STATE_METADATA } from '../constants';
import { TooltipState, StateData } from '../types';
import Tooltip from './Tooltip';

const GEOJSON_URL = 'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson';
const WIDTH = 800;
const HEIGHT = 1000;

// --- 1. STATIC BASE LAYER (Pure Performance) ---
const StaticMapLayer = React.memo(({ features, onHover, onLeave }: { 
  features: StateData[], 
  onHover: (s: StateData) => void,
  onLeave: () => void 
}) => {
  return (
    <g className="static-layer">
      {features.map((state) => (
        <path
          key={state.id}
          d={state.d}
          fill="url(#grid-pattern)"
          stroke="rgba(56, 189, 248, 0.2)"
          strokeWidth="0.5"
          className="transition-colors duration-300 ease-in-out hover:fill-slate-700/50 cursor-pointer outline-none"
          onMouseEnter={() => onHover(state)}
          onMouseLeave={onLeave}
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />
      ))}
    </g>
  );
}, (prev, next) => prev.features === next.features);

// --- 2. HIGHLIGHT LAYER (Visual FX) ---
const HighlightLayer = ({ state }: { state: StateData | null }) => {
  if (!state) return null;

  return (
    <g className="highlight-layer pointer-events-none">
      <motion.path
        d={state.d}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="6"
        strokeOpacity="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        filter="url(#glow)"
      />
      <motion.path
        d={state.d}
        fill="url(#hoverGradient)"
        stroke="#67e8f9"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1, filter: "drop-shadow(0 0 10px rgba(34,211,238,0.5))" }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          transformOrigin: `${state.centroid[0]}px ${state.centroid[1]}px`
        }}
      />
    </g>
  );
};

// --- 3. UI OVERLAY (Target Lock) ---
const TargetReticle = ({ x, y, visible }: { x: number, y: number, visible: boolean }) => {
  return (
    <motion.g
      animate={{ 
        x: x, 
        y: y, 
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.5 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="pointer-events-none"
    >
      <motion.circle 
        r="40" 
        fill="none" 
        stroke="#22d3ee" 
        strokeWidth="1" 
        strokeDasharray="4 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        opacity="0.6"
      />
      <motion.circle 
        r="32" 
        fill="none" 
        stroke="#3b82f6" 
        strokeWidth="1" 
        strokeDasharray="20 20"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        opacity="0.4"
      />
      <line x1="-10" y1="0" x2="10" y2="0" stroke="#22d3ee" strokeWidth="2" />
      <line x1="0" y1="-10" x2="0" y2="10" stroke="#22d3ee" strokeWidth="2" />
    </motion.g>
  );
};

// --- MAIN COMPONENT ---
const IndiaMap: React.FC = () => {
  const [features, setFeatures] = useState<StateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeState, setActiveState] = useState<StateData | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, content: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(GEOJSON_URL);
        const json = await res.json();
        
        const projection = d3.geoMercator();
        projection.fitExtent([[20, 20], [WIDTH - 20, HEIGHT - 20]], json);
        const pathGen = d3.geoPath().projection(projection);

        const processedFeatures = json.features.map((feature: any, i: number) => {
          const name = feature.properties?.st_nm || feature.properties?.state || feature.properties?.NAME_1;
          const meta = STATE_METADATA[name] || { name };
          const centroid = pathGen.centroid(feature);
          
          return {
            id: `state-${i}`,
            d: pathGen(feature) as string,
            centroid: centroid, 
            ...meta
          };
        });

        setFeatures(processedFeatures);
        setLoading(false);
      } catch (err) {
        console.error("Map Load Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleHover = useCallback((state: StateData) => {
    setActiveState(state);
    setTooltip({ visible: true, content: state });
  }, []);

  const handleLeave = useCallback(() => {
    setActiveState(null);
    setTooltip({ visible: false, content: null });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] gap-4">
        <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[800px] aspect-[4/5] perspective-1000 group">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)] pointer-events-none" />

      <motion.svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-full drop-shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="0.5"/>
            <circle cx="1" cy="1" r="1" fill="rgba(34,211,238,0.2)" />
          </pattern>

          <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <mask id="map-mask">
            <g>
              {features.map(f => <path key={f.id} d={f.d} fill="white" />)}
            </g>
          </mask>
        </defs>

        <StaticMapLayer features={features} onHover={handleHover} onLeave={handleLeave} />

        <AnimatePresence>
          {activeState && <HighlightLayer state={activeState} />}
        </AnimatePresence>

        <motion.g mask="url(#map-mask)" className="pointer-events-none">
          <motion.rect
            width="10"
            height={HEIGHT}
            fill="url(#hoverGradient)"
            opacity="0.3"
            initial={{ x: -20 }}
            animate={{ x: WIDTH + 20 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />
        </motion.g>

        <TargetReticle 
          x={activeState ? activeState.centroid[0] : WIDTH/2} 
          y={activeState ? activeState.centroid[1] : HEIGHT/2} 
          visible={!!activeState} 
        />
      </motion.svg>

      <Tooltip tooltip={tooltip} />
    </div>
  );
};

export default IndiaMap;
