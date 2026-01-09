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

// ============================================================================
// TRIAD VOICINGS - Compact 3-note voicings for different string sets
// Great for comping, arpeggios, and learning chord tones across the neck
// ============================================================================

export const TRIAD_VOICINGS = {
  major: [
    // Top 3 strings (G-B-e) - Root position and inversions
    {
      id: 'major_triad_top3_root',
      name: 'Major Triad (High) - Root',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: 0 },     // 3rd
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    {
      id: 'major_triad_top3_1st',
      name: 'Major Triad (High) - 1st Inv',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: -1 },    // 5th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: 0 }      // 3rd
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    {
      id: 'major_triad_top3_2nd',
      name: 'Major Triad (High) - 2nd Inv',
      rootString: 5,           // Root on high e string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: -1 },    // 3rd
        { string: 4, fret: -1 },    // 5th
        { string: 5, fret: 0 }      // Root
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    // Middle 3 strings (D-G-B) - Root position and inversions
    {
      id: 'major_triad_mid3_root',
      name: 'Major Triad (Mid) - Root',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 0 },     // 3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    {
      id: 'major_triad_mid3_1st',
      name: 'Major Triad (Mid) - 1st Inv',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -2 },    // 5th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: 0 },     // 3rd
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    {
      id: 'major_triad_mid3_2nd',
      name: 'Major Triad (Mid) - 2nd Inv',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -2 },    // 3rd
        { string: 3, fret: -2 },    // 5th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    // Low-Mid strings (A-D-G) - Root position and inversions
    {
      id: 'major_triad_low3_root',
      name: 'Major Triad (Low-Mid) - Root',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 0 },     // 3rd
        { string: 3, fret: 0 },     // 5th
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'intermediate'
    },
    {
      id: 'major_triad_low3_1st',
      name: 'Major Triad (Low-Mid) - 1st Inv',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: -2 },    // 5th
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 0 },     // 3rd
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'intermediate'
    },
    {
      id: 'major_triad_low3_2nd',
      name: 'Major Triad (Low-Mid) - 2nd Inv',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: -3 },    // 3rd
        { string: 2, fret: -2 },    // 5th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'intermediate'
    }
  ],

  minor: [
    // Top 3 strings (G-B-e) - Root position and inversions
    {
      id: 'minor_triad_top3_root',
      name: 'Minor Triad (High) - Root',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: -1 },    // b3rd
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    {
      id: 'minor_triad_top3_1st',
      name: 'Minor Triad (High) - 1st Inv',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // 5th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: 0 }      // b3rd
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    {
      id: 'minor_triad_top3_2nd',
      name: 'Minor Triad (High) - 2nd Inv',
      rootString: 5,           // Root on high e string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: -2 },    // b3rd
        { string: 4, fret: -1 },    // 5th
        { string: 5, fret: 0 }      // Root
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    // Middle 3 strings (D-G-B)
    {
      id: 'minor_triad_mid3_root',
      name: 'Minor Triad (Mid) - Root',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: -1 },    // b3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    {
      id: 'minor_triad_mid3_1st',
      name: 'Minor Triad (Mid) - 1st Inv',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -2 },    // 5th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: -1 },    // b3rd
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    {
      id: 'minor_triad_mid3_2nd',
      name: 'Minor Triad (Mid) - 2nd Inv',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -1 },    // b3rd
        { string: 3, fret: -2 },    // 5th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'beginner'
    },
    // Low-Mid strings (A-D-G)
    {
      id: 'minor_triad_low3_root',
      name: 'Minor Triad (Low-Mid) - Root',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: -1 },    // b3rd
        { string: 3, fret: 0 },     // 5th
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'intermediate'
    },
    {
      id: 'minor_triad_low3_1st',
      name: 'Minor Triad (Low-Mid) - 1st Inv',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: -2 },    // 5th
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: -1 },    // b3rd
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'intermediate'
    },
    {
      id: 'minor_triad_low3_2nd',
      name: 'Minor Triad (Low-Mid) - 2nd Inv',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: -4 },    // b3rd
        { string: 2, fret: -2 },    // 5th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'intermediate'
    }
  ],

  dim: [
    // Top 3 strings (G-B-e)
    {
      id: 'dim_triad_top3_root',
      name: 'Dim Triad (High) - Root',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: -1 },    // b3rd
        { string: 5, fret: -1 }     // b5th
      ],
      category: 'triad',
      difficulty: 'intermediate'
    },
    {
      id: 'dim_triad_top3_1st',
      name: 'Dim Triad (High) - 1st Inv',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // b5th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: -1 }     // b3rd
      ],
      category: 'triad',
      difficulty: 'intermediate'
    },
    // Middle 3 strings (D-G-B)
    {
      id: 'dim_triad_mid3_root',
      name: 'Dim Triad (Mid) - Root',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: -1 },    // b3rd
        { string: 4, fret: -1 },    // b5th
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'intermediate'
    }
  ],

  aug: [
    // Top 3 strings (G-B-e)
    {
      id: 'aug_triad_top3_root',
      name: 'Aug Triad (High) - Root',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: 0 },     // 3rd
        { string: 5, fret: 1 }      // #5th
      ],
      category: 'triad',
      difficulty: 'intermediate'
    },
    {
      id: 'aug_triad_top3_1st',
      name: 'Aug Triad (High) - 1st Inv',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // #5th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: 0 }      // 3rd
      ],
      category: 'triad',
      difficulty: 'intermediate'
    },
    // Middle 3 strings (D-G-B)
    {
      id: 'aug_triad_mid3_root',
      name: 'Aug Triad (Mid) - Root',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 0 },     // 3rd
        { string: 4, fret: 1 },     // #5th
        { string: 5, fret: null }
      ],
      category: 'triad',
      difficulty: 'intermediate'
    }
  ]
};

