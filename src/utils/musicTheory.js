import { NOTES, getNoteIndex, getNoteAtInterval, getNoteOnFret } from '../data/notes';
import { SCALES, INTERVAL_NAMES } from '../data/scales';
import { CHORDS, CHORD_INTERVAL_NAMES } from '../data/chords';

// Get all notes in a scale given root note and scale type
export function getScaleNotes(rootNote, scaleKey) {
  const scale = SCALES[scaleKey];
  if (!scale) return [];

  return scale.intervals.map(interval => getNoteAtInterval(rootNote, interval));
}

// Get all notes in a chord given root note and chord type
export function getChordNotes(rootNote, chordKey) {
  const chord = CHORDS[chordKey];
  if (!chord) return [];

  return chord.intervals.map(interval => getNoteAtInterval(rootNote, interval % 12));
}

// Check if a note is in a scale
export function isNoteInScale(note, rootNote, scaleKey) {
  const scaleNotes = getScaleNotes(rootNote, scaleKey);
  return scaleNotes.includes(note);
}

// Check if a note is in a chord
export function isNoteInChord(note, rootNote, chordKey) {
  const chordNotes = getChordNotes(rootNote, chordKey);
  return chordNotes.includes(note);
}

// Get the interval of a note relative to root
export function getIntervalFromRoot(note, rootNote) {
  const rootIndex = getNoteIndex(rootNote);
  const noteIndex = getNoteIndex(note);
  return (noteIndex - rootIndex + 12) % 12;
}

// Get interval name for display
export function getIntervalName(note, rootNote, isChord = false) {
  const interval = getIntervalFromRoot(note, rootNote);
  return isChord ? CHORD_INTERVAL_NAMES[interval] : INTERVAL_NAMES[interval];
}

// Generate fretboard data for given tuning
export function generateFretboardData(tuning, fretCount = 22) {
  return tuning.map((openNote, stringIndex) => {
    const frets = [];
    for (let fret = 0; fret <= fretCount; fret++) {
      frets.push({
        fret,
        note: getNoteOnFret(openNote, fret),
        stringIndex
      });
    }
    return frets;
  });
}

// Get notes to highlight based on current selection
export function getHighlightedNotes(rootNote, type, typeKey) {
  if (type === 'scale') {
    return getScaleNotes(rootNote, typeKey);
  } else if (type === 'chord') {
    return getChordNotes(rootNote, typeKey);
  }
  return [];
}

// Get scale/chord info for reference panel
export function getSelectionInfo(type, typeKey) {
  if (type === 'scale') {
    return SCALES[typeKey] || null;
  } else if (type === 'chord') {
    return CHORDS[typeKey] || null;
  }
  return null;
}

