// Default global settings for Jam mode
export const DEFAULT_GLOBAL_SETTINGS = {
  timeSignature: {
    numerator: 4,
    denominator: 4
  },
  accentPattern: 'standard', // 'standard', 'waltz', 'swing', 'allEqual', 'custom'
  customAccents: [true, false, false, false], // which beats to accent (for 'custom' pattern)
  swingRatio: 0.67, // 0.5 = straight eighths, 0.67 = swing/triplet feel
  metronomeSound: {
    type: 'beep', // 'beep', 'click', 'woodblock'
    subdivision: 'quarter', // 'quarter', 'eighth', 'triplet'
    volume: 0.5 // Volume level (0.0-1.0)
  },
  chordAudio: {
    enabled: true, // Enable/disable chord playback
    volume: 0.25, // Volume level (0.0-1.0)
    duration: 0.8, // Duration in seconds
    waveform: 'sine' // Oscillator type ('sine' or 'triangle')
  }
};

// Common time signature presets
export const TIME_SIGNATURES = {
  '2/4': { numerator: 2, denominator: 4 },
  '3/4': { numerator: 3, denominator: 4 },
  '4/4': { numerator: 4, denominator: 4 },
  '5/4': { numerator: 5, denominator: 4 },
  '6/8': { numerator: 6, denominator: 8 },
  '7/8': { numerator: 7, denominator: 8 },
  '9/8': { numerator: 9, denominator: 8 },
  '12/8': { numerator: 12, denominator: 8 }
};

/**
 * Resolves effective settings for a step by merging step-specific overrides
 * with global defaults
 * @param {Object} step - Step object with potential overrides
 * @param {Object} globalSettings - Global settings object
 * @returns {Object} Resolved settings for the step
 */
export function resolveStepSettings(step, globalSettings) {
  const overrides = step.overrides || {};

  return {
    timeSignature: overrides.timeSignature || globalSettings.timeSignature,
    accentPattern: overrides.accentPattern || globalSettings.accentPattern,
    customAccents: overrides.customAccents || globalSettings.customAccents,
    swingRatio: overrides.swingRatio !== null && overrides.swingRatio !== undefined
      ? overrides.swingRatio
      : globalSettings.swingRatio,
    metronomeSound: overrides.metronomeSound || globalSettings.metronomeSound,
    chordAudio: overrides.chordAudio || globalSettings.chordAudio || {
      enabled: true,
      volume: 0.25,
      duration: 0.8,
      waveform: 'sine'
    }
  };
}

/**
 * Checks if a step has any active overrides
 * @param {Object} step - Step object to check
 * @returns {boolean} True if step has any overrides
 */
export function hasOverrides(step) {
  if (!step.overrides) return false;

  return step.overrides.timeSignature !== null ||
         step.overrides.accentPattern !== null ||
         step.overrides.customAccents !== null ||
         (step.overrides.swingRatio !== null && step.overrides.swingRatio !== undefined) ||
         step.overrides.metronomeSound !== null ||
         step.overrides.chordAudio !== null;
}

/**
 * Counts the number of non-default global settings
 * @param {Object} settings - Current global settings
 * @returns {number} Number of settings that differ from defaults
 */
export function countNonDefaultSettings(settings) {
  let count = 0;

  if (settings.timeSignature.numerator !== 4 || settings.timeSignature.denominator !== 4) count++;
  if (settings.accentPattern !== 'standard') count++;
  if (settings.swingRatio !== 0.67) count++;
  if (settings.metronomeSound.type !== 'beep' ||
      settings.metronomeSound.subdivision !== 'quarter' ||
      settings.metronomeSound.volume !== 0.5) count++;

  // Check chordAudio only if it exists (backward compatibility)
  if (settings.chordAudio) {
    if (settings.chordAudio.enabled !== true ||
        settings.chordAudio.volume !== 0.25 ||
        settings.chordAudio.duration !== 0.8 ||
        settings.chordAudio.waveform !== 'sine') count++;
  }

  return count;
}
