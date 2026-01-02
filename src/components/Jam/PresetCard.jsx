function PresetCard({ preset, onLoad, onDelete, onExport }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="preset-card">
      <div className="preset-header">
        <h4 className="preset-name">{preset.name}</h4>
        <span className="preset-date">{formatDate(preset.createdAt)}</span>
      </div>

      {preset.description && (
        <p className="preset-description">{preset.description}</p>
      )}

      <div className="preset-summary">
        <span className="summary-item">
          {preset.sequence.length} steps
        </span>
        <span className="summary-item">
          {preset.playbackSettings.bpm} BPM
        </span>
        <span className="summary-item">
          {preset.globalSettings.timeSignature.numerator}/{preset.globalSettings.timeSignature.denominator}
        </span>
      </div>

      <div className="preset-actions">
        <button className="preset-btn load-btn" onClick={() => onLoad(preset)}>
          Load
        </button>
        <button className="preset-btn export-btn" onClick={() => onExport(preset)}>
          Export
        </button>
        <button className="preset-btn delete-btn" onClick={() => onDelete(preset.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default PresetCard;
