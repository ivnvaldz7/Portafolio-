import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Boxes, ClipboardList, RotateCcw, ShieldCheck, Truck, Users } from 'lucide-react';
import { Language } from '../../types';

type Module = 'access' | 'warehouse' | 'logistics';
type WarehouseRole = 'none' | 'observer' | 'requester' | 'manager';
type LogisticsRole = 'none' | 'seller' | 'packer' | 'admin';

const modules = [
  { id: 'access', icon: Users },
  { id: 'warehouse', icon: Boxes },
  { id: 'logistics', icon: Truck },
] as const;

const copy = {
  es: {
    title: 'Plataforma Depósito', badge: 'Simulación interactiva',
    intro: 'Explorá tres áreas separadas de una misma plataforma operativa.',
    sample: 'Datos ficticios · Sin conexión con el laboratorio', reset: 'Reiniciar muestra',
    modules: { access: 'Usuarios', warehouse: 'Depósito', logistics: 'Logística' },
    accessTitle: 'Accesos por área', accessIntro: 'Asigná roles a una cuenta ficticia y observá qué áreas quedan habilitadas.',
    sampleUser: 'Cuenta de muestra', warehouseRole: 'Rol en Depósito', logisticsRole: 'Rol en Logística · Ale-Bet',
    noAccess: 'Sin acceso', observer: 'Observador', requester: 'Solicitante', manager: 'Encargado',
    seller: 'Vendedor', packer: 'Armador', admin: 'Administrador',
    permissions: 'Vista de permisos', accessHint: 'La simulación permite recorrer todos los módulos para mostrar sus flujos; no autentica usuarios.',
    warehouseTitle: 'Ingreso y trazabilidad', warehouseIntro: 'Distribuí un acta ficticia en tandas y seguí el cambio de existencias.',
    material: 'Frascos 100 ml', lot: 'Lote F-26', receipt: 'Acta ACT-104', received: 'Recibidas',
    distributed: 'Distribuidas', pending: 'Pendientes', stock: 'Stock disponible',
    distribute: 'Distribuir 40 unidades', complete: 'Acta completada', awaiting: 'Pendiente de distribución', inProgress: 'Distribución parcial',
    receiptCreated: 'Acta de ingreso registrada', movementRecorded: 'Movimiento de inventario registrado',
    receiptCompleted: 'Todos los ítems quedaron distribuidos',
    logisticsTitle: 'Pedido y despacho', logisticsIntro: 'Avanzá un pedido ficticio; el stock se descuenta al completarlo.',
    order: 'Pedido PED-208', customer: 'Cliente de muestra', product: 'Presentación 250 ml', units: '24 unidades',
    steps: ['Pendiente', 'Aprobado', 'En armado', 'Completado'],
    actions: ['Aprobar pedido', 'Iniciar armado', 'Completar despacho'],
    orderDone: 'Pedido completado', logisticsNote: 'Este stock comercial es independiente del inventario de Depósito.',
    stockRule: 'El descuento se registra al completar el pedido.',
  },
  en: {
    title: 'Depósito Platform', badge: 'Interactive simulation',
    intro: 'Explore three separate work areas within one operations platform.',
    sample: 'Fictional data · No laboratory connection', reset: 'Reset sample',
    modules: { access: 'Users', warehouse: 'Warehouse', logistics: 'Logistics' },
    accessTitle: 'Access by area', accessIntro: 'Assign roles to a fictional account and see which areas become available.',
    sampleUser: 'Sample account', warehouseRole: 'Warehouse role', logisticsRole: 'Logistics role · Ale-Bet',
    noAccess: 'No access', observer: 'Observer', requester: 'Requester', manager: 'Manager',
    seller: 'Sales', packer: 'Packer', admin: 'Administrator',
    permissions: 'Permission preview', accessHint: 'The simulation keeps every module open for exploration; it does not authenticate users.',
    warehouseTitle: 'Receiving and traceability', warehouseIntro: 'Distribute a fictional receipt in batches and watch the stock balance change.',
    material: '100 ml bottles', lot: 'Lot F-26', receipt: 'Receipt ACT-104', received: 'Received',
    distributed: 'Distributed', pending: 'Pending', stock: 'Available stock',
    distribute: 'Distribute 40 units', complete: 'Receipt completed', awaiting: 'Awaiting distribution', inProgress: 'Partially distributed',
    receiptCreated: 'Receiving record created', movementRecorded: 'Inventory movement recorded',
    receiptCompleted: 'All items distributed',
    logisticsTitle: 'Order and dispatch', logisticsIntro: 'Advance a fictional order; stock is deducted when it is completed.',
    order: 'Order PED-208', customer: 'Sample customer', product: '250 ml presentation', units: '24 units',
    steps: ['Pending', 'Approved', 'Packing', 'Completed'],
    actions: ['Approve order', 'Start packing', 'Complete dispatch'],
    orderDone: 'Order completed', logisticsNote: 'This commercial stock is separate from warehouse inventory.',
    stockRule: 'The deduction is recorded when the order is completed.',
  },
} as const;

