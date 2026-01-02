// Chord definitions with intervals (in semitones from root)

export const CHORDS = {
  major: {
    name: 'Major',
    intervals: [0, 4, 7],
    formula: '1-3-5',
    description: 'Happy, bright sound'
  },
  minor: {
    name: 'Minor',
    intervals: [0, 3, 7],
    formula: '1-b3-5',
    description: 'Sad, dark sound'
  },
  diminished: {
    name: 'Diminished',
    intervals: [0, 3, 6],
    formula: '1-b3-b5',
    description: 'Tense, unstable sound'
  },
  augmented: {
    name: 'Augmented',
    intervals: [0, 4, 8],
    formula: '1-3-#5',
    description: 'Bright, unsettled sound'
  },
  sus2: {
    name: 'Suspended 2nd',
    intervals: [0, 2, 7],
    formula: '1-2-5',
    description: 'Open, unresolved sound'
  },
  sus4: {
    name: 'Suspended 4th',
    intervals: [0, 5, 7],
    formula: '1-4-5',
    description: 'Tension waiting to resolve'
  },
  dom7: {
    name: 'Dominant 7th',
    intervals: [0, 4, 7, 10],
    formula: '1-3-5-b7',
    description: 'Blues/jazz essential'
  },
  maj7: {
    name: 'Major 7th',
    intervals: [0, 4, 7, 11],
    formula: '1-3-5-7',
    description: 'Smooth, jazzy sound'
  },
  min7: {
    name: 'Minor 7th',
    intervals: [0, 3, 7, 10],
    formula: '1-b3-5-b7',
    description: 'Mellow, soulful sound'
  },
  dim7: {
    name: 'Diminished 7th',
    intervals: [0, 3, 6, 9],
    formula: '1-b3-b5-bb7',
    description: 'Symmetrical, mysterious'
  },
  min7b5: {
    name: 'Half-Diminished (m7b5)',
    intervals: [0, 3, 6, 10],
    formula: '1-b3-b5-b7',
    description: 'Jazz minor ii chord'
  },
  add9: {
    name: 'Add 9',
    intervals: [0, 4, 7, 14],
    formula: '1-3-5-9',
    description: 'Major with added 9th'
  },
  power: {
    name: 'Power Chord (5)',
    intervals: [0, 7],
    formula: '1-5',
    description: 'Rock essential, no 3rd'
  },
  dom9: {
    name: 'Dominant 9th',
    intervals: [0, 4, 7, 10, 14],
    formula: '1-3-5-b7-9',
    description: 'Funky, soulful'
  },
  maj9: {
    name: 'Major 9th',
    intervals: [0, 4, 7, 11, 14],
    formula: '1-3-5-7-9',
    description: 'Lush, sophisticated'
  },
  min9: {
    name: 'Minor 9th',
    intervals: [0, 3, 7, 10, 14],
    formula: '1-b3-5-b7-9',
    description: 'Smooth R&B/jazz'
  }
};

// Chord interval names for display
export const CHORD_INTERVAL_NAMES = {
  0: 'R',
  2: '2',
  3: 'b3',
  4: '3',
  5: '4',
  6: 'b5',
  7: '5',
  8: '#5',
  9: 'bb7',
  10: 'b7',
  11: '7',
  14: '9'
};

// Get chord options for selector
export function getChordOptions() {
  return Object.entries(CHORDS).map(([key, chord]) => ({
    value: key,
    label: chord.name
  }));
}
