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
