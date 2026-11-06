import { useState } from 'react';
import { ArrowRight, BusFront, MapPinned, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Language } from '../../types';

type LineId = '60' | '152' | '39';
type Direction = 'outbound' | 'return';
type ServiceState = 'normal' | 'delay' | 'detour';

const lines: Record<LineId, { label: string; stops: { es: string; en: string }[] }> = {
  '60': { label: '60', stops: [
    { es: 'Cabecera Norte', en: 'North terminal' }, { es: 'Plaza Modelo', en: 'Sample square' },
    { es: 'Estación Central', en: 'Central station' }, { es: 'Hospital Modelo', en: 'Sample hospital' },
    { es: 'Cabecera Centro', en: 'Central terminal' },
  ] },
  '152': { label: '152', stops: [
    { es: 'Cabecera Centro', en: 'Central terminal' }, { es: 'Av. de Muestra', en: 'Sample avenue' },
    { es: 'Parque Modelo', en: 'Sample park' }, { es: 'Estación Ribera', en: 'Riverside station' },
    { es: 'Cabecera Ribera', en: 'Riverside terminal' },
  ] },
  '39': { label: '39', stops: [
    { es: 'Cabecera Oeste', en: 'West terminal' }, { es: 'Cruce Modelo', en: 'Sample crossing' },
    { es: 'Universidad Modelo', en: 'Sample university' }, { es: 'Estación Central', en: 'Central station' },
    { es: 'Cabecera Centro', en: 'Central terminal' },
  ] },
};

const copy = {
  es: {
    concept: 'Concepto en desarrollo', sample: 'SIMULACIÓN · Sin datos de transporte en vivo',
    intro: 'Explorá cómo se consultarían líneas, sentidos, paradas e incidencias en Bond-IA.',
    line: 'Línea de ejemplo', direction: 'Sentido', outbound: 'Ida', return: 'Vuelta',
    service: 'Simular estado del servicio', normal: 'Normal', delay: 'Demoras', detour: 'Desvío',
    notices: { normal: 'El recorrido de muestra no tiene incidencias.', delay: 'La frecuencia simulada es menor: revisá el tiempo de espera de cada parada.', detour: 'Un tramo alternativo de muestra podría modificar las paradas disponibles.' },
    schematic: 'Esquema de recorrido', notMap: 'No es un mapa geográfico ni un recorrido oficial',
    stops: 'Paradas del ejemplo', selected: 'Parada seleccionada', stop: 'Parada',
    next: 'Siguiente parada', final: 'Fin del recorrido', wait: 'Espera simulada', minutes: 'min',
    reset: 'Reiniciar', disclaimer: 'Números de línea, nombres de paradas, estados y tiempos son ilustrativos. Bond-IA aún no consulta fuentes oficiales.',
  },
  en: {
    concept: 'Concept in progress', sample: 'SIMULATION · No live transit data',
    intro: 'Explore how riders could check lines, directions, stops, and disruptions in Bond-IA.',
    line: 'Example line', direction: 'Direction', outbound: 'Outbound', return: 'Return',
    service: 'Simulate service state', normal: 'Normal', delay: 'Delays', detour: 'Detour',
    notices: { normal: 'The sample route has no disruptions.', delay: 'Simulated frequency is lower: check the sample wait at each stop.', detour: 'A sample alternate segment could change the available stops.' },
    schematic: 'Route schematic', notMap: 'This is not a geographic map or official route',
    stops: 'Example stops', selected: 'Selected stop', stop: 'Stop',
    next: 'Next stop', final: 'End of route', wait: 'Simulated wait', minutes: 'min',
    reset: 'Reset', disclaimer: 'Line numbers, stop names, states, and times are illustrative. Bond-IA does not yet use official sources.',
  },
} as const;

const pointX = [40, 170, 300, 430, 560];
const pointY = [108, 108, 58, 108, 108];
const lineOrder: LineId[] = ['60', '152', '39'];

