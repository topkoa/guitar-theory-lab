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
    }
  ]
};

// Standard tuning for reference
export const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];
