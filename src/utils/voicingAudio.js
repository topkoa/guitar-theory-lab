/**
 * Web Audio API utilities for playing chord voicings
 * Provides both strum (arpeggio) and simultaneous playback
 */

import { getNoteIndex, getNoteOnFret } from '../data/notes';

/**
 * Base octaves for guitar strings in standard tuning
 * String 0 (low E) = E2, String 5 (high e) = E4
 */
const STRING_BASE_OCTAVES = [2, 2, 3, 3, 3, 4]; // E2, A2, D3, G3, B3, E4

/**
 * Base semitones for each string's open note (in standard tuning)
 * E=4, A=9, D=2, G=7, B=11, E=4
 */
const STANDARD_TUNING_SEMITONES = [4, 9, 2, 7, 11, 4]; // E, A, D, G, B, E

/**
 * Convert note name to frequency in Hz using equal temperament
 * @param {string} note - Note name (e.g., "C", "D#", "Gb")
 * @param {number} octave - Octave number (default: 4)
 * @returns {number} Frequency in Hz
 */
export function noteToFrequency(note, octave = 4) {
  const noteIndex = getNoteIndex(note);
  // A4 = 440 Hz is the reference (index 9 in chromatic scale, octave 4)
  const semitonesFromA4 = (noteIndex - 9) + ((octave - 4) * 12);
  return 440 * Math.pow(2, semitonesFromA4 / 12);
}

/**
 * Calculate the octave for a note on a specific string and fret
 * @param {number} stringIndex - String index (0 = low E)
 * @param {number} fret - Fret number (0 = open)
 * @param {Array<string>} tuning - Array of open string notes
 * @returns {number} Octave number
 */
export function getOctaveForPosition(stringIndex, fret, tuning) {
  // Get the open note for this string
  const openNote = tuning[stringIndex];
  const openNoteIndex = getNoteIndex(openNote);

  // Standard tuning reference for base octave
  // Low E (string 0) is E2, High e (string 5) is E4
  // We need to determine base octave from the string position
  const baseOctave = STRING_BASE_OCTAVES[stringIndex] || 3;

  // Calculate semitones from the open note
  // Each 12 frets = 1 octave
  const octaveOffset = Math.floor((openNoteIndex + fret) / 12) - Math.floor(openNoteIndex / 12);

  return baseOctave + octaveOffset;
}

/**
 * Get playable notes from a voicing (excluding muted strings)
 * @param {Object} voicing - Voicing object with positions array
 * @param {Array<string>} tuning - Current tuning
 * @returns {Array<{note: string, octave: number, stringIndex: number}>} Array of note data
 */
export function getVoicingNotes(voicing, tuning) {
  if (!voicing || !voicing.positions) return [];

  const notes = [];

  voicing.positions.forEach((pos) => {
    // Skip muted strings (fret === null)
    if (pos.fret === null) return;

    const note = getNoteOnFret(tuning[pos.string], pos.fret);
    const octave = getOctaveForPosition(pos.string, pos.fret, tuning);

    notes.push({
      note,
      octave,
      stringIndex: pos.string,
      fret: pos.fret
    });
  });

  // Sort by string index (low to high for strumming)
  return notes.sort((a, b) => a.stringIndex - b.stringIndex);
}

/**
 * Create and play a single note
 * @param {AudioContext} ctx - Web Audio context
 * @param {string} note - Note name
 * @param {number} octave - Octave number
 * @param {number} startTime - When to start playing
 * @param {Object} options - Playback options
 * @returns {Object} Reference to oscillator and gain nodes
 */
function playNote(ctx, note, octave, startTime, options = {}) {
  const {
    volume = 0.2,
    duration = 0.8,
    waveform = 'triangle'
  } = options;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const frequency = noteToFrequency(note, octave);
  osc.frequency.value = frequency;
  osc.type = waveform;

  // Envelope: quick attack, sustain, smooth release
  const attackTime = 0.01;
  const releaseTime = 0.1;

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + attackTime);
  gain.gain.setValueAtTime(volume, startTime + duration - releaseTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration);

  return { osc, gain, stopTime: startTime + duration };
}

/**
 * Play voicing as a strum (arpeggio from low to high)
 * @param {AudioContext} ctx - Web Audio context
 * @param {Object} voicing - Voicing object
 * @param {Array<string>} tuning - Current tuning
 * @param {Object} options - Playback options
 * @returns {Array} Array of active node references
 */
export function playVoicingStrum(ctx, voicing, tuning, options = {}) {
  const {
    volume = 0.25,
    noteDuration = 0.6,
    strumDelay = 0.04, // 40ms between notes
    waveform = 'triangle'
  } = options;

  if (!ctx || !voicing) return [];

  // Resume audio context if suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const notes = getVoicingNotes(voicing, tuning);
  if (notes.length === 0) return [];

  const now = ctx.currentTime;
  const activeNodes = [];

  // Per-note volume to prevent clipping
  const perNoteVolume = volume / Math.sqrt(notes.length);

  notes.forEach((noteData, index) => {
    const startTime = now + (index * strumDelay);

    const node = playNote(ctx, noteData.note, noteData.octave, startTime, {
      volume: perNoteVolume,
      duration: noteDuration,
      waveform
    });

    activeNodes.push(node);
  });

  return activeNodes;
}

/**
 * Play voicing simultaneously (all notes at once)
 * @param {AudioContext} ctx - Web Audio context
 * @param {Object} voicing - Voicing object
 * @param {Array<string>} tuning - Current tuning
 * @param {Object} options - Playback options
 * @returns {Array} Array of active node references
 */
export function playVoicingSimultaneous(ctx, voicing, tuning, options = {}) {
  const {
    volume = 0.25,
    duration = 0.8,
    waveform = 'triangle'
  } = options;

  if (!ctx || !voicing) return [];

  // Resume audio context if suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const notes = getVoicingNotes(voicing, tuning);
  if (notes.length === 0) return [];

  const now = ctx.currentTime;
  const activeNodes = [];

  // Per-note volume to prevent clipping
  const perNoteVolume = volume / Math.sqrt(notes.length);

  notes.forEach((noteData) => {
    const node = playNote(ctx, noteData.note, noteData.octave, now, {
      volume: perNoteVolume,
      duration,
      waveform
    });

    activeNodes.push(node);
  });

  return activeNodes;
}

/**
 * Stop all active nodes immediately
 * @param {Array} activeNodes - Array of node references
 * @param {AudioContext} ctx - Web Audio context
 */
export function stopVoicingPlayback(activeNodes, ctx) {
  if (!activeNodes || !ctx) return;

  const now = ctx.currentTime;
  activeNodes.forEach(({ gain, stopTime }) => {
    if (now < stopTime) {
      try {
        gain.gain.setValueAtTime(0, now);
      } catch (e) {
        // Node may already be stopped
      }
    }
  });
}

/**
 * Create or get AudioContext (handles browser autoplay restrictions)
 * @returns {AudioContext} Web Audio context
 */
export function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  return new AudioContextClass();
}
