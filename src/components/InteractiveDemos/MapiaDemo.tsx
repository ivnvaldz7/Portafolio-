import React, { useState } from 'react';
import { MapPin, Navigation, GripVertical, Plus, Route, Check, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../../types';

interface Stop {
  id: string;
  address: string;
  pinned: boolean;
}

const INITIAL_STOPS: Stop[] = [
  { id: '1', address: 'Av. Corrientes 1300, CABA', pinned: true },
  { id: '2', address: 'Palermo Soho, CABA', pinned: false },
  { id: '3', address: 'Belgrano R, CABA', pinned: false },
  { id: '4', address: 'Puerto Madero, CABA', pinned: false },
];

export const MapiaDemo: React.FC<{ language: Language }> = ({ language }) => {
  const isEs = language === 'es';
  const [stops, setStops] = useState<Stop[]>(INITIAL_STOPS);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setOptimized(false);
    
    // Simulate TSP Algorithm processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Reorder array (simulated optimization)
    const pinnedStops = stops.filter(s => s.pinned);
    const unpinnedStops = stops.filter(s => !s.pinned);
    
    // Just reverse unpinned to simulate finding a better order
    const optimizedOrder = [...pinnedStops, ...unpinnedStops.reverse()];
    
    setStops(optimizedOrder);
    setIsOptimizing(false);
    setOptimized(true);
  };

  const handleRemove = (id: string) => {
    setStops(stops.filter(s => s.id !== id));
    setOptimized(false);
  };

  const togglePin = (id: string) => {
    setStops(stops.map(s => s.id === id ? { ...s, pinned: !s.pinned } : s));
    setOptimized(false);
  };

  return (
    <div className="bg-[#fcfaf7] border border-[#1a1a1a]/20 text-[#1a1a1a] shadow-lg flex flex-col md:flex-row overflow-hidden min-h-[450px]">
      
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-white border-r border-[#1a1a1a]/10 flex flex-col">
        <div className="p-4 border-b border-[#1a1a1a]/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-[#0d4d4d] text-white flex items-center justify-center font-bold font-serif-editorial">M</div>
            <h3 className="font-bold text-sm">Mapia Optimizer</h3>
          </div>
          <p className="text-[10px] text-[#666666] font-mono uppercase tracking-widest">
             {isEs ? 'Planificador de Rutas TSP (Muestra)' : 'TSP Route Planner (Sample)'}
          </p>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
             <span>{isEs ? 'Paradas' : 'Stops'} ({stops.length})</span>
             {optimized && <span className="text-emerald-600 flex items-center gap-1"><Check className="w-3 h-3" /> {isEs ? 'Optimizado' : 'Optimized'}</span>}
          </div>

          <div className="space-y-2">
            <AnimatePresence>
              {stops.map((stop, index) => (
                <motion.div
                  layout
                  key={stop.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`group flex items-center gap-2 p-2 border ${stop.pinned ? 'bg-black/5 border-[#1a1a1a]/20' : 'bg-white border-[#1a1a1a]/10 hover:border-[#0d4d4d]/50'}`}
                >
                   <span className="text-[#666666] cursor-grab active:cursor-grabbing" aria-hidden="true">
                     <GripVertical className="w-4 h-4" />
                   </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="flex-shrink-0 w-4 h-4 bg-[#1a1a1a] text-white text-[9px] flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <p className="text-xs truncate font-medium text-[#1a1a1a]">{stop.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => togglePin(stop.id)}
                      className="p-1 hover:bg-black/5 text-[#666666]"
                       title={stop.pinned ? (isEs ? 'Desfijar' : 'Unpin') : (isEs ? 'Fijar parada (no se moverá al optimizar)' : 'Pin stop (it will stay in place when optimizing)')}
                       aria-label={stop.pinned ? (isEs ? 'Desfijar parada' : 'Unpin stop') : (isEs ? 'Fijar parada' : 'Pin stop')}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${stop.pinned ? 'fill-current text-[#0d4d4d]' : ''}`} />
                    </button>
                    <button 
                      onClick={() => handleRemove(stop.id)}
                      aria-label={isEs ? `Eliminar parada ${stop.address}` : `Remove stop ${stop.address}`}
                      className="p-1 hover:bg-black/5 text-rose-500"
                    >
                      &times;
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button type="button" disabled aria-disabled="true" className="w-full mt-3 p-2 border border-dashed border-[#1a1a1a]/30 text-xs text-[#666666] opacity-60 cursor-not-allowed flex items-center justify-center gap-1.5 transition-colors">
            <Plus className="w-3.5 h-3.5" /> {isEs ? 'Agregar parada' : 'Add stop'}
          </button>
        </div>

        <div className="p-4 border-t border-[#1a1a1a]/10 bg-black/5">
          <div className="flex items-center justify-between text-xs mb-3 font-mono">
            <span className="text-[#666666]">{isEs ? 'Distancia est.' : 'Est. distance'}</span>
            <span className="font-bold">{optimized ? '12.4 km' : '18.7 km'}</span>
          </div>
          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className={`w-full py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2 ${
              isOptimizing ? 'bg-[#0d4d4d]/70 cursor-wait' : 'bg-[#0d4d4d] hover:bg-[#0a3a3a]'
            }`}
          >
            {isOptimizing ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
                <Route className="w-4 h-4" />
              </motion.div>
            ) : (
              <Route className="w-4 h-4" />
            )}
            {isOptimizing ? (isEs ? 'Optimizando...' : 'Optimizing...') : (isEs ? 'Optimizar Ruta' : 'Optimize Route')}
          </button>
        </div>
      </div>

      {/* Simulated Map Area */}
      <div className="flex-1 relative bg-[#e5e3df] min-h-[300px] overflow-hidden flex items-center justify-center">
        {/* Fake Map Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1a1a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        {/* Animated route lines simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}>
          {optimized ? (
             <motion.path
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               d="M 150 150 C 200 100, 300 200, 350 150"
               fill="transparent"
               stroke="#0d4d4d"
               strokeWidth="4"
               strokeLinecap="round"
             />
          ) : (
             <path
               d="M 150 150 L 350 150 L 250 250 Z"
               fill="transparent"
               stroke="#666666"
               strokeWidth="2"
               strokeDasharray="5,5"
             />
          )}
        </svg>

        {/* Map Markers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 p-4 bg-white/90 backdrop-blur border border-[#1a1a1a]/10 shadow-lg">
          <Car className="w-8 h-8 text-[#0d4d4d] mx-auto mb-2" />
           <p className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">{isEs ? 'Interfaz de Mapa' : 'Interactive Map UI'}</p>
           <p className="text-[10px] text-[#666666]">OpenRouteService + MapLibre</p>
          <div className="mt-3 flex justify-center gap-1 text-[10px]">
            <span className="px-2 py-0.5 bg-[#0d4d4d] text-white">WebGL</span>
            <span className="px-2 py-0.5 bg-[#0d4d4d] text-white">TSP</span>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button type="button" disabled aria-label={isEs ? 'Acercar mapa (muestra)' : 'Zoom in (sample)'} className="w-8 h-8 bg-white shadow border border-[#1a1a1a]/10 flex items-center justify-center text-[#1a1a1a] opacity-60 cursor-not-allowed">
            +
          </button>
          <button type="button" disabled aria-label={isEs ? 'Alejar mapa (muestra)' : 'Zoom out (sample)'} className="w-8 h-8 bg-white shadow border border-[#1a1a1a]/10 flex items-center justify-center text-[#1a1a1a] opacity-60 cursor-not-allowed">
            -
          </button>
          <button type="button" disabled aria-label={isEs ? 'Centrar mapa (muestra)' : 'Center map (sample)'} className="w-8 h-8 bg-white shadow border border-[#1a1a1a]/10 flex items-center justify-center text-[#0d4d4d] mt-2 opacity-60 cursor-not-allowed">
            <Navigation className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};
