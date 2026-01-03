import { useState, useEffect } from 'react';
import { TIME_SIGNATURES, countNonDefaultSettings } from '../../utils/jamSettings';
import './GlobalSettings.css';

function GlobalSettings({ settings, onSettingsChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Individual section collapse states
  const [timeSignatureExpanded, setTimeSignatureExpanded] = useState(() => {
    const saved = localStorage.getItem('globalSettings_timeSig_collapsed');
    return saved !== 'true'; // Default to expanded
  });

  const [accentPatternExpanded, setAccentPatternExpanded] = useState(() => {
    const saved = localStorage.getItem('globalSettings_accent_collapsed');
    return saved !== 'true';
  });

  const [metronomeSoundExpanded, setMetronomeSoundExpanded] = useState(() => {
    const saved = localStorage.getItem('globalSettings_metronome_collapsed');
    return saved !== 'true';
  });

  const [chordAudioExpanded, setChordAudioExpanded] = useState(() => {
    const saved = localStorage.getItem('globalSettings_chord_collapsed');
    return saved !== 'true';
  });

  // Persist section collapse states
  useEffect(() => {
    localStorage.setItem('globalSettings_timeSig_collapsed', !timeSignatureExpanded);
  }, [timeSignatureExpanded]);

  useEffect(() => {
    localStorage.setItem('globalSettings_accent_collapsed', !accentPatternExpanded);
  }, [accentPatternExpanded]);

  useEffect(() => {
    localStorage.setItem('globalSettings_metronome_collapsed', !metronomeSoundExpanded);
  }, [metronomeSoundExpanded]);

  useEffect(() => {
    localStorage.setItem('globalSettings_chord_collapsed', !chordAudioExpanded);
  }, [chordAudioExpanded]);

  // Ensure chordAudio exists with defaults (for backward compatibility)
  const safeSettings = {
    ...settings,
    chordAudio: settings.chordAudio || {
      enabled: true,
      volume: 0.25,
      duration: 0.8,
      waveform: 'sine'
    }
  };

  const nonDefaultCount = countNonDefaultSettings(safeSettings);

  // Update a specific setting
  const updateSetting = (key, value) => {
    onSettingsChange({
      ...safeSettings,
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
      ...safeSettings.metronomeSound,
      [key]: value
    });
  };

  // Update chord audio
  const updateChordAudio = (key, value) => {
    updateSetting('chordAudio', {
      ...safeSettings.chordAudio,
      [key]: value
    });
  };

  // Toggle a custom accent beat
  const toggleCustomAccent = (beatIndex) => {
    const newAccents = [...safeSettings.customAccents];
    newAccents[beatIndex] = !newAccents[beatIndex];
    updateSetting('customAccents', newAccents);
  };

  // Adjust custom accents array when time signature changes
  const handleTimeSignatureChange = (numerator, denominator) => {
    updateTimeSignature(numerator, denominator);

    // Adjust customAccents array to match new numerator
    const newAccents = Array(numerator).fill(false);
    newAccents[0] = true; // Always accent the first beat
    for (let i = 1; i < Math.min(numerator, safeSettings.customAccents.length); i++) {
      newAccents[i] = safeSettings.customAccents[i];
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
            <div
              className="section-header"
              onClick={() => setTimeSignatureExpanded(!timeSignatureExpanded)}
            >
              <span className="section-chevron">{timeSignatureExpanded ? '▼' : '▶'}</span>
              <h4>Time Signature</h4>
            </div>
            {timeSignatureExpanded && (
            <div className="time-sig-controls">
              <div className="preset-buttons">
                {Object.entries(TIME_SIGNATURES).map(([label, { numerator, denominator }]) => (
                  <button
                    key={label}
                    className={`preset-btn ${
                      safeSettings.timeSignature.numerator === numerator &&
                      safeSettings.timeSignature.denominator === denominator
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
                  value={safeSettings.timeSignature.numerator}
                  onChange={(e) => handleTimeSignatureChange(
                    parseInt(e.target.value) || 4,
                    safeSettings.timeSignature.denominator
                  )}
                  className="time-sig-input"
                />
                <span>/</span>
                <select
                  value={safeSettings.timeSignature.denominator}
                  onChange={(e) => handleTimeSignatureChange(
                    safeSettings.timeSignature.numerator,
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
            )}
          </div>

          {/* Accent Pattern Section */}
          <div className="settings-section">
            <div
              className="section-header"
              onClick={() => setAccentPatternExpanded(!accentPatternExpanded)}
            >
              <span className="section-chevron">{accentPatternExpanded ? '▼' : '▶'}</span>
              <h4>Accent Pattern</h4>
            </div>
            {accentPatternExpanded && (
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
                      checked={safeSettings.accentPattern === value}
                      onChange={(e) => updateSetting('accentPattern', e.target.value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {safeSettings.accentPattern === 'custom' && (
                <div className="custom-accents">
                  <label>Accented beats:</label>
                  <div className="accent-toggles">
                    {safeSettings.customAccents.map((isAccented, index) => (
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

              {safeSettings.accentPattern === 'swing' && (
                <div className="swing-controls">
                  <label>Swing Ratio: {(safeSettings.swingRatio * 100).toFixed(0)}%</label>
                  <input
                    type="range"
                    min="0.5"
                    max="0.75"
                    step="0.01"
                    value={safeSettings.swingRatio}
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
            )}
          </div>

          {/* Metronome Sound Section */}
          <div className="settings-section">
            <div
              className="section-header"
              onClick={() => setMetronomeSoundExpanded(!metronomeSoundExpanded)}
            >
              <span className="section-chevron">{metronomeSoundExpanded ? '▼' : '▶'}</span>
              <h4>Metronome Sound</h4>
            </div>
            {metronomeSoundExpanded && (
            <div className="metronome-controls">
              <div className="control-row">
                <label>Sound Type:</label>
                <select
                  value={safeSettings.metronomeSound.type}
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
                  value={safeSettings.metronomeSound.subdivision}
                  onChange={(e) => updateMetronomeSound('subdivision', e.target.value)}
                  className="subdivision-select"
                >
                  <option value="quarter">Quarter Notes</option>
                  <option value="eighth">Eighth Notes</option>
                  <option value="triplet">Triplets</option>
                </select>
              </div>
            </div>
            )}
          </div>

          {/* Chord Audio Section */}
          <div className="settings-section">
            <div
              className="section-header"
              onClick={() => setChordAudioExpanded(!chordAudioExpanded)}
            >
              <span className="section-chevron">{chordAudioExpanded ? '▼' : '▶'}</span>
              <h4>Chord Audio</h4>
            </div>
            {chordAudioExpanded && (
            <div className="chord-audio-controls">
              <div className="control-row">
                <label className={`toggle-label ${safeSettings.chordAudio.enabled ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={safeSettings.chordAudio.enabled}
                    onChange={(e) => updateChordAudio('enabled', e.target.checked)}
                  />
                  Enable Chord Playback
                </label>
              </div>

              <div className="control-row">
                <label>Volume: {(safeSettings.chordAudio.volume * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={safeSettings.chordAudio.volume}
                  onChange={(e) => updateChordAudio('volume', parseFloat(e.target.value))}
                  className="volume-slider"
                  disabled={!safeSettings.chordAudio.enabled}
                />
              </div>

              <div className="control-row">
                <label>Duration: {safeSettings.chordAudio.duration.toFixed(1)}s</label>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={safeSettings.chordAudio.duration}
                  onChange={(e) => updateChordAudio('duration', parseFloat(e.target.value))}
                  className="duration-slider"
                  disabled={!safeSettings.chordAudio.enabled}
                />
              </div>

              <div className="control-row">
                <label>Waveform:</label>
                <select
                  value={safeSettings.chordAudio.waveform}
                  onChange={(e) => updateChordAudio('waveform', e.target.value)}
                  className="waveform-select"
                  disabled={!safeSettings.chordAudio.enabled}
                >
                  <option value="sine">Sine (Smooth)</option>
                  <option value="triangle">Triangle (Bright)</option>
                </select>
              </div>
            </div>
            )}
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
                  metronomeSound: { type: 'beep', subdivision: 'quarter' },
                  chordAudio: { enabled: true, volume: 0.25, duration: 0.8, waveform: 'sine' }
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
