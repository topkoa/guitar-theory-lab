import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import SequenceStep from './SequenceStep';
import TransportControls from './TransportControls';
import JamSettings from './JamSettings';
import PresetManager from './PresetManager';
import { useMetronome } from './useMetronome';
import { getScaleNotes, getChordNotes } from '../../utils/musicTheory';
import { getVoicingsForChord, voicingToFretPositions } from '../../utils/voicingUtils';
import { SCALES } from '../../data/scales';
import { CHORDS } from '../../data/chords';
import { DEFAULT_GLOBAL_SETTINGS, resolveStepSettings } from '../../utils/jamSettings';
import { presetStorage } from '../../utils/presetStorage';
import { createChordSound, playChordNow, stopActiveOscillators } from '../../utils/chordSounds';
import './Jam.css';

const generateId = () => Math.random().toString(36).substr(2, 9);

const createDefaultStep = () => ({
  id: generateId(),
  rootNote: 'A',
  type: 'scale',
  chordType: 'minor',
  scaleType: 'pentatonicMinor',
  beats: 4,
  voicingMode: 'all',        // 'all' | 'voicing'
  selectedVoicingIndex: 0,   // Which voicing to show
  overrides: {
    timeSignature: null,
    accentPattern: null,
    customAccents: null,
    swingRatio: null,
    metronomeSound: null,
    chordAudio: null
  }
});

