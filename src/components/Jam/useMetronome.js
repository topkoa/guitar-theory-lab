import { useRef, useCallback, useEffect } from 'react';
import { playMetronomeSound } from '../../utils/metronomeSounds';
import { calculateAccent } from '../../utils/accentPatterns';

// Web Audio API metronome for precise timing
export function useMetronome(bpm, onBeat, isPlaying, metronomeEnabled, effectiveSettings) {
  const audioContextRef = useRef(null);
  const nextBeatTimeRef = useRef(0);
  const timerIdRef = useRef(null);
  const beatCountRef = useRef(0);
  const beatInMeasureRef = useRef(0);

  // Initialize audio context
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Play click sound with accent
  const playClick = useCallback((time, beatInMeasure, accentStrength) => {
    if (!metronomeEnabled) return;

    const ctx = getAudioContext();
    const isDownbeat = beatInMeasure === 0;
    const soundType = effectiveSettings.metronomeSound.type;

    playMetronomeSound(ctx, soundType, time, accentStrength, isDownbeat);
  }, [getAudioContext, metronomeEnabled, effectiveSettings]);

  // Schedule beats ahead of time for accuracy
  const scheduler = useCallback(() => {
    const ctx = getAudioContext();
    const secondsPerBeat = 60.0 / bpm;
    const scheduleAheadTime = 0.1; // Schedule 100ms ahead
    const timeSignature = effectiveSettings.timeSignature;
    const subdivision = effectiveSettings.metronomeSound.subdivision;

    while (nextBeatTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      // Calculate accent strength for this beat
      const accentStrength = calculateAccent(
        effectiveSettings.accentPattern,
        beatInMeasureRef.current,
        timeSignature,
        {
          customAccents: effectiveSettings.customAccents,
          swingRatio: effectiveSettings.swingRatio
        }
      );

      // Play the main beat
      playClick(nextBeatTimeRef.current, beatInMeasureRef.current, accentStrength);

      // Schedule subdivisions if enabled
      if (subdivision === 'eighth') {
        // Play on the "and" of each beat
        const eighthTime = nextBeatTimeRef.current + (secondsPerBeat / 2);
        playClick(eighthTime, beatInMeasureRef.current, 0.2); // Quieter subdivision
      } else if (subdivision === 'triplet') {
        // Play two additional clicks for triplet feel
        const tripletTime1 = nextBeatTimeRef.current + (secondsPerBeat / 3);
        const tripletTime2 = nextBeatTimeRef.current + (2 * secondsPerBeat / 3);
        playClick(tripletTime1, beatInMeasureRef.current, 0.2);
        playClick(tripletTime2, beatInMeasureRef.current, 0.2);
      }

      // Notify Jam component of the beat
      onBeat(beatCountRef.current, beatInMeasureRef.current);

      // Advance to next beat
      nextBeatTimeRef.current += secondsPerBeat;
      beatCountRef.current++;
      beatInMeasureRef.current = (beatInMeasureRef.current + 1) % timeSignature.numerator;
    }
  }, [bpm, onBeat, playClick, getAudioContext, effectiveSettings]);

  // Start/stop the metronome
  useEffect(() => {
    if (isPlaying) {
      const ctx = getAudioContext();
      // Resume audio context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      nextBeatTimeRef.current = ctx.currentTime;
      beatCountRef.current = 0;
      beatInMeasureRef.current = 0;

      // Use requestAnimationFrame for smoother scheduling
      const tick = () => {
        scheduler();
        timerIdRef.current = setTimeout(tick, 25); // Check every 25ms
      };
      tick();
    } else {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
    }

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, getAudioContext]);

  // Reset beat count
  const reset = useCallback(() => {
    beatCountRef.current = 0;
    beatInMeasureRef.current = 0;
  }, []);

  return { reset };
}
