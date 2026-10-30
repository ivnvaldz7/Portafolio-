import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Language } from '../types';

const portfolioUrl = 'https://ivnvaldez.netlify.app/';

interface ShareQrModalProps {
  language: Language;
  onClose: () => void;
}

export const ShareQrModal = ({ language, onClose }: ShareQrModalProps) => {
  const isEs = language === 'es';
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;

    const controls = modalRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return createPortal(
    <motion.div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-qr-title"
      onKeyDown={handleKeyDown}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-[#1a1a1a]/70 p-4 backdrop-blur-sm"
    >
      <motion.div
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        transition={{ duration: reduceMotion ? 0 : 0.22 }}
        className="w-full max-w-sm border border-[#1a1a1a]/15 bg-[#fcfaf7] p-6 text-[#1a1a1a] shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d4d4d]">{isEs ? 'Compartir proyecto' : 'Share project'}</p>
            <h2 id="share-qr-title" className="mt-2 font-serif-editorial text-3xl">{isEs ? 'Abrí mi portafolio' : 'Open my portfolio'}</h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label={isEs ? 'Cerrar código QR' : 'Close QR code'} className="p-2 text-[#666666] transition-colors hover:text-[#1a1a1a] focus-visible:outline-2 focus-visible:outline-[#0d4d4d]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#666666]">{isEs ? 'Escaneá el código con tu teléfono o compartí el enlace directo.' : 'Scan the code with your phone or share the direct link.'}</p>
        <div className="mx-auto mt-6 w-fit border border-[#1a1a1a]/10 bg-white p-3 shadow-sm">
          <QRCodeSVG value={portfolioUrl} size={224} marginSize={4} level="M" fgColor="#1a1a1a" bgColor="#ffffff" role="img" title={isEs ? 'Código QR del portafolio de Iván Valdez' : 'QR code for Iván Valdez portfolio'} className="h-auto max-w-full" />
        </div>
        <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-between gap-2 break-all border border-[#1a1a1a]/15 bg-white px-3 py-3 font-mono text-xs text-[#0d4d4d] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-[#0d4d4d]">
          {portfolioUrl}<ExternalLink className="h-4 w-4 shrink-0" />
        </a>
        <button type="button" onClick={copyLink} className="btn-editorial-dark mt-3 flex w-full items-center justify-center gap-2 px-4 py-3 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4d4d]">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? (isEs ? 'Enlace copiado' : 'Link copied') : (isEs ? 'Copiar enlace' : 'Copy link')}
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
};
