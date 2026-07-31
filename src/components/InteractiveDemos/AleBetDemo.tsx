import React, { useState } from 'react';
import { Truck, AlertTriangle, CheckCircle, Clock, PackageCheck, Zap } from 'lucide-react';

export const AleBetDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'digital'>('digital');
  const [orders, setOrders] = useState([
    { id: "PED-1042", client: "Vet. San Martín", items: "12x Vacunas Rabia + 5x Sueros", batchExpiry: "12/2026", status: "FEFO Crítico", coldChain: "2°C - 8°C", ready: false },
    { id: "PED-1043", client: "Centro Veterinario Norte", items: "20x Antibióticos Inyectables", batchExpiry: "08/2027", status: "Normal", coldChain: "Ambiente", ready: true },
    { id: "PED-1044", client: "Dra. Lucía Gómez", items: "5x Anestésicos Especiales", batchExpiry: "10/2026", status: "FEFO Crítico", coldChain: "2°C - 8°C", ready: false }
  ]);

  const toggleReady = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ready: !o.ready } : o));
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 md:p-6 shadow-2xl border border-slate-800 my-4 text-sm font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Ale-Bet Manager <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">Operations Simulator</span>
            </h3>
            <p className="text-xs text-slate-400">Digitalización de despacho y prevención de errores logísticos en laboratorio</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'manual' ? 'bg-rose-950 text-rose-300 font-bold border border-rose-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚠️ Flujo Manual Previas
          </button>
          <button
            onClick={() => setActiveTab('digital')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'digital' ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ✨ Con Ale-Bet Manager
          </button>
        </div>
      </div>

      {/* Comparison Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Tiempo de Preparación / Pedido</span>
          <p className="text-lg font-bold font-mono text-white mt-0.5">
            {activeTab === 'manual' ? <span className="text-rose-400">18 minutos</span> : <span className="text-emerald-400">4.5 minutos (-75%)</span>}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Tasa de Error en Lote / Cadena Frío</span>
          <p className="text-lg font-bold font-mono text-white mt-0.5">
            {activeTab === 'manual' ? <span className="text-rose-400">8.5% de despachos</span> : <span className="text-emerald-400">0.0% (Validación Táctil)</span>}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Trazabilidad en Tiempo Real</span>
          <p className="text-lg font-bold font-mono text-white mt-0.5">
            {activeTab === 'manual' ? <span className="text-rose-400">Nula (Planillas Papel)</span> : <span className="text-blue-400">100% Sincronizado</span>}
          </p>
        </div>
      </div>

      {/* Interactive Order List */}
      {activeTab === 'digital' ? (
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider block">
            Panel Táctil de Depósito (Optimizado para Tableta)
          </span>

          {orders.map((o) => (
            <div
              key={o.id}
              className={`p-4 rounded-xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                o.ready
                  ? 'bg-emerald-950/20 border-emerald-800/60'
                  : o.status === 'FEFO Crítico'
                  ? 'bg-amber-950/20 border-amber-700/60'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-white text-xs">{o.id}</span>
                  <span className="text-slate-400 text-xs">• {o.client}</span>
                  {o.status === 'FEFO Crítico' && (
                    <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-bold">
                      🔥 Vencimiento Próximo (FEFO)
                    </span>
                  )}
                  <span className="text-[10px] bg-slate-900 text-blue-300 border border-slate-800 px-2 py-0.5 rounded">
                    ❄️ {o.coldChain}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{o.items}</p>
                <span className="text-[11px] text-slate-400 font-mono block">
                  Vencimiento de Lote: <strong className="text-slate-200">{o.batchExpiry}</strong>
                </span>
              </div>

              <button
                onClick={() => toggleReady(o.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                  o.ready
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {o.ready ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-200" /> Despacho Verificado
                  </>
                ) : (
                  <>
                    <PackageCheck className="w-4 h-4 text-amber-400" /> Validar Empaque
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60 text-xs text-rose-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-300 font-mono">
            <AlertTriangle className="w-4 h-4" /> Registro Manual en Papel (Ineficiente)
          </div>
          <p className="leading-relaxed">
            1. El operador consulta un mensaje de WhatsApp o una planilla impresa.<br />
            2. Busca manualmente en los estantes sin garantía de rotación FEFO (se vencen lotes en el fondo del depósito).<br />
            3. Escribe a mano el número de lote y remito en un cuaderno físico.<br />
            4. Si hay un reclamo de refrigeración, no hay registro histórico de temperatura de salida.
          </p>
        </div>
      )}
    </div>
  );
};
