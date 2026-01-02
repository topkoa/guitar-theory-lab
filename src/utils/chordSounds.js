/**
 * Web Audio API chord sound generators
 * Generates chord sounds using simple oscillators for lightweight performance
 */

import { getNoteIndex } from '../data/notes';

/**
 * Convert note name to frequency in Hz using equal temperament
 * @param {string} note - Note name (e.g., "C", "D#", "Gb")
 * @param {number} octave - Octave number (default: 4)
 * @returns {number} Frequency in Hz
 */
export function noteToFrequency(note, octave = 4) {
  // A4 = 440 Hz is the reference (index 9 in chromatic scale, octave 4)
  const noteIndex = getNoteIndex(note);

  // Calculate semitones from A4
  // A is at index 9, so offset is noteIndex - 9
  // Add octave difference: (octave - 4) * 12
  const semitonesFromA4 = (noteIndex - 9) + ((octave - 4) * 12);

  // Equal temperament formula: f = 440 * 2^(n/12)
  const frequency = 440 * Math.pow(2, semitonesFromA4 / 12);

  return frequency;
}

/**
 * Determine optimal octave for each note in a chord voicing
 * Creates musically pleasing voicings with root notes lower and extensions higher
 * @param {Array<string>} notes - Array of note names
 * @returns {Array<number>} Array of octave numbers for each note
 */
export function getChordVoicing(notes) {
  const noteCount = notes.length;

  if (noteCount === 0) return [];
  if (noteCount === 1) return [4];
  if (noteCount === 2) return [3, 4]; // Power chord style
  if (noteCount === 3) return [3, 4, 4]; // Triad voicing
  if (noteCount === 4) return [3, 4, 4, 5]; // 7th chord voicing

  // 5+ notes: spread voicing for extended chords
  return [3, 4, 4, 5, 5, ...Array(noteCount - 5).fill(5)];
}

/**
 * Create and play a chord sound using Web Audio API
 * @param {AudioContext} ctx - Web Audio context
 * @param {number} time - Scheduled play time
 * @param {Array<string>} notes - Array of note names to play
 * @param {number} volume - Volume level (0.0-1.0, default: 0.25)
 * @param {number} duration - Duration in seconds (default: 0.8)
 * @param {string} waveform - Oscillator type ('sine' or 'triangle', default: 'sine')
 */
export function createChordSound(ctx, time, notes, volume = 0.25, duration = 0.8, waveform = 'sine') {
  if (!ctx || !notes || notes.length === 0) return;

  // Get voicing octaves for each note
  const octaves = getChordVoicing(notes);

  // Create an oscillator and gain node for each note
  notes.forEach((note, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Connect nodes: Oscillator → Gain → Destination
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Set frequency based on note and octave
    const frequency = noteToFrequency(note, octaves[index]);
    osc.frequency.value = frequency;

    // Set waveform (sine or triangle)
    osc.type = waveform;

    // Apply envelope: quick attack, sustain, fade out
    const attackTime = 0.01; // 10ms attack
    const releaseTime = 0.1; // 100ms release

    // Start at 0, ramp up to volume quickly
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume, time + attackTime);

    // Hold at volume for duration
    gain.gain.setValueAtTime(volume, time + duration - releaseTime);

    // Fade out at the end
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    // Start and stop oscillator
    osc.start(time);
    osc.stop(time + duration);
  });
}

/**
 * Play chord immediately (for manual trigger button)
 * @param {AudioContext} ctx - Web Audio context
 * @param {Array<string>} notes - Array of note names to play
 * @param {number} volume - Volume level (default: 0.25)
 * @param {number} duration - Duration in seconds (default: 0.8)
 * @param {string} waveform - Oscillator type (default: 'sine')
 */
export function playChordNow(ctx, notes, volume = 0.25, duration = 0.8, waveform = 'sine') {
  if (!ctx) return;

  // Resume audio context if suspended (browser autoplay policy)
  if (ctx.state === 'suspended') {
    ctx.resume().then(() => {
      createChordSound(ctx, ctx.currentTime, notes, volume, duration, waveform);
    });
  } else {
    createChordSound(ctx, ctx.currentTime, notes, volume, duration, waveform);
  }
}
