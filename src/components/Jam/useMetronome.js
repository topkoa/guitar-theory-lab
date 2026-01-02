import { useRef, useCallback, useEffect } from 'react';

// Web Audio API metronome for precise timing
export function useMetronome(bpm, onBeat, isPlaying, metronomeEnabled) {
  const audioContextRef = useRef(null);
  const nextBeatTimeRef = useRef(0);
  const timerIdRef = useRef(null);
  const beatCountRef = useRef(0);

  // Initialize audio context
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Play click sound
  const playClick = useCallback((time, isDownbeat) => {
    if (!metronomeEnabled) return;

    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Higher pitch for downbeat
    osc.frequency.value = isDownbeat ? 1000 : 800;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.05);
  }, [getAudioContext, metronomeEnabled]);

  // Schedule beats ahead of time for accuracy
  const scheduler = useCallback(() => {
    const ctx = getAudioContext();
    const secondsPerBeat = 60.0 / bpm;
    const scheduleAheadTime = 0.1; // Schedule 100ms ahead

    while (nextBeatTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const isDownbeat = beatCountRef.current === 0;
      playClick(nextBeatTimeRef.current, isDownbeat);
      onBeat(beatCountRef.current);

      nextBeatTimeRef.current += secondsPerBeat;
      beatCountRef.current++;
    }
  }, [bpm, onBeat, playClick, getAudioContext]);

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
  }, [isPlaying, scheduler, getAudioContext]);

  // Reset beat count
  const reset = useCallback(() => {
    beatCountRef.current = 0;
  }, []);

  return { reset };
}
