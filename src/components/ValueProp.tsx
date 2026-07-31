import React from 'react';
import { Target, ShieldCheck, Zap, Layers } from 'lucide-react';
import { Language } from '../types';

interface ValuePropProps {
  language: Language;
}

export const ValueProp: React.FC<ValuePropProps> = ({ language }) => {
  const isEs = language === 'es';

  return (
    <section className="py-12 bg-[#fcfaf7] border-b border-[#1a1a1a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a1a1a] text-[#fcfaf7] p-8 md:p-12 border border-[#1a1a1a] relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0d4d4d] bg-[#fcfaf7] px-3 py-1 inline-block">
                {isEs ? 'Propuesta de Valor & Enfoque' : 'Value Proposition'}
              </span>

              <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-normal italic text-[#fcfaf7] tracking-tight leading-snug">
                {isEs
                  ? 'Entender el proceso real antes de escribir una línea de código.'
                  : 'Understanding the real workflow before writing a single line of code.'}
              </h2>

              <p className="text-[#fcfaf7]/80 text-sm sm:text-base leading-relaxed font-sans">
                {isEs
                  ? 'La mayoría de los problemas de desarrollo no surgen de la falta de tecnología, sino de construir soluciones desconectadas del trabajo cotidiano de las personas. Mi enfoque consiste en mapear la operación, eliminar pasos innecesarios y construir herramientas web claras que entreguen resultados en segundos.'
                  : 'Most software problems arise not from lack of technology, but from building tools disconnected from daily operations. My approach maps the workflow, eliminates friction, and delivers clean web apps.'}
              </p>
            </div>

            {/* Right Capability Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-4 bg-[#fcfaf7] text-[#1a1a1a] border border-[#1a1a1a]/10 space-y-1.5">
                <Target className="w-4 h-4 text-[#0d4d4d]" />
                <h3 className="font-bold text-[#1a1a1a] text-xs uppercase tracking-wider font-mono">Detección de Fricción</h3>
                <p className="text-[#666666] leading-snug text-[11px]">Identificación de cuellos de botella y tareas manuales repetitivas.</p>
              </div>

              <div className="p-4 bg-[#fcfaf7] text-[#1a1a1a] border border-[#1a1a1a]/10 space-y-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0d4d4d]" />
                <h3 className="font-bold text-[#1a1a1a] text-xs uppercase tracking-wider font-mono">Criterio de Producto</h3>
                <p className="text-[#666666] leading-snug text-[11px]">Pivotes técnicos inteligentes para priorizar estabilidad y velocidad.</p>
              </div>

              <div className="p-4 bg-[#fcfaf7] text-[#1a1a1a] border border-[#1a1a1a]/10 space-y-1.5">
                <Zap className="w-4 h-4 text-[#0d4d4d]" />
                <h3 className="font-bold text-[#1a1a1a] text-xs uppercase tracking-wider font-mono">IA con Grounding</h3>
                <p className="text-[#666666] leading-snug text-[11px]">Anclaje de LLMs contra datos oficiales sin alucinaciones.</p>
              </div>

              <div className="p-4 bg-[#fcfaf7] text-[#1a1a1a] border border-[#1a1a1a]/10 space-y-1.5">
                <Layers className="w-4 h-4 text-[#0d4d4d]" />
                <h3 className="font-bold text-[#1a1a1a] text-xs uppercase tracking-wider font-mono">Autonomía & PWA</h3>
                <p className="text-[#666666] leading-snug text-[11px]">Aplicaciones web independientes, offline-first y de bajo mantenimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