// ============================================================================
// SHELL VOICINGS - Jazz comping voicings with Root, 3rd, and 7th
// Essential for jazz guitar - minimum notes for chord quality
// ============================================================================

export const SHELL_VOICINGS = {
  dom7: [
    // Root on 6th string (low E)
    {
      id: 'dom7_shell_e_r37',
      name: 'Dom7 Shell (E) R-3-7',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 1 },     // 3rd
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    {
      id: 'dom7_shell_e_r73',
      name: 'Dom7 Shell (E) R-7-3',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b7th
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    // Root on 5th string (A)
    {
      id: 'dom7_shell_a_r37',
      name: 'Dom7 Shell (A) R-3-7',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 0 },     // b7th
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    {
      id: 'dom7_shell_a_r73',
      name: 'Dom7 Shell (A) R-7-3',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 1 },     // 3rd
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    }
  ],

  maj7: [
    // Root on 6th string (low E)
    {
      id: 'maj7_shell_e_r37',
      name: 'Maj7 Shell (E) R-3-7',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 1 },     // 3rd
        { string: 3, fret: 1 },     // 7th
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    {
      id: 'maj7_shell_e_r73',
      name: 'Maj7 Shell (E) R-7-3',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 1 },     // 7th
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    // Root on 5th string (A)
    {
      id: 'maj7_shell_a_r37',
      name: 'Maj7 Shell (A) R-3-7',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 1 },     // 7th
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    {
      id: 'maj7_shell_a_r73',
      name: 'Maj7 Shell (A) R-7-3',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 1 },     // 7th
        { string: 4, fret: 2 },     // 3rd
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    }
  ],

  min7: [
    // Root on 6th string (low E)
    {
      id: 'min7_shell_e_r37',
      name: 'Min7 Shell (E) R-b3-7',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b3rd
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    {
      id: 'min7_shell_e_r73',
      name: 'Min7 Shell (E) R-7-b3',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b7th
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    // Root on 5th string (A)
    {
      id: 'min7_shell_a_r37',
      name: 'Min7 Shell (A) R-b3-7',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: 0 },     // b7th
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    {
      id: 'min7_shell_a_r73',
      name: 'Min7 Shell (A) R-7-b3',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 1 },     // b3rd
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    }
  ],

  min7b5: [
    // Root on 6th string (low E)
    {
      id: 'min7b5_shell_e_r37',
      name: 'Min7b5 Shell (E) R-b3-7',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b3rd
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    // Root on 5th string (A)
    {
      id: 'min7b5_shell_a_r37',
      name: 'Min7b5 Shell (A) R-b3-7',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: 0 },     // b7th
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    }
  ],

  dim7: [
    // Root on 6th string (low E)
    {
      id: 'dim7_shell_e_r37',
      name: 'Dim7 Shell (E) R-b3-bb7',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b3rd
        { string: 3, fret: -1 },    // bb7th (dim 7th)
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    },
    // Root on 5th string (A)
    {
      id: 'dim7_shell_a_r37',
      name: 'Dim7 Shell (A) R-b3-bb7',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: -1 },    // bb7th
        { string: 5, fret: null }
      ],
      category: 'shell',
      difficulty: 'intermediate'
    }
  ]
};

