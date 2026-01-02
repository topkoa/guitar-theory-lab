import './IntervalFilter.css';

const INTERVAL_LABELS = {
  0: 'R',
  1: 'b2',
  2: '2',
  3: 'b3',
  4: '3',
  5: '4',
  6: 'b5',
  7: '5',
  8: 'b6',
  9: '6',
  10: 'b7',
  11: '7'
};

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function IntervalFilter({ showIntervals, filteredIntervals, setFilteredIntervals, rootNote }) {
  const handleToggle = (interval) => {
    setFilteredIntervals(prev => ({
      ...prev,
      [interval]: !prev[interval]
    }));
  };

  const handleToggleAll = (enabled) => {
    const newFilters = {};
    for (let i = 0; i <= 11; i++) {
      newFilters[i] = enabled;
    }
    setFilteredIntervals(newFilters);
  };

  // Get the note for each interval based on root note
  const getNoteForInterval = (interval) => {
    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return '?';
    const targetIndex = (rootIndex + interval) % 12;
    return NOTES[targetIndex];
  };

  return (
    <div className="interval-filter">
      <div className="filter-header">
        <span className="filter-title">
          {showIntervals ? 'Filter Intervals' : 'Filter Notes'}
        </span>
        <div className="filter-actions">
          <button
            className="filter-action-btn"
            onClick={() => handleToggleAll(true)}
          >
            All
          </button>
          <button
            className="filter-action-btn"
            onClick={() => handleToggleAll(false)}
          >
            None
          </button>
        </div>
      </div>
      <div className="filter-checkboxes">
        {Object.keys(INTERVAL_LABELS).map(interval => {
          const intervalNum = parseInt(interval);
          const displayLabel = showIntervals
            ? INTERVAL_LABELS[interval]
            : getNoteForInterval(intervalNum);

          return (
            <label key={interval} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filteredIntervals[intervalNum]}
                onChange={() => handleToggle(intervalNum)}
              />
              <span className={`checkbox-label ${intervalNum === 0 ? 'root-label' : ''}`}>
                {displayLabel}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default IntervalFilter;
