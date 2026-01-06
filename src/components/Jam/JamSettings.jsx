import { useState } from 'react';
import { TIME_SIGNATURES, countNonDefaultSettings } from '../../utils/jamSettings';
import './JamSettings.css';

function JamSettings({ settings, onSettingsChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Ensure chordAudio and metronomeSound.volume exist with defaults (for backward compatibility)
  const safeSettings = {
    ...settings,
    metronomeSound: {
      ...settings.metronomeSound,
      volume: settings.metronomeSound?.volume ?? 0.5
    },
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

    // Adjust customAccents if using custom pattern
    if (safeSettings.accentPattern === 'custom') {
      const newAccents = Array(numerator).fill(false);
      newAccents[0] = true;
      for (let i = 1; i < Math.min(numerator, safeSettings.customAccents.length); i++) {
        newAccents[i] = safeSettings.customAccents[i];
      }
      updateSetting('customAccents', newAccents);
    }
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

  const resetToDefaults = () => {
    onSettingsChange({
      timeSignature: { numerator: 4, denominator: 4 },
      accentPattern: 'standard',
      customAccents: [true, false, false, false],
      swingRatio: 0.67,
      metronomeSound: { type: 'beep', subdivision: 'quarter', volume: 0.5 },
      chordAudio: { enabled: true, volume: 0.25, duration: 0.8, waveform: 'sine' }
    });
  };

  return (
    <div className="jam-settings">
      <button
        className="jam-settings-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
        <span>Jam Settings</span>
        {nonDefaultCount > 0 && (
          <span className="settings-badge">{nonDefaultCount}</span>
        )}
      </button>

      {isExpanded && (
        <div className="jam-settings-content">
          {/* Rhythm Section */}
          <div className="settings-group">
            <h4 className="group-title">Rhythm</h4>

            <div className="setting-row">
              <label>Time Signature</label>
              <div className="time-sig-presets">
                {Object.entries(TIME_SIGNATURES).map(([label, { numerator, denominator }]) => (
                  <button
                    key={label}
                    className={`preset-btn ${
                      safeSettings.timeSignature.numerator === numerator &&
                      safeSettings.timeSignature.denominator === denominator
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => updateTimeSignature(numerator, denominator)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-row">
              <label>Accent Pattern</label>
              <select
                value={safeSettings.accentPattern}
                onChange={(e) => updateSetting('accentPattern', e.target.value)}
                className="accent-select"
              >
                <option value="standard">Standard (Strong downbeat)</option>
                <option value="waltz">Waltz (3/4 feel)</option>
                <option value="swing">Swing Feel</option>
                <option value="allEqual">All Equal</option>
                <option value="custom">Custom Pattern</option>
              </select>
            </div>

            {safeSettings.accentPattern === 'custom' && (
              <div className="setting-row custom-accents">
                <label>Accented Beats</label>
                <div className="accent-toggles">
                  {safeSettings.customAccents.map((isAccented, index) => (
                    <button
                      key={index}
                      className={`accent-btn ${isAccented ? 'active' : ''}`}
                      onClick={() => toggleCustomAccent(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {safeSettings.accentPattern === 'swing' && (
              <div className="setting-row">
                <label>Swing: {(safeSettings.swingRatio * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0.5"
                  max="0.75"
                  step="0.01"
                  value={safeSettings.swingRatio}
                  onChange={(e) => updateSetting('swingRatio', parseFloat(e.target.value))}
                  className="swing-slider"
                />
              </div>
            )}
          </div>

          {/* Sound Section */}
          <div className="settings-group">
            <h4 className="group-title">Sound</h4>

            <div className="setting-row inline-controls">
              <label>Metronome</label>
              <select
                value={safeSettings.metronomeSound.type}
                onChange={(e) => updateMetronomeSound('type', e.target.value)}
              >
                <option value="beep">Beep</option>
                <option value="click">Click</option>
                <option value="woodblock">Woodblock</option>
              </select>
              <select
                value={safeSettings.metronomeSound.subdivision}
                onChange={(e) => updateMetronomeSound('subdivision', e.target.value)}
              >
                <option value="quarter">Quarter</option>
                <option value="eighth">Eighth</option>
                <option value="triplet">Triplet</option>
              </select>
              <span className="volume-control">
                <span className="volume-prefix">Vol:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={safeSettings.metronomeSound.volume}
                  onChange={(e) => updateMetronomeSound('volume', parseFloat(e.target.value))}
                />
                <span className="volume-label">{(safeSettings.metronomeSound.volume * 100).toFixed(0)}%</span>
              </span>
            </div>

            <div className="setting-row">
              <label className={`toggle-label ${safeSettings.chordAudio.enabled ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={safeSettings.chordAudio.enabled}
                  onChange={(e) => updateChordAudio('enabled', e.target.checked)}
                />
                Chord Playback
              </label>
            </div>

            {safeSettings.chordAudio.enabled && (
              <div className="chord-audio-options">
                <div className="setting-row inline-controls">
                  <label>Chord Sound</label>
                  <select
                    value={safeSettings.chordAudio.waveform}
                    onChange={(e) => updateChordAudio('waveform', e.target.value)}
                  >
                    <option value="sine">Smooth</option>
                    <option value="triangle">Bright</option>
                  </select>
                  <span className="volume-control">
                    <span className="volume-prefix">Vol:</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={safeSettings.chordAudio.volume}
                      onChange={(e) => updateChordAudio('volume', parseFloat(e.target.value))}
                    />
                    <span className="volume-label">{(safeSettings.chordAudio.volume * 100).toFixed(0)}%</span>
                  </span>
                </div>
                <div className="setting-row">
                  <label>Duration: {safeSettings.chordAudio.duration.toFixed(1)}s</label>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={safeSettings.chordAudio.duration}
                    onChange={(e) => updateChordAudio('duration', parseFloat(e.target.value))}
                    className="duration-slider"
                  />
                </div>
              </div>
            )}
          </div>

          <button className="reset-btn" onClick={resetToDefaults}>
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}

export default JamSettings;