// ============================================================================
// DROP 2 VOICINGS - Jazz voicings with the 2nd highest note dropped an octave
// Standard jazz guitar voicings for smooth voice leading
// ============================================================================

export const DROP2_VOICINGS = {
  maj7: [
    // Top 4 strings - Root on different strings
    {
      id: 'maj7_drop2_top4_r4',
      name: 'Maj7 Drop 2 (Root on 4th)',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 1 },     // 7th
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'maj7_drop2_top4_r3',
      name: 'Maj7 Drop 2 (Root on 3rd)',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -1 },    // 7th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: 0 },     // 3rd
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'maj7_drop2_top4_r2',
      name: 'Maj7 Drop 2 (Root on 2nd)',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -1 },    // 5th
        { string: 3, fret: -1 },    // 7th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: 0 }      // 3rd
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'maj7_drop2_top4_r1',
      name: 'Maj7 Drop 2 (Root on 1st)',
      rootString: 5,           // Root on high e string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -1 },    // 3rd
        { string: 3, fret: -1 },    // 5th
        { string: 4, fret: -1 },    // 7th
        { string: 5, fret: 0 }      // Root
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    // Middle 4 strings (A-D-G-B)
    {
      id: 'maj7_drop2_mid4_r5',
      name: 'Maj7 Drop 2 Mid (Root on 5th)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 1 },     // 3rd
        { string: 3, fret: 1 },     // 7th
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: null }
      ],
      category: 'drop2',
      difficulty: 'advanced'
    }
  ],

  dom7: [
    // Top 4 strings
    {
      id: 'dom7_drop2_top4_r4',
      name: 'Dom7 Drop 2 (Root on 4th)',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 0 },     // b7th
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'dom7_drop2_top4_r3',
      name: 'Dom7 Drop 2 (Root on 3rd)',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -2 },    // b7th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: 0 },     // 3rd
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'dom7_drop2_top4_r2',
      name: 'Dom7 Drop 2 (Root on 2nd)',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -1 },    // 5th
        { string: 3, fret: -2 },    // b7th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: 0 }      // 3rd
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'dom7_drop2_top4_r1',
      name: 'Dom7 Drop 2 (Root on 1st)',
      rootString: 5,           // Root on high e string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -1 },    // 3rd
        { string: 3, fret: -1 },    // 5th
        { string: 4, fret: -2 },    // b7th
        { string: 5, fret: 0 }      // Root
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    // Middle 4 strings
    {
      id: 'dom7_drop2_mid4_r5',
      name: 'Dom7 Drop 2 Mid (Root on 5th)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 1 },     // 3rd
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: null }
      ],
      category: 'drop2',
      difficulty: 'advanced'
    }
  ],

  min7: [
    // Top 4 strings
    {
      id: 'min7_drop2_top4_r4',
      name: 'Min7 Drop 2 (Root on 4th)',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: 0 },     // b7th
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'min7_drop2_top4_r3',
      name: 'Min7 Drop 2 (Root on 3rd)',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -2 },    // b7th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: -1 },    // b3rd
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'min7_drop2_top4_r2',
      name: 'Min7 Drop 2 (Root on 2nd)',
      rootString: 4,           // Root on B string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -1 },    // 5th
        { string: 3, fret: -2 },    // b7th
        { string: 4, fret: 0 },     // Root
        { string: 5, fret: -1 }     // b3rd
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'min7_drop2_top4_r1',
      name: 'Min7 Drop 2 (Root on 1st)',
      rootString: 5,           // Root on high e string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -2 },    // b3rd
        { string: 3, fret: -1 },    // 5th
        { string: 4, fret: -2 },    // b7th
        { string: 5, fret: 0 }      // Root
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    // Middle 4 strings
    {
      id: 'min7_drop2_mid4_r5',
      name: 'Min7 Drop 2 Mid (Root on 5th)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 0 },     // b3rd
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: null }
      ],
      category: 'drop2',
      difficulty: 'advanced'
    }
  ],

  min7b5: [
    // Top 4 strings
    {
      id: 'min7b5_drop2_top4_r4',
      name: 'Min7b5 Drop 2 (Root on 4th)',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: 0 },     // b7th
        { string: 5, fret: -1 }     // b5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'min7b5_drop2_top4_r3',
      name: 'Min7b5 Drop 2 (Root on 3rd)',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -2 },    // b7th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: -1 },    // b3rd
        { string: 5, fret: -1 }     // b5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    }
  ],

  dim7: [
    // Top 4 strings
    {
      id: 'dim7_drop2_top4_r4',
      name: 'Dim7 Drop 2 (Root on 4th)',
      rootString: 2,           // Root on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // Root
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: -1 },    // bb7th
        { string: 5, fret: -1 }     // b5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    },
    {
      id: 'dim7_drop2_top4_r3',
      name: 'Dim7 Drop 2 (Root on 3rd)',
      rootString: 3,           // Root on G string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: -3 },    // bb7th
        { string: 3, fret: 0 },     // Root
        { string: 4, fret: -1 },    // b3rd
        { string: 5, fret: -1 }     // b5th
      ],
      category: 'drop2',
      difficulty: 'advanced'
    }
  ]
};

