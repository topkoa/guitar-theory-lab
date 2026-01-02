/**
 * Web Audio API sound generators for metronome clicks
 * Each function creates and plays a sound using the provided AudioContext
 */

/**
 * Generate beep sound (sine wave oscillator)
 * @param {AudioContext} ctx - Web Audio context
 * @param {number} time - Scheduled play time
 * @param {number} accent - Accent strength 0.0-1.0
 * @param {boolean} isDownbeat - Whether this is the downbeat
 */
export function generateBeep(ctx, time, accent, isDownbeat) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Higher pitch for downbeat, adjust based on accent
  const baseFreq = isDownbeat ? 1000 : 800;
  osc.frequency.value = baseFreq * (1 + accent * 0.2);
  osc.type = 'sine';

  // Adjust volume based on accent strength
  const volume = 0.1 + (accent * 0.25);
  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

  osc.start(time);
  osc.stop(time + 0.05);
}

/**
 * Generate click sound (filtered noise burst)
 * @param {AudioContext} ctx - Web Audio context
 * @param {number} time - Scheduled play time
 * @param {number} accent - Accent strength 0.0-1.0
 * @param {boolean} isDownbeat - Whether this is the downbeat
 */
export function generateClick(ctx, time, accent, isDownbeat) {
  // Create a short noise buffer
  const bufferSize = ctx.sampleRate * 0.02; // 20ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Fill with white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = isDownbeat ? 2000 : 3000;

  const gain = ctx.createGain();

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  // Adjust volume based on accent
  const volume = 0.15 + (accent * 0.3);
  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

  noise.start(time);
  noise.stop(time + 0.02);
}

/**
 * Generate woodblock sound (combination of oscillators)
 * @param {AudioContext} ctx - Web Audio context
 * @param {number} time - Scheduled play time
 * @param {number} accent - Accent strength 0.0-1.0
 * @param {boolean} isDownbeat - Whether this is the downbeat
 */
export function generateWoodblock(ctx, time, accent, isDownbeat) {
  // Create multiple oscillators for a more complex tone
  const frequencies = isDownbeat ? [480, 720, 1100] : [600, 900, 1350];

  frequencies.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = freq;
    osc.type = 'square';

    // Volume decreases for higher partials
    const partialVolume = (0.2 / (index + 1)) * (0.5 + accent * 0.5);
    gain.gain.setValueAtTime(partialVolume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

    osc.start(time);
    osc.stop(time + 0.03);
  });
}

/**
 * Sound generator lookup
 */
export const SOUND_GENERATORS = {
  beep: generateBeep,
  click: generateClick,
  woodblock: generateWoodblock
};

/**
 * Play metronome sound
 * @param {AudioContext} ctx - Web Audio context
 * @param {string} soundType - Type of sound ('beep', 'click', 'woodblock')
 * @param {number} time - Scheduled play time
 * @param {number} accent - Accent strength 0.0-1.0
 * @param {boolean} isDownbeat - Whether this is the downbeat
 */
export function playMetronomeSound(ctx, soundType, time, accent, isDownbeat) {
  const generator = SOUND_GENERATORS[soundType];

  if (!generator) {
    console.warn(`Unknown sound type: ${soundType}, using beep`);
    generateBeep(ctx, time, accent, isDownbeat);
    return;
  }

  generator(ctx, time, accent, isDownbeat);
}
