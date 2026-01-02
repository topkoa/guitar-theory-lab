import { NOTES } from '../../data/notes';
import { getScaleOptions } from '../../data/scales';
import { getChordOptions } from '../../data/chords';

function SequenceStep({ step, onChange, onDelete, isActive, index }) {
  const scaleOptions = getScaleOptions();
  const chordOptions = getChordOptions();

  const handleChange = (field, value) => {
    onChange(step.id, { ...step, [field]: value });
  };

  return (
    <div className={`sequence-step ${isActive ? 'active' : ''}`}>
      <div className="step-header">
        <span className="step-number">{index + 1}</span>
        <button className="delete-btn" onClick={() => onDelete(step.id)} title="Remove">
          ×
        </button>
      </div>

      <div className="step-content">
        <select
          value={step.rootNote}
          onChange={(e) => handleChange('rootNote', e.target.value)}
          className="root-select"
        >
          {NOTES.map(note => (
            <option key={note} value={note}>{note}</option>
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
    </div>
  );
}

export default SequenceStep;