// ============================================================================
// SPREAD VOICINGS - Wider voicings across the neck for fuller sound
// Good for solo guitar and arrangement work
// ============================================================================

export const SPREAD_VOICINGS = {
  major: [
    {
      id: 'major_spread_e_wide',
      name: 'Major Spread (E string root)',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: null },
        { string: 4, fret: 1 },     // 3rd
        { string: 5, fret: 0 }      // Root octave
      ],
      category: 'spread',
      difficulty: 'intermediate'
    },
    {
      id: 'major_spread_a_wide',
      name: 'Major Spread (A string root)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 2 },     // 5th
        { string: 4, fret: 2 },     // Root octave
        { string: 5, fret: 1 }      // 3rd
      ],
      category: 'spread',
      difficulty: 'intermediate'
    }
  ],

  minor: [
    {
      id: 'minor_spread_e_wide',
      name: 'Minor Spread (E string root)',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: null },
        { string: 4, fret: 0 },     // b3rd
        { string: 5, fret: 0 }      // Root octave
      ],
      category: 'spread',
      difficulty: 'intermediate'
    },
    {
      id: 'minor_spread_a_wide',
      name: 'Minor Spread (A string root)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 2 },     // 5th
        { string: 4, fret: 2 },     // Root octave
        { string: 5, fret: 0 }      // b3rd
      ],
      category: 'spread',
      difficulty: 'intermediate'
    }
  ],

  dom7: [
    {
      id: 'dom7_spread_e_wide',
      name: 'Dom7 Spread (E string root)',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b7th
        { string: 3, fret: null },
        { string: 4, fret: 1 },     // 3rd
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'spread',
      difficulty: 'intermediate'
    },
    {
      id: 'dom7_spread_a_wide',
      name: 'Dom7 Spread (A string root)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 2 },     // Root octave
        { string: 5, fret: 1 }      // 3rd
      ],
      category: 'spread',
      difficulty: 'intermediate'
    }
  ],

  maj7: [
    {
      id: 'maj7_spread_e_wide',
      name: 'Maj7 Spread (E string root)',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 1 },     // 7th
        { string: 3, fret: null },
        { string: 4, fret: 1 },     // 3rd
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'spread',
      difficulty: 'intermediate'
    },
    {
      id: 'maj7_spread_a_wide',
      name: 'Maj7 Spread (A string root)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 1 },     // 7th
        { string: 4, fret: 2 },     // Root octave
        { string: 5, fret: 1 }      // 3rd
      ],
      category: 'spread',
      difficulty: 'intermediate'
    }
  ],

  min7: [
    {
      id: 'min7_spread_e_wide',
      name: 'Min7 Spread (E string root)',
      rootString: 0,           // Root on low E string
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b7th
        { string: 3, fret: null },
        { string: 4, fret: 0 },     // b3rd
        { string: 5, fret: 0 }      // 5th
      ],
      category: 'spread',
      difficulty: 'intermediate'
    },
    {
      id: 'min7_spread_a_wide',
      name: 'Min7 Spread (A string root)',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: null },
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 2 },     // Root octave
        { string: 5, fret: 0 }      // b3rd
      ],
      category: 'spread',
      difficulty: 'intermediate'
    }
  ]
};

