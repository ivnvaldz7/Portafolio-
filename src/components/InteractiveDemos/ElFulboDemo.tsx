import React, { useState } from 'react';
import { Users, Shuffle, Share2, Check, Smartphone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Player {
  id: number;
  name: string;
  rating: number; // 1 to 5
  confirmed: boolean;
}

const INITIAL_PLAYERS: Player[] = [
  { id: 1, name: "Nico (Defensa)", rating: 4, confirmed: true },
  { id: 2, name: "Gonza (Mediocampo)", rating: 5, confirmed: true },
  { id: 3, name: "Fran (Delantero)", rating: 5, confirmed: true },
  { id: 4, name: "Santi (Arquero)", rating: 4, confirmed: true },
  { id: 5, name: "Mateo (Defensa)", rating: 3, confirmed: true },
  { id: 6, name: "Lucho (Mediocampo)", rating: 4, confirmed: true },
  { id: 7, name: "Fede (Delantero)", rating: 3, confirmed: true },
  { id: 8, name: "Rami (Defensa)", rating: 4, confirmed: true },
  { id: 9, name: "Tobi (Volante)", rating: 3, confirmed: true },
  { id: 10, name: "Mati (Arquero)", rating: 5, confirmed: true },
];

export const ElFulboDemo: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);
  const [cardCopied, setCardCopied] = useState(false);

  const toggleConfirm = (id: number) => {
    setPlayers(players.map(p => p.id === id ? { ...p, confirmed: !p.confirmed } : p));
  };

  const handleDrawTeams = () => {
    const confirmedPlayers = players.filter(p => p.confirmed);
    if (confirmedPlayers.length < 4) return;

    // Balanced team draw algorithm
    const sorted = [...confirmedPlayers].sort((a, b) => b.rating - a.rating);
    const tA: Player[] = [];
    const tB: Player[] = [];

    sorted.forEach((p, idx) => {
      if (idx % 2 === 0) tA.push(p);
      else tB.push(p);
    });

    setTeamA(tA);
    setTeamB(tB);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const generateWhatsAppMessage = () => {
    if (teamA.length === 0) return "⚽ *EL FULBO PWA* - ¡Lista de Confirmados activa!";
    
    const textA = teamA.map(p => `• ${p.name}`).join('\n');
    const textB = teamB.map(p => `• ${p.name}`).join('\n');

    return `⚽ *EL FULBO - EQUIPOS SORTEADOS*\n\n🟢 *EQUIPO VERDE*\n${textA}\n\n🔵 *EQUIPO AZUL*\n${textB}\n\n📍 Cancha N° 3 | 🕒 20:00hs | 📲 Organizado con El Fulbo PWA`;
  };

  const handleCopyCard = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCardCopied(true);
    setTimeout(() => setCardCopied(false), 2500);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 md:p-6 shadow-2xl border border-slate-800 my-4 text-sm font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              El Fulbo PWA <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">Live Simulator</span>
            </h3>
            <p className="text-xs text-slate-400">Coordinador de grupos, asistencia y sorteo equilibrado para WhatsApp</p>
          </div>
        </div>
        <button
          onClick={handleDrawTeams}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
        >
          <Shuffle className="w-4 h-4" />
          Sorteo Equilibrado
        </button>
      </div>

      {/* Players Confirmations */}
      <div className="my-4">
        <div className="flex items-center justify-between mb-2 text-xs font-mono">
          <span className="text-slate-300 font-bold">Jugadores Convocados ({players.filter(p => p.confirmed).length}/10):</span>
          <span className="text-slate-400">Haz clic para confirmar / bajar asistencia</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {players.map((p) => (
            <button
              key={p.id}
              onClick={() => toggleConfirm(p.id)}
              className={`p-2 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                p.confirmed
                  ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
              }`}
            >
              <span className="truncate">{p.name}</span>
              {p.confirmed && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Sorteo Result Teams */}
      {teamA.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 animate-fade-in">
          {/* Team A */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60">
            <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider font-mono mb-2.5 flex items-center gap-2">
              🟢 Equipo Verde ({teamA.length})
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-200 font-mono">
              {teamA.map((p) => (
                <li key={p.id} className="flex justify-between border-b border-emerald-900/40 pb-1">
                  <span>{p.name}</span>
                  <span className="text-emerald-500 font-bold">{"★".repeat(p.rating)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team B */}
          <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/60">
            <h4 className="font-bold text-xs text-sky-400 uppercase tracking-wider font-mono mb-2.5 flex items-center gap-2">
              🔵 Equipo Azul ({teamB.length})
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-200 font-mono">
              {teamB.map((p) => (
                <li key={p.id} className="flex justify-between border-b border-sky-900/40 pb-1">
                  <span>{p.name}</span>
                  <span className="text-sky-500 font-bold">{"★".repeat(p.rating)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* WhatsApp Shareable Card Output */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>Generador de Fichas Sociales para WhatsApp</span>
        </div>
        <button
          onClick={handleCopyCard}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono text-xs rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
        >
          {cardCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" /> ¡Texto Copiado!
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" /> Copiar Resumen para WhatsApp
            </>
          )}
        </button>
      </div>
    </div>
  );
};
