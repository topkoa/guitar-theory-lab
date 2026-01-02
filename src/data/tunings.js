// Guitar and Bass tuning presets
// Each tuning is an array of notes from low to high

export const TUNINGS = {
  // === 6-String Guitar ===
  standard: {
    name: 'Guitar - Standard',
    notes: ['E', 'A', 'D', 'G', 'B', 'E'],
    description: 'Standard EADGBE tuning',
    instrument: 'guitar'
  },
  dropD: {
    name: 'Guitar - Drop D',
    notes: ['D', 'A', 'D', 'G', 'B', 'E'],
    description: 'Low E dropped to D',
    instrument: 'guitar'
  },
  halfStepDown: {
    name: 'Guitar - Half Step Down',
    notes: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
    description: 'All strings down 1 semitone',
    instrument: 'guitar'
  },
  dStandard: {
    name: 'Guitar - D Standard',
    notes: ['D', 'G', 'C', 'F', 'A', 'D'],
    description: 'All strings down 1 whole step',
    instrument: 'guitar'
  },
  openG: {
    name: 'Guitar - Open G',
    notes: ['D', 'G', 'D', 'G', 'B', 'D'],
    description: 'Strumming open strings plays G major',
    instrument: 'guitar'
  },
  openD: {
    name: 'Guitar - Open D',
    notes: ['D', 'A', 'D', 'F#', 'A', 'D'],
    description: 'Strumming open strings plays D major',
    instrument: 'guitar'
  },
  openE: {
    name: 'Guitar - Open E',
    notes: ['E', 'B', 'E', 'G#', 'B', 'E'],
    description: 'Strumming open strings plays E major',
    instrument: 'guitar'
  },
  openA: {
    name: 'Guitar - Open A',
    notes: ['E', 'A', 'E', 'A', 'C#', 'E'],
    description: 'Strumming open strings plays A major',
    instrument: 'guitar'
  },
  dadgad: {
    name: 'Guitar - DADGAD',
    notes: ['D', 'A', 'D', 'G', 'A', 'D'],
    description: 'Celtic/folk tuning, Dsus4 chord',
    instrument: 'guitar'
  },
  dropC: {
    name: 'Guitar - Drop C',
    notes: ['C', 'G', 'C', 'F', 'A', 'D'],
    description: 'Drop D tuned down a whole step',
    instrument: 'guitar'
  },

  // === 4-String Bass ===
  bass4Standard: {
    name: 'Bass 4 - Standard',
    notes: ['E', 'A', 'D', 'G'],
    description: 'Standard 4-string bass EADG',
    instrument: 'bass'
  },
  bass4DropD: {
    name: 'Bass 4 - Drop D',
    notes: ['D', 'A', 'D', 'G'],
    description: '4-string bass with low D',
    instrument: 'bass'
  },
  bass4DStandard: {
    name: 'Bass 4 - D Standard',
    notes: ['D', 'G', 'C', 'F'],
    description: '4-string bass down 1 whole step',
    instrument: 'bass'
  },
  bass4HalfStep: {
    name: 'Bass 4 - Half Step Down',
    notes: ['D#', 'G#', 'C#', 'F#'],
    description: '4-string bass down 1 semitone',
    instrument: 'bass'
  },

  // === 5-String Bass ===
  bass5Standard: {
    name: 'Bass 5 - Standard (Low B)',
    notes: ['B', 'E', 'A', 'D', 'G'],
    description: '5-string bass with low B',
    instrument: 'bass'
  },
  bass5HighC: {
    name: 'Bass 5 - High C',
    notes: ['E', 'A', 'D', 'G', 'C'],
    description: '5-string bass with high C',
    instrument: 'bass'
  },
  bass5DropA: {
    name: 'Bass 5 - Drop A',
    notes: ['A', 'E', 'A', 'D', 'G'],
    description: '5-string bass with drop A',
    instrument: 'bass'
  },

  // === 6-String Bass ===
  bass6Standard: {
    name: 'Bass 6 - Standard',
    notes: ['B', 'E', 'A', 'D', 'G', 'C'],
    description: '6-string bass B-E-A-D-G-C',
    instrument: 'bass'
  },
  bass6DropA: {
    name: 'Bass 6 - Drop A',
    notes: ['A', 'E', 'A', 'D', 'G', 'C'],
    description: '6-string bass with drop A',
    instrument: 'bass'
  }
};

export const DEFAULT_TUNING = 'standard';

// Get tuning options for selector
export function getTuningOptions() {
  return Object.entries(TUNINGS).map(([key, tuning]) => ({
    value: key,
    label: tuning.name,
    description: tuning.description
  }));
}
