// Chromatic scale - 12 notes
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Enharmonic equivalents for display
export const ENHARMONIC = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb'
};

// Get note index (0-11)
export function getNoteIndex(note) {
  const normalized = note.replace('b', '#');
  // Handle flats
  if (note.includes('b')) {
    const baseNote = note[0];
    const baseIndex = NOTES.indexOf(baseNote);
    return (baseIndex - 1 + 12) % 12;
  }
  return NOTES.indexOf(normalized);
}

// Get note at specific interval from root
export function getNoteAtInterval(rootNote, semitones) {
  const rootIndex = getNoteIndex(rootNote);
  const targetIndex = (rootIndex + semitones) % 12;
  return NOTES[targetIndex];
}

// Get note on fretboard given string open note and fret number
export function getNoteOnFret(openNote, fret) {
  return getNoteAtInterval(openNote, fret);
}

// Standard number of frets
export const FRET_COUNT = 22;

// Fret marker positions (dots on fretboard)
export const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21];
export const DOUBLE_MARKERS = [12]; // Octave markers (double dots)