export const DepositoDemo: React.FC<{ language: Language }> = ({ language }) => {
  const t = copy[language];
  const reduceMotion = useReducedMotion();
  const [activeModule, setActiveModule] = useState<Module>('access');
  const [warehouseRole, setWarehouseRole] = useState<WarehouseRole>('none');
  const [logisticsRole, setLogisticsRole] = useState<LogisticsRole>('none');
  const [distributed, setDistributed] = useState(0);
  const [orderStep, setOrderStep] = useState(0);
  const pending = 120 - distributed;
  const commercialStock = orderStep === 3 ? 56 : 80;
  const transition = { duration: reduceMotion ? 0 : 0.22 };

  const reset = () => {
    setWarehouseRole('none');
    setLogisticsRole('none');
    setDistributed(0);
    setOrderStep(0);
    setActiveModule('access');
  };

  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 font-sans text-slate-100 shadow-xl">
      <div className="border-b border-slate-800 bg-slate-900/70 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-2 text-cyan-300"><ClipboardList className="h-5 w-5" /></span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-white">{t.title}</h3>
                <span className="rounded-full border border-cyan-400/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-200">{t.badge}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{t.intro}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-cyan-300">{t.sample}</p>
            </div>
          </div>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition-colors hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
            <RotateCcw className="h-3.5 w-3.5" /> {t.reset}
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div role="group" aria-label={language === 'es' ? 'Áreas de la muestra' : 'Sample areas'} className="grid grid-cols-3 gap-2">
          {modules.map(({ id, icon: Icon }) => (
            <button key={id} type="button" aria-pressed={activeModule === id} onClick={() => setActiveModule(id)} className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-3 text-center text-xs font-semibold transition-colors sm:flex-row ${activeModule === id ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-100' : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-600 hover:text-slate-200'} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300`}>
              <Icon className="h-4 w-4 shrink-0" /> {t.modules[id]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {activeModule === 'access' && (
            <motion.section key="access" initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={transition} className="mt-5 space-y-4">
              <div><h4 className="text-sm font-semibold text-white">{t.accessTitle}</h4><p className="mt-1 text-xs text-slate-400">{t.accessIntro}</p></div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium"><span className="rounded-full bg-cyan-400/10 p-2 text-cyan-300"><Users className="h-4 w-4" /></span>{t.sampleUser}</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1.5 text-xs text-slate-300">{t.warehouseRole}
                    <select value={warehouseRole} onChange={(event) => setWarehouseRole(event.target.value as WarehouseRole)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-cyan-300">
                      <option value="none">{t.noAccess}</option><option value="observer">{t.observer}</option><option value="requester">{t.requester}</option><option value="manager">{t.manager}</option>
                    </select>
                  </label>
                  <label className="space-y-1.5 text-xs text-slate-300">{t.logisticsRole}
                    <select value={logisticsRole} onChange={(event) => setLogisticsRole(event.target.value as LogisticsRole)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white focus-visible:outline-2 focus-visible:outline-cyan-300">
                      <option value="none">{t.noAccess}</option><option value="seller">{t.seller}</option><option value="packer">{t.packer}</option><option value="admin">{t.admin}</option>
                    </select>
                  </label>
                </div>
              </div>
              <div aria-live="polite" className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 p-4"><span className="block font-mono text-[10px] uppercase tracking-wider text-slate-500">{t.modules.warehouse}</span><strong className="mt-1 block text-sm text-cyan-200">{t[warehouseRole === 'none' ? 'noAccess' : warehouseRole]}</strong></div>
                <div className="rounded-xl border border-slate-800 p-4"><span className="block font-mono text-[10px] uppercase tracking-wider text-slate-500">{t.modules.logistics}</span><strong className="mt-1 block text-sm text-cyan-200">{t[logisticsRole === 'none' ? 'noAccess' : logisticsRole]}</strong></div>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">{t.accessHint}</p>
            </motion.section>
          )}

          {activeModule === 'warehouse' && (
            <motion.section key="warehouse" initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={transition} className="mt-5 space-y-4">
              <div><h4 className="text-sm font-semibold text-white">{t.warehouseTitle}</h4><p className="mt-1 text-xs text-slate-400">{t.warehouseIntro}</p></div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">{t.receipt}</span><p className="mt-1 text-sm font-semibold text-white">{t.material} <span className="font-normal text-slate-400">· {t.lot}</span></p></div><span className={`rounded-full px-2.5 py-1 text-[11px] ${pending === 0 ? 'bg-emerald-400/10 text-emerald-300' : 'bg-amber-400/10 text-amber-200'}`}>{pending === 0 ? t.complete : distributed === 0 ? t.awaiting : t.inProgress}</span></div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800"><div style={{ width: `${distributed / 120 * 100}%` }} className="h-full rounded-full bg-cyan-400 transition-[width] duration-300 motion-reduce:transition-none" /></div>
                <div aria-live="polite" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[[t.received, 120], [t.distributed, distributed], [t.pending, pending], [t.stock, 240 + distributed]].map(([label, value]) => <div key={label} className="rounded-lg border border-slate-800 bg-slate-950 p-3"><span className="block text-[11px] text-slate-400">{label}</span><strong className="mt-1 block text-lg tabular-nums text-white">{value}</strong></div>)}
                </div>
                <motion.button type="button" disabled={pending === 0} onClick={() => setDistributed((current) => Math.min(120, current + 40))} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                  {pending === 0 ? t.complete : t.distribute} <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </div>
              <div className="space-y-2 text-xs text-slate-300"><p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" />{t.receiptCreated}</p>{distributed > 0 && <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" />{t.movementRecorded}: +{distributed}</p>}{pending === 0 && <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" />{t.receiptCompleted}</p>}</div>
            </motion.section>
          )}

          {activeModule === 'logistics' && (
            <motion.section key="logistics" initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={transition} className="mt-5 space-y-4">
              <div><h4 className="text-sm font-semibold text-white">{t.logisticsTitle}</h4><p className="mt-1 text-xs text-slate-400">{t.logisticsIntro}</p></div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex flex-wrap justify-between gap-2"><div><span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">{t.order}</span><p className="mt-1 text-sm font-semibold text-white">{t.customer}</p><p className="text-xs text-slate-400">{t.product} · {t.units}</p></div><span aria-live="polite" className="h-fit rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-200">{t.steps[orderStep]}</span></div>
                <ol className="mt-5 grid grid-cols-4 gap-1.5">{t.steps.map((step, index) => <li key={step} className="min-w-0"><span className={`mb-2 block h-1 rounded-full ${index <= orderStep ? 'bg-cyan-400' : 'bg-slate-700'}`} /><span className={`block text-[10px] leading-tight ${index <= orderStep ? 'text-cyan-200' : 'text-slate-500'}`}>{step}</span></li>)}</ol>
                <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-3"><span className="text-xs text-slate-400">{t.stock}</span><strong aria-live="polite" className="ml-2 text-lg tabular-nums text-white">{commercialStock}</strong><p className="mt-1 text-[11px] text-slate-500">{t.stockRule}</p></div>
                <motion.button type="button" disabled={orderStep === 3} onClick={() => setOrderStep((current) => Math.min(3, current + 1))} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                  {orderStep === 3 ? t.orderDone : t.actions[orderStep]} <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </div>
              <p className="text-[11px] text-slate-500">{t.logisticsNote}</p>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
