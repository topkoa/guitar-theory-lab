// Chord voicing definitions
// Each voicing defines exact string/fret positions for a playable chord shape
// String indices: 0 = low E, 1 = A, 2 = D, 3 = G, 4 = B, 5 = high e
// Fret values: null = muted (don't play), 0 = open string, 1+ = fret number

// ============================================================================
// OPEN CHORD VOICINGS (Root-specific, for standard tuning)
// ============================================================================

export const OPEN_VOICINGS = {
  major: {
    'C': [
      {
        id: 'c_major_open',
        name: 'C Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 3 },     // A - 3rd fret (C)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'G': [
      {
        id: 'g_major_open',
        name: 'G Open',
        positions: [
          { string: 0, fret: 3 },     // Low E - 3rd fret (G)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 3 }      // e - 3rd fret (G)
        ],
        category: 'open',
        difficulty: 'beginner'
      },
      {
        id: 'g_major_open_alt',
        name: 'G Open (Alt)',
        positions: [
          { string: 0, fret: 3 },     // Low E - 3rd fret (G)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 3 },     // B - 3rd fret (D)
          { string: 5, fret: 3 }      // e - 3rd fret (G)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'D': [
      {
        id: 'd_major_open',
        name: 'D Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 3 },     // B - 3rd fret (D)
          { string: 5, fret: 2 }      // e - 2nd fret (F#)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'A': [
      {
        id: 'a_major_open',
        name: 'A Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 2 },     // B - 2nd fret (C#)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'E': [
      {
        id: 'e_major_open',
        name: 'E Open',
        positions: [
          { string: 0, fret: 0 },     // Low E - open (E)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 1 },     // G - 1st fret (G#)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'F': [
      {
        id: 'f_major_partial',
        name: 'F (Mini Barre)',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 3 },     // D - 3rd fret (F)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 1 }      // e - 1st fret (F)
        ],
        barreInfo: { fret: 1, fromString: 4, toString: 5 },
        category: 'partial_barre',
        difficulty: 'intermediate'
      }
    ]
  },

  minor: {
    'A': [
      {
        id: 'a_minor_open',
        name: 'Am Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'E': [
      {
        id: 'e_minor_open',
        name: 'Em Open',
        positions: [
          { string: 0, fret: 0 },     // Low E - open (E)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'D': [
      {
        id: 'd_minor_open',
        name: 'Dm Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 3 },     // B - 3rd fret (D)
          { string: 5, fret: 1 }      // e - 1st fret (F)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ]
  },

  dom7: {
    'E': [
      {
        id: 'e7_open',
        name: 'E7 Open',
        positions: [
          { string: 0, fret: 0 },     // Low E - open (E)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 1 },     // G - 1st fret (G#)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'A': [
      {
        id: 'a7_open',
        name: 'A7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 2 },     // B - 2nd fret (C#)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'D': [
      {
        id: 'd7_open',
        name: 'D7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 2 }      // e - 2nd fret (F#)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'G': [
      {
        id: 'g7_open',
        name: 'G7 Open',
        positions: [
          { string: 0, fret: 3 },     // Low E - 3rd fret (G)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 1 }      // e - 1st fret (F)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'C': [
      {
        id: 'c7_open',
        name: 'C7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 3 },     // A - 3rd fret (C)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 3 },     // G - 3rd fret (Bb)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ]
  },

  maj7: {
    'C': [
      {
        id: 'cmaj7_open',
        name: 'Cmaj7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 3 },     // A - 3rd fret (C)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'G': [
      {
        id: 'gmaj7_open',
        name: 'Gmaj7 Open',
        positions: [
          { string: 0, fret: 3 },     // Low E - 3rd fret (G)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 2 }      // e - 2nd fret (F#)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'F': [
      {
        id: 'fmaj7_open',
        name: 'Fmaj7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 3 },     // D - 3rd fret (F)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'D': [
      {
        id: 'dmaj7_open',
        name: 'Dmaj7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 2 },     // B - 2nd fret (C#)
          { string: 5, fret: 2 }      // e - 2nd fret (F#)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'A': [
      {
        id: 'amaj7_open',
        name: 'Amaj7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 1 },     // G - 1st fret (G#)
          { string: 4, fret: 2 },     // B - 2nd fret (C#)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ]
  },

  power: {
    'E': [
      {
        id: 'e5_open',
        name: 'E5 Open',
        positions: [
          { string: 0, fret: 0 },     // Low E - open (E)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 2 },     // D - 2nd fret (E) - octave
          { string: 3, fret: null },  // G - muted
          { string: 4, fret: null },  // B - muted
          { string: 5, fret: null }   // e - muted
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'A': [
      {
        id: 'a5_open',
        name: 'A5 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 2 },     // G - 2nd fret (A) - octave
          { string: 4, fret: null },  // B - muted
          { string: 5, fret: null }   // e - muted
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'D': [
      {
        id: 'd5_open',
        name: 'D5 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 3 },     // B - 3rd fret (D) - octave
          { string: 5, fret: null }   // e - muted
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'G': [
      {
        id: 'g5_open',
        name: 'G5 Open',
        positions: [
          { string: 0, fret: 3 },     // Low E - 3rd fret (G)
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 0 },     // G - open (G) - octave
          { string: 4, fret: null },  // B - muted
          { string: 5, fret: null }   // e - muted
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'C': [
      {
        id: 'c5_open',
        name: 'C5 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 3 },     // A - 3rd fret (C)
          { string: 2, fret: null },  // D - muted
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: null },  // B - muted
          { string: 5, fret: null }   // e - muted
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ]
  },

  add9: {
    'C': [
      {
        id: 'cadd9_open',
        name: 'Cadd9 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 3 },     // A - 3rd fret (C)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 3 },     // B - 3rd fret (D)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'G': [
      {
        id: 'gadd9_open',
        name: 'Gadd9 Open',
        positions: [
          { string: 0, fret: 3 },     // Low E - 3rd fret (G)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 3 }      // e - 3rd fret (G)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'D': [
      {
        id: 'dadd9_open',
        name: 'Dadd9 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 3 },     // B - 3rd fret (D)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'A': [
      {
        id: 'aadd9_open',
        name: 'Aadd9 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'E': [
      {
        id: 'eadd9_open',
        name: 'Eadd9 Open',
        positions: [
          { string: 0, fret: 0 },     // Low E - open (E)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 1 },     // G - 1st fret (G#)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 2 }      // e - 2nd fret (F#)
        ],
        category: 'open',
        difficulty: 'intermediate'
      }
    ]
  },

  dom9: {
    'E': [
      {
        id: 'e9_open',
        name: 'E9 Open',
        positions: [
          { string: 0, fret: 0 },     // Low E - open (E)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 1 },     // G - 1st fret (G#)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 2 }      // e - 2nd fret (F#)
        ],
        category: 'open',
        difficulty: 'intermediate'
      }
    ],
    'A': [
      {
        id: 'a9_open',
        name: 'A9 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'G': [
      {
        id: 'g9_open',
        name: 'G9 Open',
        positions: [
          { string: 0, fret: 3 },     // Low E - 3rd fret (G)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 1 }      // e - 1st fret (F)
        ],
        category: 'open',
        difficulty: 'intermediate'
      }
    ]
  },

  maj9: {
    'C': [
      {
        id: 'cmaj9_open',
        name: 'Cmaj9 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 3 },     // A - 3rd fret (C)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E) - actually D would be 9
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'G': [
      {
        id: 'gmaj9_open',
        name: 'Gmaj9 Open',
        positions: [
          { string: 0, fret: 3 },     // Low E - 3rd fret (G)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 2 }      // e - 2nd fret (F#)
        ],
        category: 'open',
        difficulty: 'intermediate'
      }
    ],
    'F': [
      {
        id: 'fmaj9_open',
        name: 'Fmaj9 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 3 },     // D - 3rd fret (F)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ]
  },

  min9: {
    'A': [
      {
        id: 'am9_open',
        name: 'Am9 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'E': [
      {
        id: 'em9_open',
        name: 'Em9 Open',
        positions: [
          { string: 0, fret: 0 },     // Low E - open (E)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 2 }      // e - 2nd fret (F#)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'D': [
      {
        id: 'dm9_open',
        name: 'Dm9 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ]
  },

  min7: {
    'A': [
      {
        id: 'am7_open',
        name: 'Am7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: 0 },     // A - open (A)
          { string: 2, fret: 2 },     // D - 2nd fret (E)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'E': [
      {
        id: 'em7_open',
        name: 'Em7 Open',
        positions: [
          { string: 0, fret: 0 },     // Low E - open (E)
          { string: 1, fret: 2 },     // A - 2nd fret (B)
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 0 },     // G - open (G)
          { string: 4, fret: 0 },     // B - open (B)
          { string: 5, fret: 0 }      // e - open (E)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ],
    'D': [
      {
        id: 'dm7_open',
        name: 'Dm7 Open',
        positions: [
          { string: 0, fret: null },  // Low E - muted
          { string: 1, fret: null },  // A - muted
          { string: 2, fret: 0 },     // D - open (D)
          { string: 3, fret: 2 },     // G - 2nd fret (A)
          { string: 4, fret: 1 },     // B - 1st fret (C)
          { string: 5, fret: 1 }      // e - 1st fret (F)
        ],
        category: 'open',
        difficulty: 'beginner'
      }
    ]
  }
};

// ============================================================================
// MOVEABLE (BARRE) CHORD SHAPES
// These can be transposed to any root note by moving up/down the neck
// rootString = which string has the root note (for calculating position)
// basePosition = array represents the shape with frets relative to root fret
// ============================================================================

export const MOVEABLE_VOICINGS = {
  major: [
    {
      id: 'major_e_shape',
      name: 'E-Shape Barre',
      rootString: 0,           // Root is on low E string
      // Positions relative to root fret (root fret = 0)
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },
        { string: 2, fret: 2 },
        { string: 3, fret: 1 },
        { string: 4, fret: 0 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'major_a_shape',
      name: 'A-Shape Barre',
      rootString: 1,           // Root is on A string
      basePositions: [
        { string: 0, fret: null },  // Muted
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },
        { string: 3, fret: 2 },
        { string: 4, fret: 2 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'major_c_shape',
      name: 'C-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: -1 },    // One fret below root
        { string: 3, fret: -3 },
        { string: 4, fret: -2 },
        { string: 5, fret: -3 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'major_g_shape',
      name: 'G-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: -1 },
        { string: 2, fret: -3 },
        { string: 3, fret: -3 },
        { string: 4, fret: -3 },
        { string: 5, fret: 0 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'major_d_shape',
      name: 'D-Shape',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 2 },
        { string: 4, fret: 3 },
        { string: 5, fret: 2 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    }
  ],

  minor: [
    {
      id: 'minor_e_shape',
      name: 'Em-Shape Barre',
      rootString: 0,
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },
        { string: 2, fret: 2 },
        { string: 3, fret: 0 },
        { string: 4, fret: 0 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'minor_a_shape',
      name: 'Am-Shape Barre',
      rootString: 1,
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },
        { string: 3, fret: 2 },
        { string: 4, fret: 1 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'minor_c_shape',
      name: 'Cm-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: -1 },
        { string: 3, fret: -3 },
        { string: 4, fret: -3 },
        { string: 5, fret: -3 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'minor_g_shape',
      name: 'Gm-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: -1 },
        { string: 2, fret: -3 },
        { string: 3, fret: -3 },
        { string: 4, fret: -4 },
        { string: 5, fret: 0 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'minor_d_shape',
      name: 'Dm-Shape',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 2 },
        { string: 4, fret: 3 },
        { string: 5, fret: 1 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    }
  ],

  dom7: [
    {
      id: 'dom7_e_shape',
      name: 'E7-Shape Barre',
      rootString: 0,
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },
        { string: 2, fret: 0 },
        { string: 3, fret: 1 },
        { string: 4, fret: 0 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'dom7_a_shape',
      name: 'A7-Shape Barre',
      rootString: 1,
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },
        { string: 3, fret: 0 },
        { string: 4, fret: 2 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'dom7_c_shape',
      name: 'C7-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: -1 },
        { string: 3, fret: 0 },
        { string: 4, fret: -2 },
        { string: 5, fret: -3 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'dom7_g_shape',
      name: 'G7-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: -1 },
        { string: 2, fret: -3 },
        { string: 3, fret: -3 },
        { string: 4, fret: -3 },
        { string: 5, fret: -2 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'dom7_d_shape',
      name: 'D7-Shape',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 2 },
        { string: 4, fret: 1 },
        { string: 5, fret: 2 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    }
  ],

  min7: [
    {
      id: 'min7_e_shape',
      name: 'Em7-Shape Barre',
      rootString: 0,
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },
        { string: 2, fret: 0 },
        { string: 3, fret: 0 },
        { string: 4, fret: 0 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'min7_a_shape',
      name: 'Am7-Shape Barre',
      rootString: 1,
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },
        { string: 3, fret: 0 },
        { string: 4, fret: 1 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'min7_c_shape',
      name: 'Cm7-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: -1 },
        { string: 3, fret: -3 },
        { string: 4, fret: -3 },
        { string: 5, fret: -3 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'min7_g_shape',
      name: 'Gm7-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: -1 },
        { string: 2, fret: -3 },
        { string: 3, fret: -3 },
        { string: 4, fret: -4 },
        { string: 5, fret: -2 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'min7_d_shape',
      name: 'Dm7-Shape',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 2 },
        { string: 4, fret: 1 },
        { string: 5, fret: 1 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    }
  ],

  maj7: [
    {
      id: 'maj7_e_shape',
      name: 'Emaj7-Shape Barre',
      rootString: 0,
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },
        { string: 2, fret: 1 },
        { string: 3, fret: 1 },
        { string: 4, fret: 0 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'maj7_a_shape',
      name: 'Amaj7-Shape Barre',
      rootString: 1,
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },
        { string: 3, fret: 1 },
        { string: 4, fret: 2 },
        { string: 5, fret: 0 }
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'maj7_c_shape',
      name: 'Cmaj7-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: -1 },
        { string: 3, fret: -3 },
        { string: 4, fret: -3 },
        { string: 5, fret: -3 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'maj7_g_shape',
      name: 'Gmaj7-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: -1 },
        { string: 2, fret: -3 },
        { string: 3, fret: -3 },
        { string: 4, fret: -3 },
        { string: 5, fret: -1 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    },
    {
      id: 'maj7_d_shape',
      name: 'Dmaj7-Shape',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 2 },
        { string: 4, fret: 2 },
        { string: 5, fret: 2 }
      ],
      category: 'caged',
      difficulty: 'advanced'
    }
  ],

  power: [
    {
      id: 'power_e_shape',
      name: 'E5-Shape (2 string)',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },     // 5th
        { string: 2, fret: null },
        { string: 3, fret: null },
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'power',
      difficulty: 'beginner'
    },
    {
      id: 'power_e_shape_octave',
      name: 'E5-Shape (with octave)',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },     // 5th
        { string: 2, fret: 2 },     // Octave
        { string: 3, fret: null },
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'power',
      difficulty: 'beginner'
    },
    {
      id: 'power_a_shape',
      name: 'A5-Shape (2 string)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: null },
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'power',
      difficulty: 'beginner'
    },
    {
      id: 'power_a_shape_octave',
      name: 'A5-Shape (with octave)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: 2 },     // Octave
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'power',
      difficulty: 'beginner'
    },
    {
      id: 'power_d_shape',
      name: 'D5-Shape (2 string)',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 2 },     // 5th
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'power',
      difficulty: 'beginner'
    },
    {
      id: 'power_d_shape_octave',
      name: 'D5-Shape (with octave)',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 2 },     // 5th
        { string: 4, fret: 3 },     // Octave
        { string: 5, fret: null }
      ],
      category: 'power',
      difficulty: 'beginner'
    }
  ],

  add9: [
    {
      id: 'add9_e_shape',
      name: 'Eadd9-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },     // 5th
        { string: 2, fret: 2 },     // Root octave
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 2 }      // 9th
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 4 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'add9_a_shape',
      name: 'Aadd9-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: 2 },     // Root octave
        { string: 4, fret: 0 },     // 9th
        { string: 5, fret: 0 }      // 5th
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    }
  ],

  dom9: [
    {
      id: 'dom9_e_shape',
      name: 'E9-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },     // 5th
        { string: 2, fret: 0 },     // b7th
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 2 }      // 9th
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 4 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'dom9_a_shape',
      name: 'A9-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 0 },     // 9th
        { string: 5, fret: 0 }      // 5th
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'dom9_funk',
      name: '9 Funk Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root (moved to A)
        { string: 2, fret: 1 },     // 3rd
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 0 },     // 9th
        { string: 5, fret: null }
      ],
      category: 'jazz',
      difficulty: 'intermediate'
    }
  ],

  maj9: [
    {
      id: 'maj9_a_shape',
      name: 'Amaj9-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: 1 },     // 7th
        { string: 4, fret: 0 },     // 9th
        { string: 5, fret: 0 }      // 5th
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'maj9_e_shape',
      name: 'Emaj9-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },     // 5th
        { string: 2, fret: 1 },     // 7th
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 2 }      // 9th
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 4 },
      category: 'barre',
      difficulty: 'advanced'
    }
  ],

  min9: [
    {
      id: 'min9_e_shape',
      name: 'Em9-Shape',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: 2 },     // 5th
        { string: 2, fret: 0 },     // b7th
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 2 }      // 9th
      ],
      barreInfo: { fretOffset: 0, fromString: 0, toString: 4 },
      category: 'barre',
      difficulty: 'intermediate'
    },
    {
      id: 'min9_a_shape',
      name: 'Am9-Shape',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 0 },     // 9th
        { string: 5, fret: 0 }      // 5th
      ],
      barreInfo: { fretOffset: 0, fromString: 1, toString: 5 },
      category: 'barre',
      difficulty: 'intermediate'
    }
  ]
};

// Standard tuning for reference
export const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];