export function BondIADemo({ language }: { language: Language }) {
  const t = copy[language];
  const reduceMotion = useReducedMotion();
  const [lineId, setLineId] = useState<LineId>('60');
  const [direction, setDirection] = useState<Direction>('outbound');
  const [serviceState, setServiceState] = useState<ServiceState>('normal');
  const [selectedStopIndex, setSelectedStopIndex] = useState(0);
  const stops = direction === 'outbound' ? lines[lineId].stops : [...lines[lineId].stops].reverse();
  const selectedStop = stops[selectedStopIndex];
  const wait = 3 + selectedStopIndex * 3 + (serviceState === 'delay' ? 6 : serviceState === 'detour' ? 4 : 0);

  const reset = () => { setLineId('60'); setDirection('outbound'); setServiceState('normal'); setSelectedStopIndex(0); };

  return (
    <section className="my-4 overflow-hidden rounded-2xl border border-[#6e568f] bg-[#221b33] font-sans text-[#f8f6fb] shadow-xl" aria-label={language === 'es' ? 'Prototipo Bond-IA' : 'Bond-IA prototype'}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 bg-[#2d2342] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="rounded-xl border border-[#b9a4df]/40 bg-[#b9a4df]/10 p-2 text-[#d8c5f3]"><BusFront className="h-5 w-5" aria-hidden="true" /></span>
          <div><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-semibold">Bond-IA</h3><span className="rounded-full border border-[#b9a4df]/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#d8c5f3]">{t.concept}</span></div><p className="mt-1 max-w-xl text-xs leading-relaxed text-[#d1c6e2]">{t.intro}</p><p className="mt-2 font-mono text-[10px] font-bold tracking-wider text-[#e3d4fa]">{t.sample}</p></div>
        </div>
        <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-[#9d87bd] px-3 py-2 text-xs text-[#f8f6fb] transition-colors hover:bg-[#584472] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8c5f3]"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />{t.reset}</button>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-[#d1c6e2]">{t.line}
            <select value={lineId} onChange={(event) => { setLineId(event.target.value as LineId); setSelectedStopIndex(0); }} className="mt-1.5 w-full rounded-lg border border-[#9d87bd] bg-[#322744] px-3 py-2.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-[#d8c5f3]">
              {lineOrder.map((id) => <option key={id} value={id}>{language === 'es' ? 'Línea' : 'Line'} {id}</option>)}
            </select>
          </label>
          <div><span className="block text-xs font-semibold text-[#d1c6e2]">{t.direction}</span><div role="group" aria-label={t.direction} className="mt-1.5 grid grid-cols-2 gap-2">{(['outbound', 'return'] as Direction[]).map((value) => <button key={value} type="button" aria-pressed={direction === value} onClick={() => { setDirection(value); setSelectedStopIndex(0); }} className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8c5f3] ${direction === value ? 'border-[#d8c5f3] bg-[#725b9a] text-white' : 'border-[#6e568f] text-[#d1c6e2] hover:bg-[#392c50]'}`}>{t[value]}</button>)}</div></div>
        </div>

        <div className="rounded-xl border border-[#6e568f] bg-[#2d2342] p-4">
          <span className="block text-xs font-semibold text-[#d1c6e2]">{t.service}</span>
          <div role="group" aria-label={t.service} className="mt-2 flex flex-wrap gap-2">{(['normal', 'delay', 'detour'] as ServiceState[]).map((value) => <button key={value} type="button" aria-pressed={serviceState === value} onClick={() => setServiceState(value)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8c5f3] ${serviceState === value ? 'border-[#d8c5f3] bg-[#725b9a] text-white' : 'border-[#6e568f] text-[#d1c6e2] hover:bg-[#392c50]'}`}>{t[value]}</button>)}</div>
          <p aria-live="polite" className="mt-3 text-xs leading-relaxed text-[#e3d4fa]">{t.notices[serviceState]}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="space-y-4 rounded-xl border border-[#6e568f] bg-[#2d2342] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="flex items-center gap-1.5 text-sm font-semibold"><MapPinned className="h-4 w-4 text-[#d8c5f3]" aria-hidden="true" />{t.schematic}</h4><span className="text-[10px] text-[#c4b5da]">{t.notMap}</span></div>
            <svg viewBox="0 0 600 150" role="img" aria-label={`${t.schematic}: ${stops.map((stop) => stop[language]).join(', ')}`} className="w-full rounded-lg bg-[#1c172b]">
              <path d="M40 108 L170 108 L300 58 L430 108 L560 108" fill="none" stroke="#695580" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M40 108 L170 108 L300 58 L430 108 L560 108" fill="none" stroke="#b9a4df" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {pointX.map((x, index) => <g key={x}><circle cx={x} cy={pointY[index]} r="9" fill={selectedStopIndex === index ? '#e9d9ff' : '#322744'} stroke="#d8c5f3" strokeWidth="3" /><text x={x} y={pointY[index] + 31} textAnchor="middle" fill="#e3d4fa" fontSize="11" fontFamily="monospace">{index + 1}</text></g>)}
              <motion.circle cx={pointX[selectedStopIndex]} cy={pointY[selectedStopIndex]} r="4" fill="#584472" animate={{ cx: pointX[selectedStopIndex], cy: pointY[selectedStopIndex] }} transition={{ duration: reduceMotion ? 0 : 0.3 }} />
            </svg>
            <h5 className="text-xs font-semibold text-[#d1c6e2]">{t.stops}</h5>
            <ol className="grid gap-2 sm:grid-cols-2">{stops.map((stop, index) => <li key={`${lineId}-${direction}-${stop.es}`}><button type="button" aria-pressed={selectedStopIndex === index} onClick={() => setSelectedStopIndex(index)} className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8c5f3] ${selectedStopIndex === index ? 'border-[#d8c5f3] bg-[#584472] text-white' : 'border-[#6e568f] bg-[#241d35] text-[#ded3ee] hover:bg-[#392c50]'}`}><span className="font-mono text-[#e3d4fa]">{String(index + 1).padStart(2, '0')}</span>{stop[language]}</button></li>)}</ol>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`${lineId}-${direction}-${selectedStopIndex}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} aria-live="polite" className="h-fit rounded-xl border border-[#9d87bd] bg-[#392c50] p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#d8c5f3]">{t.selected}</span><h4 className="mt-2 text-lg font-semibold text-white">{selectedStop[language]}</h4><p className="mt-1 text-xs text-[#d1c6e2]">{t.stop} {selectedStopIndex + 1} / {stops.length}</p>
              <div className="mt-4 border-t border-white/15 pt-4"><span className="block text-[11px] text-[#d1c6e2]">{t.wait}</span><strong className="mt-1 block text-2xl tabular-nums text-white">{wait} {t.minutes}</strong></div>
              <div className="mt-4 flex items-center gap-2 border-t border-white/15 pt-4 text-xs text-[#e3d4fa]"><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />{stops[selectedStopIndex + 1]?.[language] ?? t.final}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="border-t border-white/10 pt-4 text-[11px] leading-relaxed text-[#d1c6e2]">{t.disclaimer}</p>
      </div>
    </section>
  );
}
