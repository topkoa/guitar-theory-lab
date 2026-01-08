// Utility functions for chord voicings
import { NOTES, getNoteIndex, getNoteOnFret } from '../data/notes';
import { OPEN_VOICINGS, MOVEABLE_VOICINGS, STANDARD_TUNING } from '../data/voicings';
import { getChordNotes } from './musicTheory';

/**
 * Find the fret position for a specific note on a given string
 * @param {string} targetNote - The note to find (e.g., 'C', 'F#')
 * @param {string} openStringNote - The open string note
 * @param {number} maxFret - Maximum fret to search
 * @returns {number[]} Array of fret positions where the note occurs
 */
export function findNoteOnString(targetNote, openStringNote, maxFret = 22) {
  const positions = [];
  for (let fret = 0; fret <= maxFret; fret++) {
    if (getNoteOnFret(openStringNote, fret) === targetNote) {
      positions.push(fret);
    }
  }
  return positions;
}

/**
 * Calculate fret offset needed to transpose a moveable shape to a target root
 * @param {string} targetRoot - The target root note
 * @param {number} rootString - Which string has the root (0-5)
 * @param {string[]} tuning - Current tuning
 * @returns {number} Fret offset from open position
 */
export function calculateRootFretOffset(targetRoot, rootString, tuning = STANDARD_TUNING) {
  const openNote = tuning[rootString];
  const openNoteIndex = getNoteIndex(openNote);
  const targetIndex = getNoteIndex(targetRoot);

  // Calculate semitones from open note to target
  let offset = (targetIndex - openNoteIndex + 12) % 12;

  return offset;
}

/**
 * Transpose a moveable voicing shape to a specific root note
 * @param {Object} moveableVoicing - The moveable voicing template
 * @param {string} targetRoot - Target root note
 * @param {string[]} tuning - Current tuning
 * @returns {Object} Transposed voicing with absolute fret positions
 */
export function transposeVoicing(moveableVoicing, targetRoot, tuning = STANDARD_TUNING) {
  const fretOffset = calculateRootFretOffset(targetRoot, moveableVoicing.rootString, tuning);

  // Skip if this would put the chord at fret 0 (use open voicing instead)
  // or beyond the fretboard
  if (fretOffset === 0) {
    return null; // Let open voicing be used instead
  }

  const transposedPositions = moveableVoicing.basePositions.map(pos => {
    if (pos.fret === null) {
      return { string: pos.string, fret: null };
    }
    const newFret = pos.fret + fretOffset;
    // Skip if fret is negative or too high
    if (newFret < 0 || newFret > 22) {
      return { string: pos.string, fret: null };
    }
    return { string: pos.string, fret: newFret };
  });

  // Check if any required notes ended up muted (invalid transposition)
  const hasInvalidFrets = transposedPositions.some(
    (pos, i) => moveableVoicing.basePositions[i].fret !== null && pos.fret === null
  );

  if (hasInvalidFrets) {
    return null;
  }

  // Calculate barre info if present
  let transposedBarreInfo = null;
  if (moveableVoicing.barreInfo) {
    transposedBarreInfo = {
      fret: moveableVoicing.barreInfo.fretOffset + fretOffset,
      fromString: moveableVoicing.barreInfo.fromString,
      toString: moveableVoicing.barreInfo.toString
    };
  }

  return {
    id: `${moveableVoicing.id}_${targetRoot.replace('#', 'sharp')}`,
    name: `${targetRoot} ${moveableVoicing.name}`,
    positions: transposedPositions,
    barreInfo: transposedBarreInfo,
    category: moveableVoicing.category,
    difficulty: moveableVoicing.difficulty,
    basedOn: moveableVoicing.id,
    rootFret: fretOffset
  };
}

/**
 * Get all available voicings for a chord (open + transposed moveable)
 * @param {string} rootNote - Root note of the chord
 * @param {string} chordType - Type of chord (major, minor, etc.)
 * @param {string[]} tuning - Current tuning
 * @returns {Object[]} Array of voicing objects
 */
