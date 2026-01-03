import { useState } from 'react';
import { NOTES, getNoteDisplayName } from '../../data/notes';
import { getScaleOptions } from '../../data/scales';
import { getChordOptions } from '../../data/chords';
import { TIME_SIGNATURES, hasOverrides, resolveStepSettings } from '../../utils/jamSettings';

function SequenceStep({ step, onChange, onDelete, isActive, index, onPlayChord, globalSettings }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const scaleOptions = getScaleOptions();
  const chordOptions = getChordOptions();

  // Check if chord audio is enabled for this step
  const stepSettings = resolveStepSettings(step, globalSettings);
  const isChordAudioEnabled = stepSettings.chordAudio.enabled;

  const handleChange = (field, value) => {
    onChange(step.id, { ...step, [field]: value });
  };

  // Update overrides
  const updateOverride = (key, value) => {
    onChange(step.id, {
      ...step,
      overrides: {
        ...step.overrides,
        [key]: value
      }
    });
  };

  // Check if an override is active
  const isOverrideActive = (key) => {
    return step.overrides[key] !== null && step.overrides[key] !== undefined;
  };

  // Toggle override checkbox
  const toggleOverride = (key, defaultValue) => {
    if (isOverrideActive(key)) {
      updateOverride(key, null);
    } else {
      updateOverride(key, defaultValue);
    }
  };

  return (
    <div className={`sequence-step ${isActive ? 'active' : ''} ${hasOverrides(step) ? 'has-overrides' : ''}`}>
      <div className="step-header">
        <span className="step-number">{index + 1}</span>
        <div className="step-actions">
          <button
            className="settings-btn"
            onClick={() => setShowAdvanced(!showAdvanced)}
            title="Advanced Settings"
          >
            ⚙
          </button>
          <button
            className="play-chord-btn"
            onClick={() => onPlayChord(step)}
            title={step.type === 'chord' ? 'Play Chord' : 'Play Scale'}
          >
            ▶
          </button>
          <button className="delete-btn" onClick={() => onDelete(step.id)} title="Remove">
            ×
          </button>
        </div>
      </div>

      <div className="step-content">
        <select
          value={step.rootNote}
          onChange={(e) => handleChange('rootNote', e.target.value)}
          className="root-select"
        >
          {NOTES.map(note => (
            <option key={note} value={note}>{getNoteDisplayName(note)}</option>
          ))}
        </select>

        <div className="type-toggle">
          <button
            className={step.type === 'chord' ? 'active' : ''}
            onClick={() => handleChange('type', 'chord')}
          >
            Chord
          </button>
          <button
            className={step.type === 'scale' ? 'active' : ''}
            onClick={() => handleChange('type', 'scale')}
          >
            Scale
          </button>
        </div>

        {step.type === 'chord' ? (
          <select
            value={step.chordType}
            onChange={(e) => handleChange('chordType', e.target.value)}
            className="type-select"
          >
            {chordOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <select
            value={step.scaleType}
            onChange={(e) => handleChange('scaleType', e.target.value)}
            className="type-select"
          >
            {scaleOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        <div className="beats-control">
          <label>Beats:</label>
          <select
            value={step.beats}
            onChange={(e) => handleChange('beats', parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Settings Section */}
      {showAdvanced && (
        <div className="step-advanced">
          <h5>Step Overrides</h5>
          <p className="override-hint">Override global settings for this step only</p>

          {/* Time Signature Override */}
          <div className="override-section">
            <label className="override-checkbox">
              <input
                type="checkbox"
                checked={isOverrideActive('timeSignature')}
                onChange={() => toggleOverride('timeSignature', { numerator: 4, denominator: 4 })}
              />
              <span>Override Time Signature</span>
            </label>
            {isOverrideActive('timeSignature') && (
              <div className="override-controls">
                <select
                  value={`${step.overrides.timeSignature.numerator}/${step.overrides.timeSignature.denominator}`}
                  onChange={(e) => {
                    const [num, den] = e.target.value.split('/').map(Number);
                    updateOverride('timeSignature', { numerator: num, denominator: den });
                  }}
                >
                  {Object.entries(TIME_SIGNATURES).map(([label, { numerator, denominator }]) => (
                    <option key={label} value={`${numerator}/${denominator}`}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Accent Pattern Override */}
          <div className="override-section">
            <label className="override-checkbox">
              <input
                type="checkbox"
                checked={isOverrideActive('accentPattern')}
                onChange={() => toggleOverride('accentPattern', 'standard')}
              />
              <span>Override Accent Pattern</span>
            </label>
            {isOverrideActive('accentPattern') && (
              <div className="override-controls">
                <select
                  value={step.overrides.accentPattern}
                  onChange={(e) => updateOverride('accentPattern', e.target.value)}
                >
                  <option value="standard">Standard</option>
                  <option value="waltz">Waltz</option>
                  <option value="swing">Swing</option>
                  <option value="allEqual">All Equal</option>
                </select>
              </div>
            )}
          </div>

          {/* Metronome Sound Override */}
          <div className="override-section">
            <label className="override-checkbox">
              <input
                type="checkbox"
                checked={isOverrideActive('metronomeSound')}
                onChange={() => toggleOverride('metronomeSound', { type: 'beep', subdivision: 'quarter' })}
              />
              <span>Override Metronome Sound</span>
            </label>
            {isOverrideActive('metronomeSound') && (
              <div className="override-controls">
                <select
                  value={step.overrides.metronomeSound.type}
                  onChange={(e) => updateOverride('metronomeSound', {
                    ...step.overrides.metronomeSound,
                    type: e.target.value
                  })}
                >
                  <option value="beep">Beep</option>
                  <option value="click">Click</option>
                  <option value="woodblock">Woodblock</option>
                </select>
                <select
                  value={step.overrides.metronomeSound.subdivision}
                  onChange={(e) => updateOverride('metronomeSound', {
                    ...step.overrides.metronomeSound,
                    subdivision: e.target.value
                  })}
                >
                  <option value="quarter">Quarter</option>
                  <option value="eighth">Eighth</option>
                  <option value="triplet">Triplet</option>
                </select>
              </div>
            )}
          </div>

          {/* Chord Audio Override */}
          <div className="override-section">
            <label className="override-checkbox">
              <input
                type="checkbox"
                checked={isOverrideActive('chordAudio')}
                onChange={() => toggleOverride('chordAudio', {
                  enabled: true,
                  volume: 0.25,
                  duration: 0.8,
                  waveform: 'sine'
                })}
              />
              <span>Override Chord Audio</span>
            </label>
            {isOverrideActive('chordAudio') && (
              <div className="override-controls">
                <label className="inline-checkbox">
                  <input
                    type="checkbox"
                    checked={step.overrides.chordAudio.enabled}
                    onChange={(e) => updateOverride('chordAudio', {
                      ...step.overrides.chordAudio,
                      enabled: e.target.checked
                    })}
                  />
                  <span>Enabled</span>
                </label>

                <div className="control-row">
                  <label>Volume: {(step.overrides.chordAudio.volume * 100).toFixed(0)}%</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={step.overrides.chordAudio.volume}
                    onChange={(e) => updateOverride('chordAudio', {
                      ...step.overrides.chordAudio,
                      volume: parseFloat(e.target.value)
                    })}
                    disabled={!step.overrides.chordAudio.enabled}
                  />
                </div>

                <div className="control-row">
                  <label>Duration: {step.overrides.chordAudio.duration.toFixed(1)}s</label>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={step.overrides.chordAudio.duration}
                    onChange={(e) => updateOverride('chordAudio', {
                      ...step.overrides.chordAudio,
                      duration: parseFloat(e.target.value)
                    })}
                    disabled={!step.overrides.chordAudio.enabled}
                  />
                </div>

                <div className="control-row">
                  <label>Waveform:</label>
                  <select
                    value={step.overrides.chordAudio.waveform}
                    onChange={(e) => updateOverride('chordAudio', {
                      ...step.overrides.chordAudio,
                      waveform: e.target.value
                    })}
                    disabled={!step.overrides.chordAudio.enabled}
                  >
                    <option value="sine">Sine</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SequenceStep;
