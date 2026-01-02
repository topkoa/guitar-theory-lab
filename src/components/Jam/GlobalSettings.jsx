import { useState } from 'react';
import { TIME_SIGNATURES, countNonDefaultSettings } from '../../utils/jamSettings';
import './GlobalSettings.css';

function GlobalSettings({ settings, onSettingsChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const nonDefaultCount = countNonDefaultSettings(settings);

  // Update a specific setting
  const updateSetting = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  // Update time signature
  const updateTimeSignature = (numerator, denominator) => {
    updateSetting('timeSignature', { numerator, denominator });
  };

  // Update metronome sound
  const updateMetronomeSound = (key, value) => {
    updateSetting('metronomeSound', {
      ...settings.metronomeSound,
      [key]: value
    });
  };

  // Toggle a custom accent beat
  const toggleCustomAccent = (beatIndex) => {
    const newAccents = [...settings.customAccents];
    newAccents[beatIndex] = !newAccents[beatIndex];
    updateSetting('customAccents', newAccents);
  };

  // Adjust custom accents array when time signature changes
  const handleTimeSignatureChange = (numerator, denominator) => {
    updateTimeSignature(numerator, denominator);

    // Adjust customAccents array to match new numerator
    const newAccents = Array(numerator).fill(false);
    newAccents[0] = true; // Always accent the first beat
    for (let i = 1; i < Math.min(numerator, settings.customAccents.length); i++) {
      newAccents[i] = settings.customAccents[i];
    }
    updateSetting('customAccents', newAccents);
  };

  return (
    <div className="global-settings">
      <button
        className="global-settings-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
        <span>Global Settings</span>
        {nonDefaultCount > 0 && (
          <span className="settings-badge">{nonDefaultCount}</span>
        )}
      </button>

      {isExpanded && (
        <div className="global-settings-content">
          {/* Time Signature Section */}
          <div className="settings-section">
            <h4>Time Signature</h4>
            <div className="time-sig-controls">
              <div className="preset-buttons">
                {Object.entries(TIME_SIGNATURES).map(([label, { numerator, denominator }]) => (
                  <button
                    key={label}
                    className={`preset-btn ${
                      settings.timeSignature.numerator === numerator &&
                      settings.timeSignature.denominator === denominator
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => handleTimeSignatureChange(numerator, denominator)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="custom-time-sig">
                <label>Custom:</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={settings.timeSignature.numerator}
                  onChange={(e) => handleTimeSignatureChange(
                    parseInt(e.target.value) || 4,
                    settings.timeSignature.denominator
                  )}
                  className="time-sig-input"
                />
                <span>/</span>
                <select
                  value={settings.timeSignature.denominator}
                  onChange={(e) => handleTimeSignatureChange(
                    settings.timeSignature.numerator,
                    parseInt(e.target.value)
                  )}
                  className="time-sig-select"
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </select>
              </div>
            </div>
          </div>

          {/* Accent Pattern Section */}
          <div className="settings-section">
            <h4>Accent Pattern</h4>
            <div className="accent-controls">
              <div className="radio-group">
                {[
                  { value: 'standard', label: 'Standard (Strong downbeat)' },
                  { value: 'waltz', label: 'Waltz (3/4 feel)' },
                  { value: 'swing', label: 'Swing Feel' },
                  { value: 'allEqual', label: 'All Equal' },
                  { value: 'custom', label: 'Custom Pattern' }
                ].map(({ value, label }) => (
                  <label key={value} className="radio-label">
                    <input
                      type="radio"
                      name="accentPattern"
                      value={value}
                      checked={settings.accentPattern === value}
                      onChange={(e) => updateSetting('accentPattern', e.target.value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {settings.accentPattern === 'custom' && (
                <div className="custom-accents">
                  <label>Accented beats:</label>
                  <div className="accent-toggles">
                    {settings.customAccents.map((isAccented, index) => (
                      <button
                        key={index}
                        className={`accent-toggle-btn ${isAccented ? 'active' : ''}`}
                        onClick={() => toggleCustomAccent(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {settings.accentPattern === 'swing' && (
                <div className="swing-controls">
                  <label>Swing Ratio: {(settings.swingRatio * 100).toFixed(0)}%</label>
                  <input
                    type="range"
                    min="0.5"
                    max="0.75"
                    step="0.01"
                    value={settings.swingRatio}
                    onChange={(e) => updateSetting('swingRatio', parseFloat(e.target.value))}
                    className="swing-slider"
                  />
                  <div className="swing-labels">
                    <span>Straight</span>
                    <span>Triplet</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Metronome Sound Section */}
          <div className="settings-section">
            <h4>Metronome Sound</h4>
            <div className="metronome-controls">
              <div className="control-row">
                <label>Sound Type:</label>
                <select
                  value={settings.metronomeSound.type}
                  onChange={(e) => updateMetronomeSound('type', e.target.value)}
                  className="sound-select"
                >
                  <option value="beep">Beep (Sine Wave)</option>
                  <option value="click">Click (Noise)</option>
                  <option value="woodblock">Woodblock (Harmonic)</option>
                </select>
              </div>
              <div className="control-row">
                <label>Subdivision:</label>
                <select
                  value={settings.metronomeSound.subdivision}
                  onChange={(e) => updateMetronomeSound('subdivision', e.target.value)}
                  className="subdivision-select"
                >
                  <option value="quarter">Quarter Notes</option>
                  <option value="eighth">Eighth Notes</option>
                  <option value="triplet">Triplets</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="settings-actions">
            <button
              className="reset-btn"
              onClick={() => {
                onSettingsChange({
                  timeSignature: { numerator: 4, denominator: 4 },
                  accentPattern: 'standard',
                  customAccents: [true, false, false, false],
                  swingRatio: 0.67,
                  metronomeSound: { type: 'beep', subdivision: 'quarter' }
                });
              }}
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalSettings;
