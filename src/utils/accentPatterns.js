/**
 * Accent patterns for metronome beats
 * Each function returns accent strength from 0.0 (silent) to 1.0 (full volume)
 */

export const ACCENT_PATTERNS = {
  /**
   * Standard pattern: Strong downbeat, weaker other beats
   */
  standard: (beatInMeasure, timeSignature) => {
    return beatInMeasure === 0 ? 1.0 : 0.3;
  },

  /**
   * All beats equal volume
   */
  allEqual: () => {
    return 0.5;
  },

  /**
   * Waltz pattern: Strong on beat 1, lighter on 2 and 3
   * Works best in 3/4 time
   */
  waltz: (beatInMeasure, timeSignature) => {
    if (beatInMeasure === 0) return 1.0;
    return 0.2;
  },

  /**
   * Custom pattern: User-defined accents per beat
   * Uses customAccents array
   */
  custom: (beatInMeasure, timeSignature, options) => {
    const { customAccents } = options;
    if (!customAccents || beatInMeasure >= customAccents.length) {
      return 0.5;
    }
    return customAccents[beatInMeasure] ? 1.0 : 0.3;
  },

  /**
   * Swing pattern: Affects timing rather than volume
   * Returns standard accent (this is handled in timing, not volume)
   */
  swing: (beatInMeasure, timeSignature) => {
    return beatInMeasure === 0 ? 1.0 : 0.3;
  }
};

/**
 * Calculate accent strength for a given beat
 * @param {string} pattern - Pattern name ('standard', 'waltz', 'swing', etc.)
 * @param {number} beatInMeasure - Beat number within measure (0-indexed)
 * @param {Object} timeSignature - { numerator, denominator }
 * @param {Object} options - Additional options (customAccents, swingRatio)
 * @returns {number} Accent strength 0.0-1.0
 */
export function calculateAccent(pattern, beatInMeasure, timeSignature, options = {}) {
  const patternFunc = ACCENT_PATTERNS[pattern];

  if (!patternFunc) {
    console.warn(`Unknown accent pattern: ${pattern}, using standard`);
    return ACCENT_PATTERNS.standard(beatInMeasure, timeSignature);
  }

  return patternFunc(beatInMeasure, timeSignature, options);
}

/**
 * Calculate swing timing offset for a subdivision
 * @param {number} subdivision - Subdivision number (0, 1, 2 for triplets, etc.)
 * @param {number} swingRatio - Swing ratio (0.5 = straight, 0.67 = swing)
 * @param {number} secondsPerBeat - Duration of one beat in seconds
 * @returns {number} Time offset in seconds
 */
export function calculateSwingOffset(subdivision, swingRatio, secondsPerBeat) {
  // Only offset the "and" of each beat (odd subdivisions)
  if (subdivision % 2 === 1) {
    // Shift the second eighth note by the swing ratio
    return secondsPerBeat * (swingRatio - 0.5);
  }
  return 0;
}
