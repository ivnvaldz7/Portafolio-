import React, { useState } from 'react';
import { Sliders, Download, Eye, Layers } from 'lucide-react';
import { calculateFretPos } from '../../utils/fretMath';

export const FretLabsDemo: React.FC = () => {
  const [scaleLength, setScaleLength] = useState<number>(25.5); // Inches
  const [scaleType, setScaleType] = useState<'single' | 'multiscale'>('single');
  const [bassScale, setBassScale] = useState<number>(27.0); // Bass scale for multiscale
  const [fretCount, setFretCount] = useState<number>(22);
  const [perpendicularFret, setPerpendicularFret] = useState<number>(8);
  const [microtonalSystem, setMicrotonalSystem] = useState<boolean>(false);

  const scaleLengthMm = scaleLength * 25.4;
  const bassScaleMm = bassScale * 25.4;

  // Generate fret SVG rendering data
  const fretPositionsTreble: number[] = [];
  const fretPositionsBass: number[] = [];

  for (let i = 1; i <= fretCount; i++) {
    fretPositionsTreble.push(calculateFretPos(scaleLength, i));
    fretPositionsBass.push(calculateFretPos(scaleType === 'multiscale' ? bassScale : scaleLength, i));
  }

  // Handle SVG Download
  const handleDownloadSVG = () => {
    const svgElement = document.getElementById('fretboard-svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FretLabs_${scaleType}_${scaleLength}in_${fretCount}frets.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 md:p-6 shadow-2xl border border-slate-800 my-4 text-sm font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              FretLabs CAD <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">Live Demo</span>
            </h3>
            <p className="text-xs text-slate-400">Calculador numérico y motor gráfico de diapasones para Luthiers</p>
          </div>
        </div>
        <button
          onClick={handleDownloadSVG}
          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-amber-950/40"
        >
          <Download className="w-3.5 h-3.5" />
          Exportar SVG CNC
        </button>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
        <div>
          <label className="text-slate-400 block mb-1 font-mono">Tipo de Escala:</label>
          <select
            value={scaleType}
            onChange={(e) => setScaleType(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-semibold focus:border-amber-500"
          >
            <option value="single">Escala Simple (Standard)</option>
            <option value="multiscale">Multiescala / Fanned Frets</option>
          </select>
        </div>

        <div>
          <label className="text-slate-400 block mb-1 font-mono">
            Escala Agudos ({scaleLength}"):
          </label>
          <input
            type="range"
            min={22.0}
            max={30.0}
            step={0.25}
            value={scaleLength}
            onChange={(e) => setScaleLength(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
          <span className="text-[11px] text-amber-400 font-mono">{(scaleLength * 25.4).toFixed(1)} mm</span>
        </div>

        {scaleType === 'multiscale' && (
          <div>
            <label className="text-slate-400 block mb-1 font-mono">
              Escala Graves ({bassScale}"):
            </label>
            <input
              type="range"
              min={24.0}
              max={35.0}
              step={0.5}
              value={bassScale}
              onChange={(e) => setBassScale(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
            <span className="text-[11px] text-amber-400 font-mono">{(bassScale * 25.4).toFixed(1)} mm</span>
          </div>
        )}

        <div>
          <label className="text-slate-400 block mb-1 font-mono">Cantidad de Trastes: ({fretCount})</label>
          <input
            type="range"
            min={12}
            max={27}
            step={1}
            value={fretCount}
            onChange={(e) => setFretCount(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>

      {/* Dynamic SVG Fretboard Render Canvas */}
      <div className="p-4 rounded-xl bg-stone-950 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-amber-400" /> Previsualización Vectorial SVG (Anatomía del Diapasón)
          </span>
          <span>Precisión: 0.01mm</span>
        </div>

        <div className="w-full overflow-x-auto p-3 bg-stone-900 rounded-lg border border-amber-950/40">
          <svg
            id="fretboard-svg"
            viewBox="0 0 900 160"
            className="w-full min-w-[700px] h-auto"
            style={{ backgroundColor: '#1c1917' }}
          >
            {/* Wood Grain Fretboard Base */}
            <rect x="20" y="30" width="860" height="100" fill="#292524" rx="4" stroke="#44403c" strokeWidth="2" />

            {/* Nut Line */}
            <line x1="40" y1="30" x2="40" y2="130" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
            <text x="35" y="22" fill="#f59e0b" fontSize="10" fontFamily="monospace">NUT (Cejuela)</text>

            {/* Fret Lines */}
            {fretPositionsTreble.map((posTreble, i) => {
              const posBass = fretPositionsBass[i];
              // Scale position to SVG canvas coordinates
              const maxScaleMm = Math.max(scaleLengthMm, bassScaleMm);
              const xTreble = 40 + (posTreble / maxScaleMm) * 800;
              const xBass = 40 + (posBass / maxScaleMm) * 800;

              const isMarker = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24].includes(i + 1);

              return (
                <g key={i}>
                  {/* Fret wire */}
                  <line
                    x1={xTreble}
                    y1="30"
                    x2={xBass}
                    y2="130"
                    stroke={i + 1 === 12 ? '#38bdf8' : '#e7e5e4'}
                    strokeWidth={i + 1 === 12 ? '2.5' : '1.5'}
                  />
                  {/* Fret Number label */}
                  <text
                    x={(xTreble + xBass) / 2}
                    y="148"
                    fill="#a8a29e"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {i + 1}
                  </text>

                  {/* Marker Dots */}
                  {isMarker && (
                    <circle
                      cx={(xTreble + xBass) / 2}
                      cy={i + 1 === 12 ? 65 : 80}
                      r="3.5"
                      fill="#d6d3d1"
                    />
                  )}
                  {isMarker && i + 1 === 12 && (
                    <circle
                      cx={(xTreble + xBass) / 2}
                      cy={95}
                      r="3.5"
                      fill="#d6d3d1"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Measurement Table Summary */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
        <span className="text-slate-400 block mb-2 font-bold">Cálculo de Distancias (Cejuela a Traste):</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
          <div>Traste 1: <span className="text-amber-400 font-bold">{calculateFretPos(scaleLength, 1).toFixed(2)} mm</span></div>
          <div>Traste 5: <span className="text-amber-400 font-bold">{calculateFretPos(scaleLength, 5).toFixed(2)} mm</span></div>
          <div>Traste 12 (Octava): <span className="text-amber-400 font-bold">{calculateFretPos(scaleLength, 12).toFixed(2)} mm</span></div>
          <div>Traste {fretCount}: <span className="text-amber-400 font-bold">{calculateFretPos(scaleLength, fretCount).toFixed(2)} mm</span></div>
        </div>
      </div>
    </div>
  );
};
