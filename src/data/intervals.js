// Interval definitions for ear training
// Each interval includes semitones, names, quality, and song references for learning

export const INTERVALS = {
  m2: {
    semitones: 1,
    name: 'Minor 2nd',
    shortName: 'm2',
    quality: 'dissonant',
    description: 'Half step - the smallest interval, very tense',
    songReference: 'Jaws theme (duh-duh)',
    songArtist: 'John Williams',
    difficulty: 'hard'
  },
  M2: {
    semitones: 2,
    name: 'Major 2nd',
    shortName: 'M2',
    quality: 'mild',
    description: 'Whole step - slightly tense but common',
    songReference: 'Happy Birthday (Hap-py)',
    songArtist: 'Traditional',
    difficulty: 'hard'
  },
  m3: {
    semitones: 3,
    name: 'Minor 3rd',
    shortName: 'm3',
    quality: 'consonant',
    description: 'Sad, dark quality - defines minor chords',
    songReference: 'Greensleeves (A-las)',
    songArtist: 'Traditional',
    difficulty: 'medium'
  },
  M3: {
    semitones: 4,
    name: 'Major 3rd',
    shortName: 'M3',
    quality: 'consonant',
    description: 'Happy, bright quality - defines major chords',
    songReference: 'Oh When the Saints (Oh-when)',
    songArtist: 'Traditional',
    difficulty: 'medium'
  },
  P4: {
    semitones: 5,
    name: 'Perfect 4th',
    shortName: 'P4',
    quality: 'perfect',
    description: 'Strong, open sound - common in melodies',
    songReference: 'Here Comes the Bride (Here-comes)',
    songArtist: 'Wagner',
    difficulty: 'easy'
  },
  TT: {
    semitones: 6,
    name: 'Tritone',
    shortName: 'TT',
    quality: 'dissonant',
    description: 'The "devil\'s interval" - unstable, wants to resolve',
    songReference: 'The Simpsons theme (The-Simp)',
    songArtist: 'Danny Elfman',
    difficulty: 'hard'
  },
  P5: {
    semitones: 7,
    name: 'Perfect 5th',
    shortName: 'P5',
    quality: 'perfect',
    description: 'Strong, powerful - the foundation of power chords',
    songReference: 'Star Wars main theme (first two notes)',
    songArtist: 'John Williams',
    difficulty: 'easy'
  },
  m6: {
    semitones: 8,
    name: 'Minor 6th',
    shortName: 'm6',
    quality: 'consonant',
    description: 'Bittersweet, emotional quality',
    songReference: 'The Entertainer (opening)',
    songArtist: 'Scott Joplin',
    difficulty: 'medium'
  },
  M6: {
    semitones: 9,
    name: 'Major 6th',
    shortName: 'M6',
    quality: 'consonant',
    description: 'Bright, wide - romantic feel',
    songReference: 'My Bonnie Lies Over the Ocean (My-Bon)',
    songArtist: 'Traditional',
    difficulty: 'medium'
  },
  m7: {
    semitones: 10,
    name: 'Minor 7th',
    shortName: 'm7',
    quality: 'mild',
    description: 'Bluesy, jazzy - defines dominant 7th sound',
    songReference: 'Somewhere from West Side Story (There\'s-a)',
    songArtist: 'Leonard Bernstein',
    difficulty: 'medium'
  },
  M7: {
    semitones: 11,
    name: 'Major 7th',
    shortName: 'M7',
    quality: 'dissonant',
    description: 'Almost an octave - dreamy but tense',
    songReference: 'Take On Me (Take-on)',
    songArtist: 'a-ha',
    difficulty: 'hard'
  },
  P8: {
    semitones: 12,
    name: 'Octave',
    shortName: 'P8',
    quality: 'perfect',
    description: 'Same note, higher - complete and resolved',
    songReference: 'Somewhere Over the Rainbow (Some-where)',
    songArtist: 'Harold Arlen',
    difficulty: 'easy'
  }
};

