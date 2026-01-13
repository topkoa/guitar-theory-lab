/**
 * Web Audio API utilities for ear training
 * Provides single note and interval playback functionality
 */

import { getNoteIndex, getNoteAtInterval } from '../data/notes';

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
  const semitonesFromA4 = (noteIndex - 9) + ((octave - 4) * 12);

  // Equal temperament formula: f = 440 * 2^(n/12)
  return 440 * Math.pow(2, semitonesFromA4 / 12);
}

/**
 * Create and play a single note using Web Audio API
 * @param {AudioContext} ctx - Web Audio context
 * @param {string} note - Note name to play
 * @param {Object} options - Playback options
 * @returns {Object} Reference to active nodes for stopping
 */
export function playNote(ctx, note, options = {}) {
  const {
    octave = 4,
    volume = 0.3,
    duration = 1.0,
    waveform = 'triangle',
    startTime = null
  } = options;

  if (!ctx) return null;

  // Resume audio context if suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const time = startTime !== null ? startTime : ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const frequency = noteToFrequency(note, octave);
  osc.frequency.value = frequency;
  osc.type = waveform;

  // Envelope: quick attack, sustain, smooth release
  const attackTime = 0.02;
  const releaseTime = 0.15;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(volume, time + attackTime);
  gain.gain.setValueAtTime(volume, time + duration - releaseTime);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  osc.start(time);
  osc.stop(time + duration);

  return {
    osc,
    gain,
    stopTime: time + duration
  };
}

/**
 * Play two notes in sequence (interval)
 * @param {AudioContext} ctx - Web Audio context
 * @param {string} rootNote - First note
 * @param {number} semitones - Interval in semitones
 * @param {Object} options - Playback options
 * @returns {Array} References to active nodes
 */
export function playInterval(ctx, rootNote, semitones, options = {}) {
  const {
    octave = 4,
    volume = 0.3,
    noteDuration = 0.8,
    gapDuration = 0.15,
    waveform = 'triangle',
    direction = 'ascending' // 'ascending' or 'descending'
  } = options;

  if (!ctx) return [];

  // Resume audio context if suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const activeNodes = [];

  // Calculate the second note
  const secondNote = getNoteAtInterval(rootNote, semitones);

  // Determine which octave for the second note
  // If ascending and semitones would go past octave, keep it in same octave visually
  // but the frequency will naturally be higher
  let secondOctave = octave;
  if (direction === 'ascending' && semitones >= 12) {
    secondOctave = octave + 1;
  } else if (direction === 'descending') {
    // For descending, play second note lower
    if (semitones > 0) {
      secondOctave = semitones >= 6 ? octave - 1 : octave;
    }
  }

  // Play first note
  const firstNode = playNote(ctx, rootNote, {
    octave,
    volume,
    duration: noteDuration,
    waveform,
    startTime: now
  });
  if (firstNode) activeNodes.push(firstNode);

  // Play second note after gap
  const secondStartTime = now + noteDuration + gapDuration;

  if (direction === 'descending') {
    // Descending: second note is lower
    const lowerNote = getNoteAtInterval(rootNote, -semitones + 12);
    const lowerOctave = semitones > 6 ? octave - 1 : octave;

    const secondNode = playNote(ctx, lowerNote, {
      octave: lowerOctave,
      volume,
      duration: noteDuration,
      waveform,
      startTime: secondStartTime
    });
    if (secondNode) activeNodes.push(secondNode);
  } else {
    // Ascending: second note is higher
    const secondNode = playNote(ctx, secondNote, {
      octave: secondOctave,
      volume,
      duration: noteDuration,
      waveform,
      startTime: secondStartTime
    });
    if (secondNode) activeNodes.push(secondNode);
  }

  return activeNodes;
}

/**
 * Play chord notes simultaneously
 * @param {AudioContext} ctx - Web Audio context
 * @param {Array<string>} notes - Array of note names
 * @param {Object} options - Playback options
 * @returns {Array} References to active nodes
 */
export function playChordForEarTraining(ctx, notes, options = {}) {
  const {
    baseOctave = 3,
    volume = 0.2,
    duration = 1.5,
    waveform = 'triangle'
  } = options;

  if (!ctx || !notes || notes.length === 0) return [];

  // Resume audio context if suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const activeNodes = [];

  // Create voicing: root lower, other notes spread up
  const octaves = notes.map((_, index) => {
    if (index === 0) return baseOctave;
    if (index < 3) return baseOctave + 1;
    return baseOctave + 1; // Extensions in higher octave
  });

  // Per-note volume to prevent clipping (divide by note count)
  const perNoteVolume = volume / Math.sqrt(notes.length);

  notes.forEach((note, index) => {
    const node = playNote(ctx, note, {
      octave: octaves[index],
      volume: perNoteVolume,
      duration,
      waveform,
      startTime: now
    });
    if (node) activeNodes.push(node);
  });

  return activeNodes;
}

/**
 * Play chord notes as arpeggio (one at a time)
 * @param {AudioContext} ctx - Web Audio context
 * @param {Array<string>} notes - Array of note names
 * @param {Object} options - Playback options
 * @returns {Array} References to active nodes
 */
export function playArpeggio(ctx, notes, options = {}) {
  const {
    baseOctave = 3,
    volume = 0.25,
    noteDuration = 0.4,
    gapDuration = 0.1,
    waveform = 'triangle'
  } = options;

  if (!ctx || !notes || notes.length === 0) return [];

  // Resume audio context if suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const activeNodes = [];

  // Create voicing: root lower, other notes spread up
  const octaves = notes.map((_, index) => {
    if (index === 0) return baseOctave;
    return baseOctave + 1;
  });

  notes.forEach((note, index) => {
    const startTime = now + index * (noteDuration + gapDuration);

    const node = playNote(ctx, note, {
      octave: octaves[index],
      volume,
      duration: noteDuration,
      waveform,
      startTime
    });
    if (node) activeNodes.push(node);
  });

  return activeNodes;
}

/**
 * Stop all active nodes immediately
 * @param {Array} activeNodes - Array of node references
 * @param {AudioContext} ctx - Web Audio context
 */
export function stopAllNotes(activeNodes, ctx) {
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
