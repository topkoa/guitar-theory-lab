import { useState } from 'react';
import { NOTES, getNoteDisplayName } from '../../data/notes';
import { getScaleOptions } from '../../data/scales';
import { getChordOptions } from '../../data/chords';
import { TIME_SIGNATURES, hasOverrides } from '../../utils/jamSettings';

function SequenceStep({ step, onChange, onDelete, isActive, index, onPlayChord }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const scaleOptions = getScaleOptions();
  const chordOptions = getChordOptions();

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

      {/* Time Signature Override */}
      {showAdvanced && (
        <div className="step-advanced">
          <div className="override-section">
            <label className="override-checkbox">
              <input
                type="checkbox"
                checked={isOverrideActive('timeSignature')}
                onChange={() => toggleOverride('timeSignature', { numerator: 4, denominator: 4 })}
              />
              <span>Custom Time Signature</span>
            </label>
            {isOverrideActive('timeSignature') && (
              <select
                value={`${step.overrides.timeSignature.numerator}/${step.overrides.timeSignature.denominator}`}
                onChange={(e) => {
                  const [num, den] = e.target.value.split('/').map(Number);
                  updateOverride('timeSignature', { numerator: num, denominator: den });
                }}
                className="time-sig-select"
              >
                {Object.entries(TIME_SIGNATURES).map(([label, { numerator, denominator }]) => (
                  <option key={label} value={`${numerator}/${denominator}`}>
                    {label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SequenceStep;