function Jam({ tuning, tabView, onHighlightChange }) {
  // Global settings state
  const [globalSettings, setGlobalSettings] = useState(DEFAULT_GLOBAL_SETTINGS);

  // Sequence state - update existing steps to include overrides
  const [sequence, setSequence] = useState([
    { ...createDefaultStep(), rootNote: 'A', type: 'scale', chordType: 'minor', scaleType: 'pentatonicMinor', beats: 4 },
    { ...createDefaultStep(), rootNote: 'D', type: 'scale', chordType: 'minor', scaleType: 'pentatonicMinor', beats: 4 },
    { ...createDefaultStep(), rootNote: 'E', type: 'chord', chordType: 'dom7', scaleType: 'mixolydian', beats: 4 },
  ]);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [metronomeEnabled, setMetronomeEnabled] = useState(true);
  const [loop, setLoop] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(1);

  // Preset modal state
  const [presetModalMode, setPresetModalMode] = useState(null); // null, 'save', or 'load'

  // Use refs to track beat position without re-renders affecting timing
  const beatInStepRef = useRef(0);
  const stepIndexRef = useRef(0);
  const beatInMeasureRef = useRef(0);
  const isInitialMount = useRef(true);
  const activeOscillatorsRef = useRef([]); // Track active oscillators for stopping

  // Reset voicing indices when tuning changes
  useEffect(() => {
    setSequence(prevSequence =>
      prevSequence.map(step => ({
        ...step,
        selectedVoicingIndex: 0
      }))
    );
  }, [tuning]);

  // Get current step
  const currentStep = sequence[currentStepIndex] || null;

  // Get effective settings for current step
  const effectiveSettings = useMemo(() => {
    if (!currentStep) return globalSettings;
    return resolveStepSettings(currentStep, globalSettings);
  }, [currentStep, globalSettings]);

  // Calculate total beats for current step
  const beatsInCurrentStep = currentStep?.beats || 4;

  // Handle beat from metronome
  const handleBeat = useCallback((beatNumber, beatInMeasure, scheduledBeatTime) => {
    if (sequence.length === 0) return;

    const currentStep = sequence[stepIndexRef.current];

    // Increment beat within current step FIRST
    beatInStepRef.current++;
    beatInMeasureRef.current = beatInMeasure;

    // Check if we've completed all beats in the current step
    if (beatInStepRef.current > currentStep.beats) {
      // Move to next step
      const nextIndex = stepIndexRef.current + 1;
      if (nextIndex >= sequence.length) {
        if (loop) {
          stepIndexRef.current = 0; // Loop back to first step
          setCurrentStepIndex(0);
        } else {
          setIsPlaying(false);
          beatInStepRef.current = currentStep.beats; // Stay on last beat
          setCurrentBeat(beatInStepRef.current);
          // Don't advance step index, stay on last step
          return;
        }
      } else {
        stepIndexRef.current = nextIndex;
        setCurrentStepIndex(nextIndex);
      }

      // Reset beat counter for new step
      beatInStepRef.current = 1;
    }

    // Play chord AFTER handling transitions (synchronized with metronome)
    // Only play on the first beat of a step if chord audio is enabled
    const activeStep = sequence[stepIndexRef.current];
    if (activeStep && beatInStepRef.current === 1 && audioContext.current) {
      const stepSettings = resolveStepSettings(activeStep, globalSettings);
      if (stepSettings.chordAudio.enabled) {
        const notes = getChordNotes(activeStep.rootNote, activeStep.chordType);
        if (notes.length > 0) {
          const ctx = audioContext.current;
          // Resume if suspended
          if (ctx.state === 'suspended') {
            ctx.resume();
          }

          // Calculate duration for entire step
          const secondsPerBeat = 60.0 / bpm;
          const stepDuration = secondsPerBeat * activeStep.beats;

          // Use the same scheduled time as the metronome beat
          const nodes = createChordSound(
            ctx,
            scheduledBeatTime,
            notes,
            stepSettings.chordAudio.volume,
            stepDuration, // Play for entire step duration
            stepSettings.chordAudio.waveform
          );

          // Track active oscillators for stopping
          if (nodes && nodes.length > 0) {
            activeOscillatorsRef.current.push(...nodes);

            // Clean up expired oscillators to prevent memory leaks
            const now = ctx.currentTime;
            activeOscillatorsRef.current = activeOscillatorsRef.current.filter(
              node => now < node.stopTime
            );
          }
        }
      }
    }

    // Update UI with current beat (1-indexed for display)
    setCurrentBeat(beatInStepRef.current);
  }, [sequence, loop, globalSettings, bpm]);

  // Use metronome hook with effective settings
  const { reset: resetMetronome, audioContext } = useMetronome(
    bpm,
    handleBeat,
    isPlaying,
    metronomeEnabled,
    effectiveSettings
  );

  // Computed highlighted notes based on current step
  const highlightData = useMemo(() => {
    if (!currentStep) {
      return { notes: [], rootNote: 'C', mode: 'scale', voicingPositions: null };
    }

    const notes = currentStep.type === 'scale'
      ? getScaleNotes(currentStep.rootNote, currentStep.scaleType)
      : getChordNotes(currentStep.rootNote, currentStep.chordType);

    // Calculate voicing positions if in voicing mode for chord steps
    let voicingPositions = null;
    if (currentStep.type === 'chord' && currentStep.voicingMode === 'voicing') {
      const voicings = getVoicingsForChord(currentStep.rootNote, currentStep.chordType, tuning);
      const safeIndex = Math.min(currentStep.selectedVoicingIndex || 0, voicings.length - 1);
      if (voicings[safeIndex]) {
        voicingPositions = voicingToFretPositions(voicings[safeIndex], tuning);
      }
    }

    return {
      notes,
      rootNote: currentStep.rootNote,
      mode: currentStep.type,
      voicingPositions
    };
  }, [currentStep, tuning]);

  // Notify parent of highlight changes
  useEffect(() => {
    // Skip the initial mount to avoid setState during render error
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    onHighlightChange(highlightData);
  }, [highlightData, onHighlightChange]);

  // Get display name for current step
  const getCurrentStepName = () => {
    if (!currentStep) return 'No steps';

    const typeName = currentStep.type === 'scale'
      ? SCALES[currentStep.scaleType]?.name || currentStep.scaleType
      : CHORDS[currentStep.chordType]?.name || currentStep.chordType;

    return `${currentStep.rootNote} ${typeName}`;
  };

  // Handlers
  const handlePlay = () => {
    if (sequence.length === 0) return;

    // If pausing (currently playing), stop active audio
    if (isPlaying && audioContext.current) {
      stopActiveOscillators(activeOscillatorsRef.current, audioContext.current);
      activeOscillatorsRef.current = [];
    }

    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    // Stop all active oscillators immediately
    if (audioContext.current) {
      stopActiveOscillators(activeOscillatorsRef.current, audioContext.current);
    }
    activeOscillatorsRef.current = [];

    setIsPlaying(false);
    setCurrentStepIndex(0);
    setCurrentBeat(1);
    beatInStepRef.current = 0;
    stepIndexRef.current = 0;
    resetMetronome();
  };

  const handleAddStep = () => {
    setSequence([...sequence, createDefaultStep()]);
  };

  const handleUpdateStep = (id, updatedStep) => {
    setSequence(sequence.map(s => s.id === id ? updatedStep : s));
  };

  const handleDeleteStep = (id) => {
    const newSequence = sequence.filter(s => s.id !== id);
    setSequence(newSequence);

    // Adjust current step if needed
    if (currentStepIndex >= newSequence.length && newSequence.length > 0) {
      setCurrentStepIndex(newSequence.length - 1);
    }
  };

  // Manual play chord/scale handler
  const handlePlayChord = useCallback((step) => {
    if (!step) return;

    // Initialize audio context if needed (for first play before main playback)
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const stepSettings = resolveStepSettings(step, globalSettings);

    // Get notes based on step type (chord or scale)
    const notes = step.type === 'chord'
      ? getChordNotes(step.rootNote, step.chordType)
      : getScaleNotes(step.rootNote, step.scaleType);

    if (notes.length > 0) {
      playChordNow(
        audioContext.current,
        notes,
        stepSettings.chordAudio.volume,
        stepSettings.chordAudio.duration,
        stepSettings.chordAudio.waveform
      );
    }
  }, [globalSettings]);

  // Preset handlers
  const handleSavePreset = (name, description) => {
    const preset = {
      name,
      description,
      globalSettings,
      sequence,
      playbackSettings: { bpm, metronomeEnabled, loop }
    };
    presetStorage.save(preset);
  };

  const handleLoadPreset = (preset) => {
    // Stop playback before loading
    setIsPlaying(false);

    // Load all settings from preset
    setGlobalSettings(preset.globalSettings);
    setSequence(preset.sequence);
    setBpm(preset.playbackSettings.bpm);
    setMetronomeEnabled(preset.playbackSettings.metronomeEnabled);
    setLoop(preset.playbackSettings.loop);

    // Reset playback state
    setCurrentStepIndex(0);
    setCurrentBeat(1);
    beatInStepRef.current = 0;
    stepIndexRef.current = 0;
    beatInMeasureRef.current = 0;
    resetMetronome();
  };

  return (
    <div className="jam-container">
      {/* Preset Modal */}
      {presetModalMode && (
        <PresetManager
          mode={presetModalMode}
          onClose={() => setPresetModalMode(null)}
          onSave={handleSavePreset}
          onLoad={handleLoadPreset}
        />
      )}

      {/* Jam Settings */}
      <JamSettings
        settings={globalSettings}
        onSettingsChange={setGlobalSettings}
      />

      {/* Sequence Builder */}
      <div className="sequence-builder">
        <div className="sequence-header">
          <h3>Chord/Scale Sequence</h3>
          <div className="sequence-actions">
            <button
              className="preset-action-btn load-preset-btn icon-btn"
              onClick={() => setPresetModalMode('load')}
              title="Load Preset"
            >
              📂
            </button>
            <button
              className="preset-action-btn save-preset-btn icon-btn"
              onClick={() => setPresetModalMode('save')}
              disabled={sequence.length === 0}
              title="Save Preset"
            >
              💾
            </button>
            <button
              className="add-step-btn icon-btn"
              onClick={handleAddStep}
              title="Add Step"
            >
              ➕
            </button>
          </div>
        </div>
        <div className="sequence-steps">
          {sequence.length === 0 ? (
            <p className="empty-sequence">No steps yet. Add a chord or scale to get started.</p>
          ) : (
            sequence.map((step, index) => (
              <SequenceStep
                key={step.id}
                step={step}
                index={index}
                isActive={index === currentStepIndex}
                onChange={handleUpdateStep}
                onDelete={handleDeleteStep}
                onPlayChord={handlePlayChord}
                tuning={tuning}
              />
            ))
          )}
        </div>
      </div>

      {/* Transport Controls */}
      <TransportControls
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onStop={handleStop}
        bpm={bpm}
        onBpmChange={setBpm}
        metronomeEnabled={metronomeEnabled}
        onMetronomeToggle={setMetronomeEnabled}
        loop={loop}
        onLoopToggle={setLoop}
        currentBeat={currentBeat}
        beatsInCurrentStep={beatsInCurrentStep}
        timeSignature={effectiveSettings.timeSignature}
        accentPattern={effectiveSettings.accentPattern}
        customAccents={effectiveSettings.customAccents}
        currentStep={currentStep}
        currentStepIndex={currentStepIndex}
      />
    </div>
  );
}

export default Jam;
