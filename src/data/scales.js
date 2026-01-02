// Scale definitions with intervals (in semitones from root)
// Intervals array: each number is semitones from the root note

export const SCALES = {
  major: {
    name: 'Major (Ionian)',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    formula: 'W-W-H-W-W-W-H',
    description: 'The foundation of Western music theory'
  },
  naturalMinor: {
    name: 'Natural Minor (Aeolian)',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    formula: 'W-H-W-W-H-W-W',
    description: 'The relative minor scale'
  },
  harmonicMinor: {
    name: 'Harmonic Minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    formula: 'W-H-W-W-H-3H-H',
    description: 'Natural minor with raised 7th'
  },
  melodicMinor: {
    name: 'Melodic Minor',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    formula: 'W-H-W-W-W-W-H',
    description: 'Natural minor with raised 6th and 7th'
  },
  pentatonicMajor: {
    name: 'Pentatonic Major',
    intervals: [0, 2, 4, 7, 9],
    formula: 'W-W-3H-W-3H',
    description: 'Five-note major scale, great for soloing'
  },
  pentatonicMinor: {
    name: 'Pentatonic Minor',
    intervals: [0, 3, 5, 7, 10],
    formula: '3H-W-W-3H-W',
    description: 'Five-note minor scale, blues/rock staple'
  },
  blues: {
    name: 'Blues',
    intervals: [0, 3, 5, 6, 7, 10],
    formula: '3H-W-H-H-3H-W',
    description: 'Minor pentatonic with added b5 (blue note)'
  },
  dorian: {
    name: 'Dorian',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    formula: 'W-H-W-W-W-H-W',
    description: 'Minor scale with raised 6th, jazzy feel'
  },
  phrygian: {
    name: 'Phrygian',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    formula: 'H-W-W-W-H-W-W',
    description: 'Spanish/flamenco flavor'
  },
  lydian: {
    name: 'Lydian',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    formula: 'W-W-W-H-W-W-H',
    description: 'Major scale with raised 4th, dreamy sound'
  },
  mixolydian: {
    name: 'Mixolydian',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    formula: 'W-W-H-W-W-H-W',
    description: 'Major scale with lowered 7th, dominant feel'
  },
  locrian: {
    name: 'Locrian',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    formula: 'H-W-W-H-W-W-W',
    description: 'Diminished scale, rarely used as tonic'
  },
  chromatic: {
    name: 'Chromatic',
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    formula: 'H-H-H-H-H-H-H-H-H-H-H-H',
    description: 'All 12 notes'
  }
};

// Interval names for display
export const INTERVAL_NAMES = {
  0: 'R',   // Root
  1: 'b2',
  2: '2',
  3: 'b3',
  4: '3',
  5: '4',
  6: 'b5',
  7: '5',
  8: 'b6',
  9: '6',
  10: 'b7',
  11: '7'
};

// Get scale options for selector
export function getScaleOptions() {
  return Object.entries(SCALES).map(([key, scale]) => ({
    value: key,
    label: scale.name
  }));
}
