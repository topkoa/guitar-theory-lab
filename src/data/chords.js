// Chord definitions with intervals (in semitones from root)

export const CHORDS = {
  major: {
    name: 'Major',
    intervals: [0, 4, 7],
    formula: '1-3-5',
    description: 'Happy, bright sound',
    theoryContext: {
      commonUses: 'The foundation of Western music. Used as the "home" chord (I) in pop, rock, country, and folk. Creates feelings of happiness and resolution.',
      tensionResolution: 'Stable and resolved. The chord everything else wants to come back to.',
      relatedChords: ['minor', 'sus4', 'maj7', 'add9'],
      typicalProgressions: ['I-IV-V (most common in rock/pop)', 'I-V-vi-IV (pop anthem progression)']
    }
  },
  minor: {
    name: 'Minor',
    intervals: [0, 3, 7],
    formula: '1-b3-5',
    description: 'Sad, dark sound',
    theoryContext: {
      commonUses: 'Essential for emotional depth. The vi chord in major keys, or the i chord in minor keys. Common in ballads, rock, R&B, and any music expressing sadness or introspection.',
      tensionResolution: 'Moderate tension with a melancholic quality. Stable in minor keys, creates contrast in major keys.',
      relatedChords: ['major', 'diminished', 'min7', 'min9'],
      typicalProgressions: ['i-iv-v (natural minor)', 'vi-IV-I-V (pop progression from minor perspective)']
    }
  },
  diminished: {
    name: 'Diminished',
    intervals: [0, 3, 6],
    formula: '1-b3-b5',
    description: 'Tense, unstable sound',
    theoryContext: {
      commonUses: 'A passing chord that creates drama. Common in classical, jazz, and musical theater. Often used as the vii° chord leading to the I chord.',
      tensionResolution: 'High tension that demands resolution. Naturally wants to resolve up a half-step to a major or minor chord.',
      relatedChords: ['dim7', 'min7b5', 'minor'],
      typicalProgressions: ['vii°-I (leading tone resolution)', 'Used as chromatic passing chord between IV and V']
    }
  },
  augmented: {
    name: 'Augmented',
    intervals: [0, 4, 8],
    formula: '1-3-#5',
    description: 'Bright, unsettled sound',
    theoryContext: {
      commonUses: 'Creates dreamlike, mysterious moments. Used in film scores, progressive rock, and jazz. Often appears in Beatles songs and classical music for dramatic effect.',
      tensionResolution: 'Unstable and floating. Can resolve to either major or minor, creating ambiguity. The raised 5th wants to continue rising.',
      relatedChords: ['major', 'dom7', 'maj7'],
      typicalProgressions: ['I-I+-vi (chromatic bass line)', 'V+-I (enhanced dominant resolution)']
    }
  },
  sus2: {
    name: 'Suspended 2nd',
    intervals: [0, 2, 7],
    formula: '1-2-5',
    description: 'Open, unresolved sound',
    theoryContext: {
      commonUses: 'Creates an open, airy feel. Popular in ambient, folk, indie, and worship music. The Police and U2 use sus2 chords extensively.',
      tensionResolution: 'Suspended between major and minor - neither happy nor sad. Can resolve to major or minor, or stand alone for an ambiguous mood.',
      relatedChords: ['major', 'sus4', 'add9'],
      typicalProgressions: ['Isus2-I (subtle resolution)', 'Often used as a color chord without resolution']
    }
  },
  sus4: {
    name: 'Suspended 4th',
    intervals: [0, 5, 7],
    formula: '1-4-5',
    description: 'Tension waiting to resolve',
    theoryContext: {
      commonUses: 'Classic rock and pop anticipation chord. Creates tension before resolving to major. Essential in songs like "Pinball Wizard" and countless worship songs.',
      tensionResolution: 'The 4th degree pulls down to the 3rd, creating anticipation. More urgent tension than sus2. Almost always resolves to major.',
      relatedChords: ['major', 'sus2', 'dom7sus4'],
      typicalProgressions: ['Isus4-I (classic resolution)', 'Vsus4-V-I (extended dominant resolution)']
    }
  },
  dom7: {
    name: 'Dominant 7th',
    intervals: [0, 4, 7, 10],
    formula: '1-3-5-b7',
    description: 'Blues/jazz essential',
    theoryContext: {
      commonUses: 'The backbone of blues, jazz, and rock. As the V7 chord, it creates the strongest pull back to the I chord. Every 12-bar blues uses dominant 7ths throughout.',
      tensionResolution: 'Strong tension from the tritone between the 3rd and b7th. This interval desperately wants to resolve, making V7-I the most powerful resolution in music.',
      relatedChords: ['major', 'maj7', 'dom9', 'min7'],
      typicalProgressions: ['V7-I (strongest resolution)', 'I7-IV7-V7 (12-bar blues)', 'ii-V7-I (jazz standard)']
    }
  },
  maj7: {
    name: 'Major 7th',
    intervals: [0, 4, 7, 11],
    formula: '1-3-5-7',
    description: 'Smooth, jazzy sound',
    theoryContext: {
      commonUses: 'The sophisticated "jazz" chord. Common as the I chord in jazz, R&B, neo-soul, and bossa nova. Adds warmth and complexity to any major chord.',
      tensionResolution: 'Stable but colorful. The major 7th adds a dreamy quality without creating urgency to resolve. Can function as a resting point.',
      relatedChords: ['major', 'dom7', 'maj9', 'add9'],
      typicalProgressions: ['Imaj7-IVmaj7 (smooth jazz vamp)', 'IVmaj7-V7-Imaj7 (jazz cadence)']
    }
  },
  min7: {
    name: 'Minor 7th',
    intervals: [0, 3, 7, 10],
    formula: '1-b3-5-b7',
    description: 'Mellow, soulful sound',
    theoryContext: {
      commonUses: 'The workhorse of jazz and soul. Functions as the ii chord in major keys (ii-V-I). Essential in R&B, neo-soul, and any music needing smooth, mellow color.',
      tensionResolution: 'Gentle tension that flows naturally to dominant chords. More relaxed than plain minor. Creates movement without urgency.',
      relatedChords: ['minor', 'dom7', 'min9', 'maj7'],
      typicalProgressions: ['ii7-V7-Imaj7 (the jazz progression)', 'i7-iv7 (minor groove)']
    }
  },
  dim7: {
    name: 'Diminished 7th',
    intervals: [0, 3, 6, 9],
    formula: '1-b3-b5-bb7',
    description: 'Symmetrical, mysterious',
    theoryContext: {
      commonUses: 'Dramatic tension in classical, jazz, and film scores. Symmetrical structure means it can resolve in four different directions. Common in silent film music and horror.',
      tensionResolution: 'Maximum tension. The fully diminished sound is unstable from every angle. Can resolve up or down by half-step to major or minor chords.',
      relatedChords: ['diminished', 'min7b5', 'dom7b9'],
      typicalProgressions: ['vii°7-I (dramatic resolution)', 'Used as pivot chord for modulation']
    }
  },
  min7b5: {
    name: 'Half-Diminished (m7b5)',
    intervals: [0, 3, 6, 10],
    formula: '1-b3-b5-b7',
    description: 'Jazz minor ii chord',
    theoryContext: {
      commonUses: 'Essential jazz chord. The ii chord in minor keys, setting up the V7 to i resolution. Also appears naturally as vii in major keys. Common in jazz standards and film noir.',
      tensionResolution: 'Dark tension that leads beautifully to dominant 7th chords. Less harsh than fully diminished. The "half" means it has a minor 7th instead of diminished 7th.',
      relatedChords: ['dim7', 'min7', 'dom7'],
      typicalProgressions: ['ii°7-V7-i (minor ii-V-i)', 'viiø7-I (in major keys)']
    }
  },
  add9: {
    name: 'Add 9',
    intervals: [0, 4, 7, 14],
    formula: '1-3-5-9',
    description: 'Major with added 9th',
    theoryContext: {
      commonUses: 'Adds sparkle to a basic major chord. Popular in pop, rock, and acoustic music. Oasis and many 90s bands loved this sound. More accessible than full 9th chords.',
      tensionResolution: 'Stable with added color. The 9th adds interest without changing the chord\'s function. No 7th means less jazz complexity.',
      relatedChords: ['major', 'maj9', 'sus2'],
      typicalProgressions: ['Can replace any major chord for added color', 'Iadd9-IVadd9 (shimmery progression)']
    }
  },
  power: {
    name: 'Power Chord (5)',
    intervals: [0, 7],
    formula: '1-5',
    description: 'Rock essential, no 3rd',
    theoryContext: {
      commonUses: 'The foundation of rock, metal, and punk. No 3rd means it\'s neither major nor minor - pure power. Works great with distortion because simpler intervals sound cleaner.',
      tensionResolution: 'Neutral and aggressive. Without the 3rd, there\'s no happy/sad quality - just raw energy. Can substitute for any major or minor chord.',
      relatedChords: ['major', 'minor', 'sus4'],
      typicalProgressions: ['I5-IV5-V5 (punk/rock)', 'i5-bVII5-bVI5 (metal)']
    }
  },
  dom9: {
    name: 'Dominant 9th',
    intervals: [0, 4, 7, 10, 14],
    formula: '1-3-5-b7-9',
    description: 'Funky, soulful',
    theoryContext: {
      commonUses: 'The funk and soul chord. James Brown, Prince, and Stevie Wonder built careers on this sound. Also essential in jazz as an extended V chord.',
      tensionResolution: 'Funky tension with the dominant pull. The 9th adds richness while the b7 maintains the drive to resolve. Can also groove without resolving in funk contexts.',
      relatedChords: ['dom7', 'min9', 'dom7sus4'],
      typicalProgressions: ['V9-I (jazz resolution)', 'I9-IV9 (funk vamp)']
    }
  },
  maj9: {
    name: 'Major 9th',
    intervals: [0, 4, 7, 11, 14],
    formula: '1-3-5-7-9',
    description: 'Lush, sophisticated',
    theoryContext: {
      commonUses: 'The ultimate "pretty" chord. Staple of neo-soul, jazz ballads, and sophisticated pop. D\'Angelo, Erykah Badu, and jazz pianists love this lush sound.',
      tensionResolution: 'Rich and stable. All the color of maj7 plus the 9th\'s shimmer. Functions as a luxurious tonic chord that doesn\'t need to go anywhere.',
      relatedChords: ['maj7', 'add9', 'min9'],
      typicalProgressions: ['Imaj9-IVmaj9 (neo-soul)', 'iim9-V9-Imaj9 (jazz ballad)']
    }
  },
  min9: {
    name: 'Minor 9th',
    intervals: [0, 3, 7, 10, 14],
    formula: '1-b3-5-b7-9',
    description: 'Smooth R&B/jazz',
    theoryContext: {
      commonUses: 'The smooth R&B and neo-soul sound. Perfect as the ii chord in jazz or as a tonic in R&B. Common in music by Sade, Maxwell, and contemporary jazz.',
      tensionResolution: 'Velvety tension. The minor quality plus the 9th creates sophisticated melancholy. Flows beautifully to dominant chords or can vamp on its own.',
      relatedChords: ['min7', 'maj9', 'dom9'],
      typicalProgressions: ['iim9-V9-Imaj9 (smooth jazz)', 'im9-IVmaj9 (R&B ballad)']
    }
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
