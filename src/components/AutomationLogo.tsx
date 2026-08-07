import React, { useState } from 'react';
import { motion } from 'motion/react';

interface AutomationLogoProps {
  className?: string;
  showText?: boolean;
}

// 4 Cycle Scenarios demonstrating decision-making and fallback routing:
// Scenario 0: Direct Top Path (Success)
// Scenario 1: Blocked Middle (Dashed) -> Turns Red/Amber -> Reroutes to Top
// Scenario 2: Direct Bottom Path (Success)
// Scenario 3: Blocked Middle (Dashed) -> Turns Red/Amber -> Reroutes to Bottom
const SCENARIOS = [
  {
    id: 'top-direct',
    isBlockedAttempt: false,
    dashedHighlight: false,
    activeBranch: 0,
    cx: [6, 20, 30, 46, 46],
    cy: [12, 12, 5, 5, 5],
    fill: ['#6ee7b7', '#6ee7b7', '#6ee7b7', '#6ee7b7', '#6ee7b7'],
    duration: 2.2,
    finalNode: { x: 46, y: 5 },
  },
  {
    id: 'middle-blocked-reroute-top',
    isBlockedAttempt: true,
    dashedHighlight: true,
    activeBranch: 0,
    // Peeks into middle (x:23), turns RED, rebounds to hub (x:20) in AMBER, reroutes to TOP (y:5) in GREEN
    cx: [6, 20, 24, 20, 30, 46, 46],
    cy: [12, 12, 12, 12, 5, 5, 5],
    fill: ['#6ee7b7', '#6ee7b7', '#ef4444', '#f59e0b', '#6ee7b7', '#6ee7b7', '#6ee7b7'],
    duration: 2.8,
    finalNode: { x: 46, y: 5 },
  },
  {
    id: 'bottom-direct',
    isBlockedAttempt: false,
    dashedHighlight: false,
    activeBranch: 2,
    cx: [6, 20, 30, 46, 46],
    cy: [12, 12, 19, 19, 19],
    fill: ['#6ee7b7', '#6ee7b7', '#6ee7b7', '#6ee7b7', '#6ee7b7'],
    duration: 2.2,
    finalNode: { x: 46, y: 19 },
  },
  {
    id: 'middle-blocked-reroute-bottom',
    isBlockedAttempt: true,
    dashedHighlight: true,
    activeBranch: 2,
    // Peeks into middle (x:23), turns RED, rebounds to hub (x:20) in AMBER, reroutes to BOTTOM (y:19) in GREEN
    cx: [6, 20, 24, 20, 30, 46, 46],
    cy: [12, 12, 12, 12, 19, 19, 19],
    fill: ['#6ee7b7', '#6ee7b7', '#ef4444', '#f59e0b', '#6ee7b7', '#6ee7b7', '#6ee7b7'],
    duration: 2.8,
    finalNode: { x: 46, y: 19 },
  },
];