// ============================================================================
// PARTIAL VOICINGS - Common partial chord shapes (3-4 notes)
// Useful for rhythm guitar, partial barres, and easier alternatives
// ============================================================================

export const PARTIAL_VOICINGS = {
  major: [
    // High 4 strings only - easy barre alternatives
    {
      id: 'major_partial_high4_e',
      name: 'Major High 4 (E-shape)',
      rootString: 0,           // Conceptual root on E
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 2 },     // Root octave
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 0 }      // Root
      ],
      barreInfo: { fretOffset: 0, fromString: 4, toString: 5 },
      category: 'partial',
      difficulty: 'beginner'
    },
    {
      id: 'major_partial_high4_a',
      name: 'Major High 4 (A-shape)',
      rootString: 1,           // Root on A
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 2 },     // 3rd
        { string: 3, fret: 2 },     // Root
        { string: 4, fret: 2 },     // 5th
        { string: 5, fret: 0 }      // Root octave
      ],
      barreInfo: { fretOffset: 2, fromString: 2, toString: 4 },
      category: 'partial',
      difficulty: 'intermediate'
    },
    // Interior strings (A-D-G-B) - good for mid-range comping
    {
      id: 'major_partial_mid4',
      name: 'Major Mid 4 Strings',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: 2 },     // Root
        { string: 4, fret: 2 },     // 3rd
        { string: 5, fret: null }
      ],
      barreInfo: { fretOffset: 2, fromString: 2, toString: 4 },
      category: 'partial',
      difficulty: 'intermediate'
    }
  ],

  minor: [
    // High 4 strings only
    {
      id: 'minor_partial_high4_e',
      name: 'Minor High 4 (Em-shape)',
      rootString: 0,           // Conceptual root on E
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 2 },     // Root octave
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 0 }      // Root
      ],
      barreInfo: { fretOffset: 0, fromString: 3, toString: 5 },
      category: 'partial',
      difficulty: 'beginner'
    },
    {
      id: 'minor_partial_high4_a',
      name: 'Minor High 4 (Am-shape)',
      rootString: 1,           // Root on A
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 2 },     // b3rd
        { string: 3, fret: 2 },     // Root
        { string: 4, fret: 1 },     // 5th
        { string: 5, fret: 0 }      // Root octave
      ],
      category: 'partial',
      difficulty: 'intermediate'
    },
    // Mid 4 strings
    {
      id: 'minor_partial_mid4',
      name: 'Minor Mid 4 Strings',
      rootString: 1,           // Root on A string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: 0 },     // Root
        { string: 2, fret: 2 },     // 5th
        { string: 3, fret: 2 },     // Root
        { string: 4, fret: 1 },     // b3rd
        { string: 5, fret: null }
      ],
      category: 'partial',
      difficulty: 'intermediate'
    }
  ],

  dom7: [
    // High 4 strings
    {
      id: 'dom7_partial_high4_e',
      name: 'Dom7 High 4 (E7-shape)',
      rootString: 0,
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b7th
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 0 }      // Root
      ],
      barreInfo: { fretOffset: 0, fromString: 4, toString: 5 },
      category: 'partial',
      difficulty: 'beginner'
    },
    {
      id: 'dom7_partial_high4_a',
      name: 'Dom7 High 4 (A7-shape)',
      rootString: 1,
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 2 },     // 3rd
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: 2 },     // 5th
        { string: 5, fret: 0 }      // Root
      ],
      category: 'partial',
      difficulty: 'intermediate'
    },
    // Freddie Green style - 3 notes, roots/3rds/7ths
    {
      id: 'dom7_partial_freddie',
      name: 'Dom7 Freddie Green',
      rootString: 0,           // Root on low E
      basePositions: [
        { string: 0, fret: 0 },     // Root
        { string: 1, fret: null },
        { string: 2, fret: 1 },     // 3rd
        { string: 3, fret: 0 },     // b7th
        { string: 4, fret: null },
        { string: 5, fret: null }
      ],
      category: 'partial',
      difficulty: 'intermediate'
    }
  ],

  maj7: [
    // High 4 strings
    {
      id: 'maj7_partial_high4',
      name: 'Maj7 High 4 Strings',
      rootString: 0,
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 1 },     // 7th
        { string: 3, fret: 1 },     // 3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 0 }      // Root
      ],
      barreInfo: { fretOffset: 0, fromString: 4, toString: 5 },
      category: 'partial',
      difficulty: 'intermediate'
    },
    // Rootless voicing - common in jazz
    {
      id: 'maj7_partial_rootless',
      name: 'Maj7 Rootless (3-5-7)',
      rootString: 2,           // 3rd on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // 3rd
        { string: 3, fret: 0 },     // 5th
        { string: 4, fret: 0 },     // 7th
        { string: 5, fret: null }
      ],
      category: 'partial',
      difficulty: 'advanced'
    }
  ],

  min7: [
    // High 4 strings
    {
      id: 'min7_partial_high4',
      name: 'Min7 High 4 Strings',
      rootString: 0,
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b7th
        { string: 3, fret: 0 },     // b3rd
        { string: 4, fret: 0 },     // 5th
        { string: 5, fret: 0 }      // Root
      ],
      barreInfo: { fretOffset: 0, fromString: 2, toString: 5 },
      category: 'partial',
      difficulty: 'intermediate'
    },
    // Rootless voicing
    {
      id: 'min7_partial_rootless',
      name: 'Min7 Rootless (b3-5-7)',
      rootString: 2,           // b3rd on D string
      basePositions: [
        { string: 0, fret: null },
        { string: 1, fret: null },
        { string: 2, fret: 0 },     // b3rd
        { string: 3, fret: 1 },     // 5th
        { string: 4, fret: 0 },     // b7th
        { string: 5, fret: null }
      ],
      category: 'partial',
      difficulty: 'advanced'
    }
  ]
};

// Standard tuning for reference
export const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];
