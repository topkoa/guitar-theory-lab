import './VoicingControls.css';

function VoicingControls({
  voicingMode,
  setVoicingMode,
  selectedVoicingIndex,
  setSelectedVoicingIndex,
  availableVoicings,
  compact = false
}) {
  const hasVoicings = availableVoicings && availableVoicings.length > 0;
  const canGoPrev = selectedVoicingIndex > 0;
  const canGoNext = selectedVoicingIndex < availableVoicings.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      setSelectedVoicingIndex(selectedVoicingIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setSelectedVoicingIndex(selectedVoicingIndex + 1);
    }
  };

  const currentVoicing = hasVoicings ? availableVoicings[selectedVoicingIndex] : null;

  return (
    <div className={`voicing-controls ${compact ? 'compact' : ''}`}>
      {/* View mode toggle */}
      <div className="voicing-view-toggle">
        <button
          className={voicingMode === 'all' ? 'active' : ''}
          onClick={() => setVoicingMode('all')}
          title="Show all chord notes across the fretboard"
        >
          All Notes
        </button>
        <button
          className={voicingMode === 'voicing' ? 'active' : ''}
          onClick={() => setVoicingMode('voicing')}
          disabled={!hasVoicings}
          title={hasVoicings ? 'Show playable chord positions' : 'No voicings available'}
        >
          Voicing
        </button>
      </div>

      {/* Position selector - only show when in voicing mode */}
      {voicingMode === 'voicing' && hasVoicings && (
        <div className="voicing-position-selector">
          <button
            className="voicing-nav-btn"
            onClick={handlePrev}
            disabled={!canGoPrev}
            title="Previous voicing"
          >
            <span className="nav-arrow">&#9664;</span>
          </button>

          <select
            value={selectedVoicingIndex}
            onChange={(e) => setSelectedVoicingIndex(parseInt(e.target.value))}
            className="voicing-dropdown"
          >
            {availableVoicings.map((v, idx) => (
              <option key={v.id || idx} value={idx}>
                {v.name}
              </option>
            ))}
          </select>

          <button
            className="voicing-nav-btn"
            onClick={handleNext}
            disabled={!canGoNext}
            title="Next voicing"
          >
            <span className="nav-arrow">&#9654;</span>
          </button>

          {/* Voicing info badge */}
          {currentVoicing && !compact && (
            <span className={`voicing-badge ${currentVoicing.category}`}>
              {currentVoicing.category === 'open' && 'Open'}
              {currentVoicing.category === 'barre' && 'Barre'}
              {currentVoicing.category === 'partial_barre' && 'Partial'}
              {currentVoicing.category === 'caged' && 'CAGED'}
              {currentVoicing.category === 'generated' && 'Generated'}
            </span>
          )}
        </div>
      )}

      {/* Show count when voicings available */}
      {voicingMode === 'voicing' && hasVoicings && !compact && (
        <span className="voicing-count">
          {selectedVoicingIndex + 1} of {availableVoicings.length}
        </span>
      )}
    </div>
  );
}

export default VoicingControls;