// Interval categories for difficulty filtering
export const INTERVAL_DIFFICULTIES = {
  easy: ['P4', 'P5', 'P8'],
  medium: ['m3', 'M3', 'm6', 'M6', 'm7'],
  hard: ['m2', 'M2', 'TT', 'M7']
};

// Get intervals by difficulty level (cumulative)
export function getIntervalsByDifficulty(difficulty) {
  const allIntervals = [];

  if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard') {
    allIntervals.push(...INTERVAL_DIFFICULTIES.easy);
  }
  if (difficulty === 'medium' || difficulty === 'hard') {
    allIntervals.push(...INTERVAL_DIFFICULTIES.medium);
  }
  if (difficulty === 'hard') {
    allIntervals.push(...INTERVAL_DIFFICULTIES.hard);
  }

  return allIntervals;
}

// Get interval options for dropdown/selector
export function getIntervalOptions() {
  return Object.entries(INTERVALS).map(([key, interval]) => ({
    value: key,
    label: interval.name,
    shortName: interval.shortName,
    semitones: interval.semitones
  }));
}

// Get interval by semitones
export function getIntervalBySemitones(semitones) {
  const normalizedSemitones = semitones % 12;
  return Object.entries(INTERVALS).find(
    ([, interval]) => interval.semitones === normalizedSemitones
  );
}

// Chord quality definitions for ear training
export const CHORD_QUALITIES = {
  major: {
    name: 'Major',
    quality: 'bright',
    description: 'Happy, stable, resolved',
    intervals: [0, 4, 7],
    difficulty: 'easy'
  },
  minor: {
    name: 'Minor',
    quality: 'dark',
    description: 'Sad, melancholic, emotional',
    intervals: [0, 3, 7],
    difficulty: 'easy'
  },
  dom7: {
    name: 'Dominant 7th',
    quality: 'tense',
    description: 'Bluesy tension, wants to resolve',
    intervals: [0, 4, 7, 10],
    difficulty: 'medium'
  },
  maj7: {
    name: 'Major 7th',
    quality: 'smooth',
    description: 'Jazzy, sophisticated, dreamy',
    intervals: [0, 4, 7, 11],
    difficulty: 'medium'
  },
  min7: {
    name: 'Minor 7th',
    quality: 'mellow',
    description: 'Smooth, soulful, relaxed',
    intervals: [0, 3, 7, 10],
    difficulty: 'medium'
  },
  diminished: {
    name: 'Diminished',
    quality: 'unstable',
    description: 'Very tense, dramatic, mysterious',
    intervals: [0, 3, 6],
    difficulty: 'hard'
  },
  augmented: {
    name: 'Augmented',
    quality: 'floating',
    description: 'Unsettled, dreamlike, unresolved',
    intervals: [0, 4, 8],
    difficulty: 'hard'
  },
  sus2: {
    name: 'Suspended 2nd',
    quality: 'open',
    description: 'Airy, neither major nor minor',
    intervals: [0, 2, 7],
    difficulty: 'hard'
  },
  sus4: {
    name: 'Suspended 4th',
    quality: 'suspended',
    description: 'Anticipation, wants to resolve to major',
    intervals: [0, 5, 7],
    difficulty: 'hard'
  }
};

// Chord quality categories for difficulty filtering
export const CHORD_QUALITY_DIFFICULTIES = {
  easy: ['major', 'minor'],
  medium: ['dom7', 'maj7', 'min7'],
  hard: ['diminished', 'augmented', 'sus2', 'sus4']
};

// Get chord qualities by difficulty level (cumulative)
export function getChordQualitiesByDifficulty(difficulty) {
  const qualities = [];

  if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard') {
    qualities.push(...CHORD_QUALITY_DIFFICULTIES.easy);
  }
  if (difficulty === 'medium' || difficulty === 'hard') {
    qualities.push(...CHORD_QUALITY_DIFFICULTIES.medium);
  }
  if (difficulty === 'hard') {
    qualities.push(...CHORD_QUALITY_DIFFICULTIES.hard);
  }

  return qualities;
}