export function getVoicingsForChord(rootNote, chordType, tuning = STANDARD_TUNING) {
  const voicings = [];

  // Check for open voicings first (ONLY in standard tuning)
  if (isStandardTuning(tuning)) {
    const openVoicingsForType = OPEN_VOICINGS[chordType];
    if (openVoicingsForType && openVoicingsForType[rootNote]) {
      voicings.push(...openVoicingsForType[rootNote]);
    }
  }

  // Get moveable voicings and transpose them
  const moveableVoicingsForType = MOVEABLE_VOICINGS[chordType];
  if (moveableVoicingsForType) {
    for (const moveable of moveableVoicingsForType) {
      const transposed = transposeVoicing(moveable, rootNote, tuning);
      if (transposed) {
        voicings.push(transposed);
      }
    }
  }

  // If no predefined voicings, generate algorithmically
  if (voicings.length === 0) {
    const generated = generateVoicings(rootNote, chordType, tuning);
    voicings.push(...generated);
  }

  // Sort by difficulty and then by position on neck
  voicings.sort((a, b) => {
    const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
    const aDiff = difficultyOrder[a.difficulty] ?? 1;
    const bDiff = difficultyOrder[b.difficulty] ?? 1;
    if (aDiff !== bDiff) return aDiff - bDiff;

    // Then by lowest fret position
    const aMinFret = Math.min(...a.positions.filter(p => p.fret !== null).map(p => p.fret));
    const bMinFret = Math.min(...b.positions.filter(p => p.fret !== null).map(p => p.fret));
    return aMinFret - bMinFret;
  });

  return voicings;
}

/**
 * Generate voicings algorithmically for chords without predefined shapes
 * @param {string} rootNote - Root note
 * @param {string} chordType - Chord type
 * @param {string[]} tuning - Current tuning
 * @param {Object} options - Generation options
 * @returns {Object[]} Array of generated voicings
 */
export function generateVoicings(rootNote, chordType, tuning = STANDARD_TUNING, options = {}) {
  const { maxFretSpan = 4, numVoicings = 4, minFret = 0, maxFret = 12 } = options;

  const chordNotes = getChordNotes(rootNote, chordType);
  if (!chordNotes.length) return [];

  const voicings = [];
  const stringCount = tuning.length;

  // Find all positions for each chord note on each string
  const notePositions = [];
  for (let stringIdx = 0; stringIdx < stringCount; stringIdx++) {
    const stringPositions = [];
    for (const note of chordNotes) {
      const frets = findNoteOnString(note, tuning[stringIdx], maxFret);
      for (const fret of frets) {
        if (fret >= minFret) {
          stringPositions.push({ note, fret });
        }
      }
    }
    notePositions.push(stringPositions);
  }

  // Generate voicings at different fret regions
  const regions = [
    { start: 0, end: 4 },
    { start: 5, end: 9 },
    { start: 7, end: 11 },
    { start: 10, end: 14 }
  ];

  for (const region of regions) {
    const voicing = generateVoicingInRegion(
      notePositions,
      chordNotes,
      rootNote,
      region.start,
      region.end,
      maxFretSpan,
      stringCount
    );

    if (voicing) {
      voicings.push({
        id: `generated_${rootNote}_${chordType}_${region.start}`,
        name: `Position ${region.start === 0 ? 'Open' : `Fret ${region.start}`}`,
        positions: voicing,
        category: 'generated',
        difficulty: region.start === 0 ? 'beginner' : 'intermediate'
      });
    }

    if (voicings.length >= numVoicings) break;
  }

  return voicings;
}

/**
 * Generate a single voicing within a fret region
 */
