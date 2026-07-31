// Fret scale calculations

/**
 * Calculates fret distance from nut in mm (1 inch = 25.4mm)
 * @param scaleInches The scale length in inches
 * @param fretNum The fret number to calculate
 * @returns Distance from the nut to the fret in millimeters
 */
export const calculateFretPos = (scaleInches: number, fretNum: number): number => {
  const scaleMm = scaleInches * 25.4;
  return scaleMm - scaleMm / Math.pow(2, fretNum / 12);
};
