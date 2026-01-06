import { useState, useEffect, useRef } from 'react';
import { NOTES } from '../../data/notes';
import { getTuningOptions } from '../../data/tunings';
import './GlobalSettingsPanel.css';

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

function FretboardSettings({
  tuningKey,
  setTuningKey,
  tabView,
  setTabView,
  showInlays,
  setShowInlays,
  fretCount,
  setFretCount,
  // Optional props for Learn mode
  showIntervals,
  setShowIntervals,
  filteredIntervals,
  setFilteredIntervals,
  rootNote
}) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const tuningOptions = getTuningOptions();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    if (showFilterDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown]);

  // Get the note for each interval based on root note
  const getNoteForInterval = (interval) => {
    if (!rootNote) return '?';
    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return '?';
    const targetIndex = (rootIndex + interval) % 12;
    return NOTES[targetIndex];
  };

  // Count selected intervals
  const selectedCount = filteredIntervals
    ? Object.values(filteredIntervals).filter(Boolean).length
    : 12;
  const filterLabel = selectedCount === 12 ? 'Filter' : `Filter (${selectedCount}/12)`;

  // Toggle individual interval
  const handleToggleInterval = (interval) => {
    if (!setFilteredIntervals) return;
    setFilteredIntervals(prev => ({
      ...prev,
      [interval]: !prev[interval]
    }));
  };

  // Toggle all intervals
  const handleToggleAll = (enabled) => {
    if (!setFilteredIntervals) return;
    const newFilters = {};
    for (let i = 0; i <= 11; i++) {
      newFilters[i] = enabled;
    }
    setFilteredIntervals(newFilters);
  };

  const hasFilterSupport = filteredIntervals && setFilteredIntervals;
  const hasIntervalsSupport = showIntervals !== undefined && setShowIntervals;

  return (
    <div className="fretboard-settings">
      <div className="setting-group">
        <label>Tuning</label>
        <select
          value={tuningKey}
          onChange={(e) => setTuningKey(e.target.value)}
        >
          {tuningOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="setting-group">
        <label>Frets: {fretCount}</label>
        <input
          type="range"
          min="12"
          max="24"
          value={fretCount}
          onChange={(e) => setFretCount(parseInt(e.target.value))}
          className="fret-slider"
        />
      </div>

      <div className="setting-group toggles">
        <label className="toggle-item">
          <input
            type="checkbox"
            checked={tabView}
            onChange={(e) => setTabView(e.target.checked)}
          />
          Invert
        </label>

        <label className="toggle-item">
          <input
            type="checkbox"
            checked={showInlays}
            onChange={(e) => setShowInlays(e.target.checked)}
          />
          Inlays
        </label>

        {hasIntervalsSupport && (
          <label className="toggle-item">
            <input
              type="checkbox"
              checked={showIntervals}
              onChange={(e) => setShowIntervals(e.target.checked)}
            />
            Intervals
          </label>
        )}
      </div>

      {hasFilterSupport && (
        <div className="setting-group filter-group" ref={dropdownRef}>
          <button
            className="filter-btn"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            {filterLabel} ▼
          </button>
          {showFilterDropdown && (
            <div className="filter-dropdown">
              <div className="filter-header">
                <span>{showIntervals ? 'Filter Intervals' : 'Filter Notes'}</span>
                <div className="filter-actions">
                  <button onClick={() => handleToggleAll(true)}>All</button>
                  <button onClick={() => handleToggleAll(false)}>None</button>
                </div>
              </div>
              <div className="filter-items">
                {Object.keys(INTERVAL_LABELS).map(interval => {
                  const intervalNum = parseInt(interval);
                  const displayLabel = showIntervals
                    ? INTERVAL_LABELS[interval]
                    : getNoteForInterval(intervalNum);

                  return (
                    <label key={interval} className="filter-item">
                      <input
                        type="checkbox"
                        checked={filteredIntervals[intervalNum]}
                        onChange={() => handleToggleInterval(intervalNum)}
                      />
                      <span className={intervalNum === 0 ? 'root-label' : ''}>
                        {displayLabel}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FretboardSettings;
