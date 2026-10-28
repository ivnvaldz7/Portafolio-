import { jsPDF } from 'jspdf';
import type { CareerProfile } from '../data/cvData';
import type { Language } from '../types';

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const BOTTOM = PAGE_HEIGHT - 22;
const TEAL = [13, 77, 77] as const;
const INK = [26, 26, 26] as const;
const MUTED = [85, 85, 85] as const;

export function buildCareerProfilePdf(profile: CareerProfile, language: Language): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const isEs = language === 'es';
  let y = MARGIN;

  const nextPage = () => {
    doc.addPage();
    y = MARGIN;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...TEAL);
    doc.text(`${profile.name}  |  CV`, MARGIN, y);
    doc.setDrawColor(...TEAL);
    doc.line(MARGIN, y + 3, PAGE_WIDTH - MARGIN, y + 3);
    y += 12;
  };

  const ensureSpace = (height: number) => {
    if (y + height > BOTTOM) nextPage();
  };

  const writeText = (
    value: string,
    options: { size?: number; lineHeight?: number; x?: number; width?: number; bold?: boolean; color?: readonly [number, number, number] } = {},
  ) => {
    const { size = 9, lineHeight = 4.3, x = MARGIN, width = CONTENT_WIDTH, bold = false, color = INK } = options;
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(value, width) as string[];
    for (const line of lines) {
      ensureSpace(lineHeight);
      doc.text(line, x, y);
      y += lineHeight;
    }
  };

  const section = (title: string) => {
    ensureSpace(13);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...TEAL);
    doc.text(title.toUpperCase(), MARGIN, y);
    doc.setDrawColor(190, 205, 201);
    doc.line(MARGIN, y + 2.5, PAGE_WIDTH - MARGIN, y + 2.5);
    y += 7;
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(...INK);
  doc.text(profile.name, MARGIN, y + 7);
  y += 15;
  writeText(profile.title, { size: 12, lineHeight: 6, bold: true, color: TEAL });
  y += 2;
  writeText(`${profile.availability}  |  ${profile.location}`, { size: 8.5, lineHeight: 4.5, color: MUTED });
  writeText(profile.contact.join('  |  '), { size: 8.5, lineHeight: 4.5, color: MUTED });

  section(isEs ? 'Perfil profesional' : 'Professional profile');
  writeText(profile.summary, { lineHeight: 4.8 });

  section(isEs ? 'Proyectos y evidencia' : 'Projects and evidence');
  for (const project of profile.projects) {
    ensureSpace(24);
    const titleY = y;
    doc.setFillColor(...TEAL);
    doc.rect(MARGIN, y - 3.5, 1.2, 8, 'F');
    writeText(project.name, { x: MARGIN + 4, width: CONTENT_WIDTH - 48, size: 11, lineHeight: 5.2, bold: true });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...TEAL);
    doc.text(project.period, PAGE_WIDTH - MARGIN, titleY, { align: 'right' });
    writeText(`${project.role}  |  ${project.focus}`, { x: MARGIN + 4, width: CONTENT_WIDTH - 4, size: 8.7, lineHeight: 4.3, color: MUTED });
    y += 1;
    for (const item of project.evidence) {
      ensureSpace(8);
      doc.setFillColor(...TEAL);
      doc.rect(MARGIN + 5, y - 2, 1.5, 1.5, 'F');
      writeText(item, { x: MARGIN + 10, width: CONTENT_WIDTH - 10, size: 8.8, lineHeight: 4.2 });
      y += 0.5;
    }
    y += 1.5;
  }

  section(isEs ? 'Aptitudes principales' : 'Core capabilities');
  for (const capability of profile.capabilities) {
    ensureSpace(11);
    writeText(capability.title, { bold: true, lineHeight: 4.4 });
    writeText(capability.description, { lineHeight: 4.4, color: MUTED });
    y += 1;
  }

  section(isEs ? 'Formación' : 'Learning');
  writeText(profile.education, { bold: true, lineHeight: 4.5 });
  writeText(profile.continuousLearning, { lineHeight: 4.5, color: MUTED });

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(215, 222, 220);
    doc.line(MARGIN, PAGE_HEIGHT - 16, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(profile.name, MARGIN, PAGE_HEIGHT - 11);
    doc.text(`${page} / ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 11, { align: 'right' });
  }

  return doc;
}

export function downloadCareerProfilePdf(profile: CareerProfile, language: Language): void {
  buildCareerProfilePdf(profile, language).save(`Ivan-Valdez-CV-${language.toUpperCase()}.pdf`);
}
