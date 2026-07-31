import { describe, it, expect } from 'vitest';
import { calculateFretPos } from './fretMath';

describe('FretLabs Math Utilities', () => {
  it('should correctly calculate the 12th fret (octave) as exactly half the scale length', () => {
    const scaleInches = 25.5;
    const scaleMm = scaleInches * 25.4;
    
    const fret12Pos = calculateFretPos(scaleInches, 12);
    
    // The 12th fret should be exactly in the middle of the scale length
    expect(fret12Pos).toBeCloseTo(scaleMm / 2, 4);
  });

  it('should correctly calculate the 1st fret for a 25.5" scale', () => {
    const scaleInches = 25.5;
    const fret1Pos = calculateFretPos(scaleInches, 1);
    
    // standard approx for 1st fret on 25.5" is 36.35mm
    expect(fret1Pos).toBeCloseTo(36.35, 1);
  });

  it('should correctly calculate the 24th fret as 3/4 of the scale length', () => {
    const scaleInches = 25.5;
    const scaleMm = scaleInches * 25.4;
    
    const fret24Pos = calculateFretPos(scaleInches, 24);
    
    // The 24th fret should be 3/4 of the way from the nut to the bridge
    expect(fret24Pos).toBeCloseTo(scaleMm * 0.75, 4);
  });
});
