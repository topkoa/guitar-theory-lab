import { useMemo } from 'react';
import { NOTES, getNoteDisplayName } from '../../data/notes';
import { getScaleOptions } from '../../data/scales';
import { getChordOptions } from '../../data/chords';
import { getPositionOptions } from '../../utils/musicTheory';
import VoicingControls from '../VoicingControls/VoicingControls';
import './Controls.css';

function Controls({
  rootNote,
  setRootNote,
  mode,
  setMode,
  scaleType,
  setScaleType,
  chordType,
  setChordType,
  pathModeEnabled,
  setPathModeEnabled,
  fretRangeWidth,
  setFretRangeWidth,
  pathDirection,
  setPathDirection,
  positionMode,
  setPositionMode,
  selectedPosition,
  setSelectedPosition,
  voicingMode,
  setVoicingMode,
  selectedVoicingIndex,
  setSelectedVoicingIndex,
  availableVoicings
}) {
  const scaleOptions = useMemo(() => getScaleOptions(), []);
  const chordOptions = useMemo(() => getChordOptions(), []);
  const positionOptions = useMemo(() => getPositionOptions(), []);

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
          <>
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

            <VoicingControls
              voicingMode={voicingMode}
              setVoicingMode={setVoicingMode}
              selectedVoicingIndex={selectedVoicingIndex}
              setSelectedVoicingIndex={setSelectedVoicingIndex}
              availableVoicings={availableVoicings}
            />
          </>
        )}

        <div className="control-group path-control-group">
          <label>
            <input
              type="checkbox"
              checked={pathModeEnabled}
              onChange={(e) => setPathModeEnabled(e.target.checked)}
            />
            Path Mode
          </label>

          {pathModeEnabled && (
            <>
              <div className="path-direction-toggle">
                <button
                  className={pathDirection === 'ascending' ? 'active' : ''}
                  onClick={() => setPathDirection('ascending')}
                >
                  ↗ Ascending
                </button>
                <button
                  className={pathDirection === 'descending' ? 'active' : ''}
                  onClick={() => setPathDirection('descending')}
                >
                  ↙ Descending
                </button>
              </div>
              <div className="path-range-control">
                <label>Range: ±{fretRangeWidth} frets</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={fretRangeWidth}
                  onChange={(e) => setFretRangeWidth(parseInt(e.target.value))}
                  className="path-range-slider"
                />
              </div>
            </>
          )}
        </div>

        <div className="control-group position-control-group">
          <label>
            <input
              type="checkbox"
              checked={positionMode}
              onChange={(e) => setPositionMode(e.target.checked)}
            />
            Position Mode
          </label>

          {positionMode && (
            <div className="position-selector">
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(parseInt(e.target.value))}
              >
                {positionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Controls;