export const AutomationLogo: React.FC<AutomationLogoProps> = ({
  className = '',
  showText = true,
}) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const handleCycleComplete = () => {
    setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
  };

  const currentScenario = SCENARIOS[scenarioIndex];

  return (
    <a href="#top" aria-label="Ivan Valdez - Volver al inicio" className={`flex items-center gap-3.5 group py-1 select-none ${className}`}>
      {/* Animated Automation Emblem */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative px-2.5 py-1.5 h-9 min-w-[3.6rem] flex items-center justify-center bg-[#0d4d4d] text-[#fcfaf7] border border-[#0d4d4d] group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all duration-300 shadow-xs"
      >
        <svg
          viewBox="0 0 52 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-5 text-[#fcfaf7]"
        >
          <title>Diagrama de automatización de flujo</title>
          {/* Main Input Trunk Path */}
          <path
            d="M 6 12 L 20 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-50"
          />

          {/* Branch 0: Top Pathway (Valid Open Route) */}
          <path
            d="M 20 12 C 24 12, 26 5, 30 5 L 46 5"
            stroke={currentScenario.activeBranch === 0 ? '#6ee7b7' : 'currentColor'}
            strokeWidth={currentScenario.activeBranch === 0 ? '2' : '1.5'}
            strokeLinecap="round"
            className={currentScenario.activeBranch === 0 ? 'opacity-85' : 'opacity-25'}
          />

          {/* Branch 1: Middle Pathway (DASHED / BLOCKED ROUTE WITH DECISION WARNING) */}
          <path
            d="M 20 12 L 46 12"
            stroke={currentScenario.isBlockedAttempt ? '#ef4444' : 'currentColor'}
            strokeWidth={currentScenario.isBlockedAttempt ? '2' : '1.5'}
            strokeDasharray="3 2"
            strokeLinecap="round"
            className={currentScenario.isBlockedAttempt ? 'opacity-90 animate-pulse' : 'opacity-35'}
          />

          {/* Branch 2: Bottom Pathway (Valid Open Route) */}
          <path
            d="M 20 12 C 24 12, 26 19, 30 19 L 46 19"
            stroke={currentScenario.activeBranch === 2 ? '#6ee7b7' : 'currentColor'}
            strokeWidth={currentScenario.activeBranch === 2 ? '2' : '1.5'}
            strokeLinecap="round"
            className={currentScenario.activeBranch === 2 ? 'opacity-85' : 'opacity-25'}
          />

          {/* Dynamic Animated Particle with Decision Rerouting */}
          <motion.circle
            key={scenarioIndex}
            r="2.5"
            animate={{
              cx: currentScenario.cx,
              cy: currentScenario.cy,
              fill: currentScenario.fill,
              opacity: [0, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: currentScenario.duration,
              ease: 'easeInOut',
            }}
            onAnimationComplete={handleCycleComplete}
          />

          {/* Input Trigger Node (Left) */}
          <circle cx="6" cy="12" r="2.5" fill="currentColor" />

          {/* Decision & Processing Core Node (Center Hub) */}
          <motion.circle
            cx="20"
            cy="12"
            r="2.75"
            stroke={currentScenario.isBlockedAttempt ? '#f59e0b' : 'currentColor'}
            strokeWidth="1.5"
            fill="#0d4d4d"
            animate={
              currentScenario.isBlockedAttempt
                ? { scale: [1, 1.4, 1, 1.2, 1] }
                : { scale: [1, 1.25, 1] }
            }
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Output Nodes (Right) */}
          {/* Top Output Node */}
          <motion.circle
            cx="46"
            cy="5"
            r={currentScenario.activeBranch === 0 ? '2.75' : '2'}
            fill={currentScenario.activeBranch === 0 ? '#6ee7b7' : 'currentColor'}
            className={currentScenario.activeBranch === 0 ? '' : 'opacity-40'}
            animate={currentScenario.activeBranch === 0 ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Middle Output Node (Blocked / Disabled) */}
          <circle
            cx="46"
            cy="12"
            r="2"
            fill={currentScenario.isBlockedAttempt ? '#ef4444' : 'currentColor'}
            className="opacity-30"
          />

          {/* Bottom Output Node */}
          <motion.circle
            cx="46"
            cy="19"
            r={currentScenario.activeBranch === 2 ? '2.75' : '2'}
            fill={currentScenario.activeBranch === 2 ? '#6ee7b7' : 'currentColor'}
            className={currentScenario.activeBranch === 2 ? '' : 'opacity-40'}
            animate={currentScenario.activeBranch === 2 ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </svg>

        {/* Live Status Signal Badge */}
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6ee7b7] opacity-80" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6ee7b7]" />
        </span>
      </motion.div>

      {/* Uppercase Personal Name Identity */}
      {showText && (
        <span className="font-sans font-extrabold text-sm sm:text-base text-[#1a1a1a] group-hover:text-[#0d4d4d] transition-colors tracking-wider uppercase">
          IVAN VALDEZ
        </span>
      )}
    </a>
  );
};



