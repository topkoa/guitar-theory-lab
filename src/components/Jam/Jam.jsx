import { useState, useCallback, useMemo, useRef } from 'react';
import SequenceStep from './SequenceStep';
import TransportControls from './TransportControls';
import { useMetronome } from './useMetronome';
import { getScaleNotes, getChordNotes } from '../../utils/musicTheory';
import { SCALES } from '../../data/scales';
import { CHORDS } from '../../data/chords';
import './Jam.css';

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Default step template
const createDefaultStep = () => ({
  id: generateId(),
  rootNote: 'A',
  type: 'scale',
  chordType: 'minor',
  scaleType: 'pentatonicMinor',
  beats: 4
});

function Jam({ tuning, tabView, onHighlightChange }) {
  // Sequence state
  const [sequence, setSequence] = useState([
    { id: generateId(), rootNote: 'A', type: 'scale', chordType: 'minor', scaleType: 'pentatonicMinor', beats: 4 },
    { id: generateId(), rootNote: 'D', type: 'scale', chordType: 'minor', scaleType: 'pentatonicMinor', beats: 4 },
    { id: generateId(), rootNote: 'E', type: 'chord', chordType: 'dom7', scaleType: 'mixolydian', beats: 4 },
  ]);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [metronomeEnabled, setMetronomeEnabled] = useState(true);
  const [loop, setLoop] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);

  // Use refs to track beat position without re-renders affecting timing
  const beatInStepRef = useRef(0);
  const stepIndexRef = useRef(0);

  // Get current step
  const currentStep = sequence[currentStepIndex] || null;

  // Calculate total beats for current step
  const beatsInCurrentStep = currentStep?.beats || 4;

  // Handle beat from metronome
  const handleBeat = useCallback((beatNumber) => {
    if (sequence.length === 0) return;

    const currentStep = sequence[stepIndexRef.current];

    // Increment beat within current step
    beatInStepRef.current++;

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
          // Don't advance step index, stay on last step
          return;
        }
      } else {
        stepIndexRef.current = nextIndex;
        setCurrentStepIndex(nextIndex);
      }

      // Reset beat counter for new step and set to beat 1
      beatInStepRef.current = 1;
    }

    // Update UI with current beat (1-indexed for display)
    setCurrentBeat(beatInStepRef.current);
  }, [sequence, loop]);

  // Use metronome hook
  const { reset: resetMetronome } = useMetronome(bpm, handleBeat, isPlaying, metronomeEnabled);

  // Computed highlighted notes based on current step
  const highlightData = useMemo(() => {
    if (!currentStep) {
      return { notes: [], rootNote: 'C', mode: 'scale' };
    }

    const notes = currentStep.type === 'scale'
      ? getScaleNotes(currentStep.rootNote, currentStep.scaleType)
      : getChordNotes(currentStep.rootNote, currentStep.chordType);

    return {
      notes,
      rootNote: currentStep.rootNote,
      mode: currentStep.type
    };
  }, [currentStep]);

  // Notify parent of highlight changes
  useMemo(() => {
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
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
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

  return (
    <div className="jam-container">
      {/* Sequence Builder */}
      <div className="sequence-builder">
        <div className="sequence-header">
          <h3>Chord/Scale Sequence</h3>
          <button className="add-step-btn" onClick={handleAddStep}>
            + Add Step
          </button>
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
                isActive={isPlaying && index === currentStepIndex}
                onChange={handleUpdateStep}
                onDelete={handleDeleteStep}
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
      />

      {/* Current Step Display */}
      <div className="current-step-display">
        <h2>{getCurrentStepName()}</h2>
        <p>
          Step {currentStepIndex + 1} of {sequence.length}
          {isPlaying && ` • Beat ${currentBeat} of ${beatsInCurrentStep}`}
        </p>
      </div>
    </div>
  );
}

export default Jam;
