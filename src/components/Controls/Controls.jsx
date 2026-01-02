import { NOTES } from '../../data/notes';
import { TUNINGS, getTuningOptions } from '../../data/tunings';
import { getScaleOptions } from '../../data/scales';
import { getChordOptions } from '../../data/chords';
import IntervalFilter from '../IntervalFilter/IntervalFilter';
import './Controls.css';

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
  const tuningOptions = getTuningOptions();
  const scaleOptions = getScaleOptions();
  const chordOptions = getChordOptions();

  return (
    <div className="controls">
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

      <div className="control-group">
        <label>Root Note</label>
        <select
          value={rootNote}
          onChange={(e) => setRootNote(e.target.value)}
        >
          {NOTES.map(note => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label>Mode</label>
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

      {mode === 'scale' ? (
        <div className="control-group">
          <label>Scale</label>
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
          <label>Chord</label>
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

      <div className="control-group toggle-group">
        <label>
          <input
            type="checkbox"
            checked={showIntervals}
            onChange={(e) => setShowIntervals(e.target.checked)}
          />
          Show Intervals
        </label>
        <label>
          <input
            type="checkbox"
            checked={tabView}
            onChange={(e) => setTabView(e.target.checked)}
          />
          Invert Strings
        </label>
      </div>

      <div className="control-group">
        <label>
          Fret Count: {fretCount}
        </label>
        <input
          type="range"
          min="12"
          max="24"
          value={fretCount}
          onChange={(e) => setFretCount(parseInt(e.target.value))}
          className="fret-slider"
        />
      </div>

      <IntervalFilter
        showIntervals={showIntervals}
        filteredIntervals={filteredIntervals}
        setFilteredIntervals={setFilteredIntervals}
        rootNote={rootNote}
      />
    </div>
  );
}

export default Controls;