function generateVoicingInRegion(notePositions, chordNotes, rootNote, minFret, maxFret, maxSpan, stringCount) {
  const positions = [];
  let usedNotes = new Set();
  let fretMin = Infinity;
  let fretMax = -Infinity;

  // Try to place notes on strings from low to high
  for (let stringIdx = 0; stringIdx < stringCount; stringIdx++) {
    const availableOnString = notePositions[stringIdx].filter(
      p => p.fret >= minFret && p.fret <= maxFret
    );

    if (availableOnString.length === 0) {
      positions.push({ string: stringIdx, fret: null });
      continue;
    }

    // Prioritize: 1) root note, 2) unused chord tones, 3) any chord tone
    let bestPosition = null;

    // First priority: root note if not used yet
    if (!usedNotes.has(rootNote)) {
      bestPosition = availableOnString.find(p => p.note === rootNote);
    }

    // Second priority: unused chord tones
    if (!bestPosition) {
      for (const note of chordNotes) {
        if (!usedNotes.has(note)) {
          const pos = availableOnString.find(p => p.note === note);
          if (pos && wouldFitSpan(pos.fret, fretMin, fretMax, maxSpan)) {
            bestPosition = pos;
            break;
          }
        }
      }
    }

    // Third priority: any chord tone that fits the span
    if (!bestPosition) {
      for (const pos of availableOnString) {
        if (wouldFitSpan(pos.fret, fretMin, fretMax, maxSpan)) {
          bestPosition = pos;
          break;
        }
      }
    }

    if (bestPosition) {
      positions.push({ string: stringIdx, fret: bestPosition.fret });
      usedNotes.add(bestPosition.note);
      if (bestPosition.fret > 0) {
        fretMin = Math.min(fretMin, bestPosition.fret);
        fretMax = Math.max(fretMax, bestPosition.fret);
      }
    } else {
      positions.push({ string: stringIdx, fret: null });
    }
  }

  // Validate: must have at least 3 strings played and include the root
  const playedStrings = positions.filter(p => p.fret !== null).length;
  if (playedStrings < 3 || !usedNotes.has(rootNote)) {
    return null;
  }

  return positions;
}

/**
 * Check if adding a fret would keep within max span
 */
function wouldFitSpan(fret, currentMin, currentMax, maxSpan) {
  if (fret === 0) return true; // Open strings don't count toward span
  if (currentMin === Infinity) return true;

  const newMin = Math.min(currentMin, fret);
  const newMax = Math.max(currentMax, fret);

  // Only count frets > 0 for span calculation
  return (newMax - newMin) <= maxSpan;
}

/**
 * Convert voicing positions to fretboard highlight format
 * @param {Object} voicing - Voicing object
 * @param {string[]} tuning - Current tuning
 * @returns {Object[]} Array of { stringIndex, fret, note, isMuted }
 */
export function voicingToFretPositions(voicing, tuning = STANDARD_TUNING) {
  if (!voicing || !voicing.positions) return [];

  return voicing.positions.map((pos, idx) => {
    const stringIndex = pos.string;
    const isMuted = pos.fret === null;
    const note = isMuted ? null : getNoteOnFret(tuning[stringIndex], pos.fret);

    return {
      stringIndex,
      fret: pos.fret,
      note,
      isMuted
    };
  });
}

/**
 * Get voicing dropdown options
 * @param {Object[]} voicings - Array of voicing objects
 * @returns {Object[]} Array of { value, label }
 */
export function getVoicingOptions(voicings) {
  return voicings.map((v, idx) => ({
    value: idx,
    label: v.name,
    category: v.category,
    difficulty: v.difficulty
  }));
}

/**
 * Check if a tuning is standard (for determining if predefined voicings apply)
 * @param {string[]} tuning - Current tuning
 * @returns {boolean}
 */
export function isStandardTuning(tuning) {
  if (tuning.length !== STANDARD_TUNING.length) return false;
  return tuning.every((note, i) => note === STANDARD_TUNING[i]);
}
