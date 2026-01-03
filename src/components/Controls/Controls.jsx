import { useState, useEffect, useRef } from 'react';
import { NOTES, getNoteDisplayName } from '../../data/notes';
import { TUNINGS, getTuningOptions } from '../../data/tunings';
import { getScaleOptions } from '../../data/scales';
import { getChordOptions } from '../../data/chords';
import './Controls.css';

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

function Controls({
  tuning,
  setTuning,
  rootNote,
  setRootNote,
  mode,
  setMode,
  scaleType,
  setScaleType,
  chordType,
  setChordType,
  showIntervals,
  setShowIntervals,
  tabView,
  setTabView,
  filteredIntervals,
  setFilteredIntervals,
  fretCount,
  setFretCount
}) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const tuningOptions = getTuningOptions();
  const scaleOptions = getScaleOptions();
  const chordOptions = getChordOptions();

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
    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex === -1) return '?';
    const targetIndex = (rootIndex + interval) % 12;
    return NOTES[targetIndex];
  };

  // Count selected intervals
  const selectedCount = Object.values(filteredIntervals).filter(Boolean).length;
  const filterLabel = selectedCount === 12 ? 'Filter (All)' : `Filter (${selectedCount}/12)`;

  // Toggle individual interval
  const handleToggleInterval = (interval) => {
    setFilteredIntervals(prev => ({
      ...prev,
      [interval]: !prev[interval]
    }));
  };

  // Toggle all intervals
  const handleToggleAll = (enabled) => {
    const newFilters = {};
    for (let i = 0; i <= 11; i++) {
      newFilters[i] = enabled;
    }
    setFilteredIntervals(newFilters);
  };

  return (
    <div className="controls">
      <div className="controls-section primary-controls">
        <div className="control-group">
          <div className="mode-toggle">
            <button
              className={mode === 'scale' ? 'active' : ''}
              onClick={() => setMode('scale')}
            >
              Scales
            </button>
            <button
              className={mode === 'chord' ? 'active' : ''}
              onClick={() => setMode('chord')}
            >
              Chords
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Root</label>
          <select
            value={rootNote}
            onChange={(e) => setRootNote(e.target.value)}
          >
            {NOTES.map(note => (
              <option key={note} value={note}>{getNoteDisplayName(note)}</option>
            ))}
          </select>
        </div>

        {mode === 'scale' ? (
          <div className="control-group">
            <label>Type</label>
            <select
              value={scaleType}
              onChange={(e) => setScaleType(e.target.value)}
            >
              {scaleOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="control-group">
            <label>Type</label>
            <select
              value={chordType}
              onChange={(e) => setChordType(e.target.value)}
            >
              {chordOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="controls-section view-options">
        <div className="control-group">
          <label>Tuning</label>
          <select
            value={tuning}
            onChange={(e) => setTuning(e.target.value)}
          >
            {tuningOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group toggle-group">
          <label>
            <input
              type="checkbox"
              checked={showIntervals}
              onChange={(e) => setShowIntervals(e.target.checked)}
            />
            Intervals
          </label>
          <label>
            <input
              type="checkbox"
              checked={tabView}
              onChange={(e) => setTabView(e.target.checked)}
            />
            Invert
          </label>
        </div>

        <div className="control-group fret-control">
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
      </div>

      <div className="controls-section advanced-controls">
        <div className="control-group interval-filter-dropdown" ref={dropdownRef}>
          <button
            className="filter-dropdown-button"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            {filterLabel} ▼
          </button>
          {showFilterDropdown && (
            <div className="filter-dropdown-menu">
              <div className="filter-dropdown-header">
                <span>{showIntervals ? 'Filter Intervals' : 'Filter Notes'}</span>
                <div className="filter-actions">
                  <button onClick={() => handleToggleAll(true)}>All</button>
                  <button onClick={() => handleToggleAll(false)}>None</button>
                </div>
              </div>
              <div className="filter-dropdown-items">
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
      </div>
    </div>
  );
}

export default Controls;
