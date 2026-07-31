import React, { useState } from 'react';
import { PERSONAL_INFO, ENGLISH_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';
import { Mail, Linkedin, Github, Send, Check, MapPin, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const isEs = language === 'es';
  const [topic, setTopic] = useState('Diagnóstico de Proceso Operativo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-[#1a1a1a] text-[#fcfaf7] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0d4d4d] bg-[#fcfaf7] px-2.5 py-1 inline-block">
              {isEs ? 'Contacto Directo' : 'Get in Touch'}
            </span>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal italic text-[#fcfaf7] tracking-tight leading-tight">
              {isEs ? '¿Tenés un proceso que debería funcionar mejor?' : ENGLISH_TRANSLATIONS.contactTitle}
            </h2>

            <p className="text-[#fcfaf7]/80 text-sm sm:text-base leading-relaxed font-sans">
              {isEs
                ? 'Hablemos sobre cómo convertir tareas manuales repetitivas o necesidades operativas en una aplicación web clara, fluida y de bajo mantenimiento.'
                : ENGLISH_TRANSLATIONS.contactSubtitle}
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-3 pt-2 text-xs font-mono">
              <motion.a
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="flex items-center gap-3 p-3.5 bg-black/40 hover:bg-black/60 border border-white/10 transition-all text-[#fcfaf7]"
              >
                <div className="p-2 bg-[#0d4d4d] text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">Correo Electrónico Directo</span>
                  <strong className="text-sm text-white">{PERSONAL_INFO.contact.email}</strong>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                href={PERSONAL_INFO.contact.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 bg-black/40 hover:bg-black/60 border border-white/10 transition-all text-[#fcfaf7]"
              >
                <div className="p-2 bg-blue-900/60 text-blue-200">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">Perfil Profesional</span>
                  <strong className="text-sm text-white">LinkedIn</strong>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 bg-black/40 hover:bg-black/60 border border-white/10 transition-all text-[#fcfaf7]"
              >
                <div className="p-2 bg-purple-900/60 text-purple-200">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">Repositorios & Código</span>
                  <strong className="text-sm text-white">GitHub</strong>
                </div>
              </motion.a>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 text-[#fcfaf7] text-xs flex items-center gap-2 font-mono">
              <MapPin className="w-4 h-4 text-[#0d4d4d] shrink-0" />
              <span>{PERSONAL_INFO.location} • {PERSONAL_INFO.availability}</span>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-[#fcfaf7] text-[#1a1a1a] p-6 sm:p-8 border border-[#1a1a1a]/20 space-y-4 shadow-sm"
          >
            <h3 className="font-serif-editorial text-xl font-bold text-[#1a1a1a] flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#0d4d4d]" />
              Enviar Mensaje o Propuesta
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-[#f0f4f4] border border-[#0d4d4d] text-center space-y-2 animate-fade-in my-8"
              >
                <Check className="w-8 h-8 text-[#0d4d4d] mx-auto" />
                <h4 className="font-bold text-[#1a1a1a] text-base font-serif-editorial">¡Mensaje enviado con éxito!</h4>
                <p className="text-xs text-[#666666]">
                  Gracias por conectar. Responderé a tu correo en menos de 24 horas.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-[#1a1a1a] font-mono block mb-1.5 font-bold uppercase text-[10px]">
                    Motivo de la consulta:
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-white border border-[#1a1a1a]/20 p-3 text-[#1a1a1a] focus:outline-none focus:border-[#0d4d4d] font-mono text-xs"
                  >
                    <option value="Diagnóstico de Proceso Operativo">Diagnóstico de Proceso Operativo / Software a medida</option>
                    <option value="Propuesta de Empleo Remoto / Híbrido">Propuesta de Empleo Remoto / Híbrido (Product Engineer)</option>
                    <option value="Consulta General de Producto">Consulta General de Producto o IA</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#1a1a1a] font-mono block mb-1 font-bold uppercase text-[10px]">Tu Nombre:</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Martín González"
                      className="w-full bg-white border border-[#1a1a1a]/20 p-3 text-[#1a1a1a] placeholder-stone-400 focus:outline-none focus:border-[#0d4d4d]"
                    />
                  </div>
                  <div>
                    <label className="text-[#1a1a1a] font-mono block mb-1 font-bold uppercase text-[10px]">Tu Email:</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@empresa.com"
                      className="w-full bg-white border border-[#1a1a1a]/20 p-3 text-[#1a1a1a] placeholder-stone-400 focus:outline-none focus:border-[#0d4d4d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#1a1a1a] font-mono block mb-1 font-bold uppercase text-[10px]">Mensaje o Detalle:</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe brevemente el proceso a mejorar o el rol disponible..."
                    className="w-full bg-white border border-[#1a1a1a]/20 p-3 text-[#1a1a1a] placeholder-stone-400 focus:outline-none focus:border-[#0d4d4d]"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3.5 btn-editorial-dark flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#fcfaf7]" />
                  <span>Enviar Mensaje</span>
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
