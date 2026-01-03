function TransportControls({
  isPlaying,
  onPlay,
  onStop,
  bpm,
  onBpmChange,
  metronomeEnabled,
  onMetronomeToggle,
  loop,
  onLoopToggle,
  currentBeat,
  beatsInCurrentStep,
  timeSignature,
  accentPattern,
  customAccents,
  currentStep,
  currentStepIndex
}) {
  // Calculate accent strength for beat indicator visualization
  const getAccentClass = (beatIndex) => {
    if (!accentPattern || accentPattern === 'standard') {
      return beatIndex === 0 ? 'accented' : '';
    }
    if (accentPattern === 'waltz') {
      return beatIndex === 0 ? 'accented' : '';
    }
    if (accentPattern === 'custom' && customAccents) {
      return customAccents[beatIndex] ? 'accented' : '';
    }
    if (accentPattern === 'allEqual') {
      return '';
    }
    return beatIndex === 0 ? 'accented' : '';
  };

  // Get current step name for display
  const getStepName = () => {
    if (!currentStep) return '';
    const { rootNote, type, scaleType, chordType } = currentStep;
    const typeName = type === 'scale' ? scaleType : chordType;
    return `${rootNote} ${typeName}`;
  };

  return (
    <div className="transport-controls">
      <div className="transport-buttons">
        <button
          className={`play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={onPlay}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button className="stop-btn" onClick={onStop}>
          ■
        </button>
      </div>

      <div className="tempo-control">
        <label>BPM:</label>
        <input
          type="number"
          min="40"
          max="240"
          value={bpm}
          onChange={(e) => onBpmChange(Math.min(240, Math.max(40, parseInt(e.target.value) || 120)))}
          className="bpm-input"
        />
        <input
          type="range"
          min="40"
          max="240"
          value={bpm}
          onChange={(e) => onBpmChange(parseInt(e.target.value))}
          className="bpm-slider"
        />
        {timeSignature && (
          <span className="time-signature-badge">
            {timeSignature.numerator}/{timeSignature.denominator}
          </span>
        )}
      </div>

      <div className="beat-indicator">
        {Array.from({ length: beatsInCurrentStep }, (_, i) => (
          <span
            key={i}
            className={`beat-dot ${i < currentBeat ? 'past' : ''} ${i === currentBeat - 1 ? 'current' : ''} ${getAccentClass(i % (timeSignature?.numerator || 4))}`}
          />
        ))}
      </div>

      <div className="transport-toggles">
        <label className={`toggle-label ${metronomeEnabled ? 'active' : ''}`}>
          <input
            type="checkbox"
            checked={metronomeEnabled}
            onChange={(e) => onMetronomeToggle(e.target.checked)}
          />
          Metro
        </label>
        <label className={`toggle-label ${loop ? 'active' : ''}`}>
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => onLoopToggle(e.target.checked)}
          />
          Loop
        </label>
      </div>

      {currentStep && (
        <div className="current-step-info">
          <span className="step-label">Current:</span>
          <span className="step-name">{getStepName()}</span>
          <span className="step-beat">({currentBeat}/{beatsInCurrentStep})</span>
        </div>
      )}
    </div>
  );
}

export default TransportControls;
