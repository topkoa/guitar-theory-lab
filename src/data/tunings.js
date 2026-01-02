// Guitar tuning presets
// Each tuning is an array of 6 notes from low (6th string) to high (1st string)

export const TUNINGS = {
  standard: {
    name: 'Standard',
    notes: ['E', 'A', 'D', 'G', 'B', 'E'],
    description: 'Standard EADGBE tuning'
  },
  dropD: {
    name: 'Drop D',
    notes: ['D', 'A', 'D', 'G', 'B', 'E'],
    description: 'Low E dropped to D'
  },
  halfStepDown: {
    name: 'Half Step Down',
    notes: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
    description: 'All strings down 1 semitone'
  },
  dStandard: {
    name: 'D Standard',
    notes: ['D', 'G', 'C', 'F', 'A', 'D'],
    description: 'All strings down 1 whole step'
  },
  openG: {
    name: 'Open G',
    notes: ['D', 'G', 'D', 'G', 'B', 'D'],
    description: 'Strumming open strings plays G major'
  },
  openD: {
    name: 'Open D',
    notes: ['D', 'A', 'D', 'F#', 'A', 'D'],
    description: 'Strumming open strings plays D major'
  },
  openE: {
    name: 'Open E',
    notes: ['E', 'B', 'E', 'G#', 'B', 'E'],
    description: 'Strumming open strings plays E major'
  },
  openA: {
    name: 'Open A',
    notes: ['E', 'A', 'E', 'A', 'C#', 'E'],
    description: 'Strumming open strings plays A major'
  },
  dadgad: {
    name: 'DADGAD',
    notes: ['D', 'A', 'D', 'G', 'A', 'D'],
    description: 'Celtic/folk tuning, Dsus4 chord'
  },
  dropC: {
    name: 'Drop C',
    notes: ['C', 'G', 'C', 'F', 'A', 'D'],
    description: 'Drop D tuned down a whole step'
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