// Calculate neck traversal path for scales/chords
export function calculateNeckTraversalPath(
  tuning,
  highlightedNotes,
  rootNote,
  fretCount = 22,
  fretRangeWidth = 4,
  tabView = false,
  direction = 'ascending'
) {
  if (!highlightedNotes.length) return [];

  // 1. Build list of all valid fret positions for each string
  const stringPositions = tuning.map((openNote, stringIndex) => {
    const positions = [];
    for (let fret = 0; fret <= fretCount; fret++) {
      const note = getNoteOnFret(openNote, fret);
      if (highlightedNotes.includes(note)) {
        positions.push({ stringIndex, fret, note });
      }
    }
    return positions;
  });

  // 2. Handle inverted view (tab view reverses strings)
  const orderedStrings = tabView ? [...stringPositions].reverse() : stringPositions;

  // 3. Build diagonal path based on direction
  const path = [];
  let currentFret = null;

  for (let i = 0; i < orderedStrings.length; i++) {
    const stringCandidates = orderedStrings[i];
    if (stringCandidates.length === 0) continue;

    let selectedPosition;

    if (currentFret === null) {
      // First string: choose starting position based on direction
      const rootPositions = stringCandidates.filter(p => p.note === rootNote);

      if (direction === 'ascending') {
        // Start at lowest fret (prefer root if available)
        selectedPosition = rootPositions.length > 0
          ? rootPositions.reduce((lowest, pos) => pos.fret < lowest.fret ? pos : lowest)
          : stringCandidates[0];
      } else {
        // Start at highest fret (prefer root if available)
        selectedPosition = rootPositions.length > 0
          ? rootPositions.reduce((highest, pos) => pos.fret > highest.fret ? pos : highest)
          : stringCandidates[stringCandidates.length - 1];
      }
    } else {
      // Subsequent strings: choose position that moves in the desired direction
      if (direction === 'ascending') {
        // Prefer positions at higher frets than current
        const higherPositions = stringCandidates.filter(p => p.fret >= currentFret);
        if (higherPositions.length > 0) {
          // Choose the one closest to current + ideal step size
          const idealNextFret = currentFret + 2; // Step up by ~2 frets per string for diagonal
          selectedPosition = higherPositions.reduce((closest, pos) => {
            const currentDistance = Math.abs(pos.fret - idealNextFret);
            const closestDistance = Math.abs(closest.fret - idealNextFret);
            return currentDistance < closestDistance ? pos : closest;
          });
        } else {
          // No higher positions available, take the highest available
          selectedPosition = stringCandidates[stringCandidates.length - 1];
        }
      } else {
        // Prefer positions at lower frets than current
        const lowerPositions = stringCandidates.filter(p => p.fret <= currentFret);
        if (lowerPositions.length > 0) {
          // Choose the one closest to current - ideal step size
          const idealNextFret = currentFret - 2; // Step down by ~2 frets per string for diagonal
          selectedPosition = lowerPositions.reduce((closest, pos) => {
            const currentDistance = Math.abs(pos.fret - idealNextFret);
            const closestDistance = Math.abs(closest.fret - idealNextFret);
            return currentDistance < closestDistance ? pos : closest;
          });
        } else {
          // No lower positions available, take the lowest available
          selectedPosition = stringCandidates[0];
        }
      }
    }

    path.push(selectedPosition);
    currentFret = selectedPosition.fret;
  }

  if (path.length === 0) return [];

  // 4. Expand path to include notes within fret range window
  const expandedPath = [];
  const addedPositions = new Set();

  for (const pathNote of path) {
    const key = `${pathNote.stringIndex}-${pathNote.fret}`;
    if (!addedPositions.has(key)) {
      expandedPath.push(pathNote);
      addedPositions.add(key);
    }

    // Find all notes on same string within range of this path point
    const sameStringNotes = stringPositions[pathNote.stringIndex];
    for (const candidate of sameStringNotes) {
      const candidateKey = `${candidate.stringIndex}-${candidate.fret}`;
      const isInRange = Math.abs(candidate.fret - pathNote.fret) <= fretRangeWidth;

      if (isInRange && !addedPositions.has(candidateKey)) {
        expandedPath.push(candidate);
        addedPositions.add(candidateKey);
      }
    }
  }

  return expandedPath;
}

// Get position name (Roman numeral) for fretboard positions
export function getPositionName(startFret) {
  if (startFret === 0) return 'Open';

  const romanNumerals = {
    1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
    6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X',
    11: 'XI', 12: 'XII', 13: 'XIII', 14: 'XIV', 15: 'XV'
  };
  return romanNumerals[startFret] || String(startFret);
}

// Get all available position options for the dropdown
export function getPositionOptions() {
  const positions = [];

  // Open position (frets 0-3)
  positions.push({
    value: 0,
    label: 'Open (frets 0-3)',
    startFret: 0,
    endFret: 3
  });

  // Positions I through XII
  for (let fret = 1; fret <= 12; fret++) {
    positions.push({
      value: fret,
      label: `${getPositionName(fret)} (frets ${fret}-${fret + 3})`,
      startFret: fret,
      endFret: fret + 3
    });
  }

  return positions;
}
