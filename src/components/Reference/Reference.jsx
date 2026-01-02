import { SCALES, INTERVAL_NAMES } from '../../data/scales';
import { CHORDS, CHORD_INTERVAL_NAMES } from '../../data/chords';
import { getScaleNotes, getChordNotes } from '../../utils/musicTheory';
import './Reference.css';

function Reference({ mode, rootNote, scaleType, chordType }) {
  const isScale = mode === 'scale';
  const typeKey = isScale ? scaleType : chordType;
  const info = isScale ? SCALES[typeKey] : CHORDS[typeKey];
  const notes = isScale
    ? getScaleNotes(rootNote, typeKey)
    : getChordNotes(rootNote, typeKey);
  const intervals = info?.intervals || [];

  if (!info) return null;

  return (
    <div className="reference-panel">
      <div className="reference-header">
        <h2>{rootNote} {info.name}</h2>
        <span className="formula">{info.formula}</span>
      </div>

      <p className="reference-description">{info.description}</p>

      <div className="reference-notes">
        {notes.map((note, idx) => (
          <div
            key={idx}
            className={`note-badge ${idx === 0 ? 'root' : isScale ? 'scale' : 'chord'}`}
          >
            {note}
          </div>
        ))}
      </div>

      <div className="interval-info">
        {notes.map((note, idx) => {
          const interval = intervals[idx];
          const intervalName = isScale
            ? INTERVAL_NAMES[interval]
            : CHORD_INTERVAL_NAMES[interval % 12] || CHORD_INTERVAL_NAMES[interval];
          return (
            <div key={idx} className="interval-badge">
              <span className="note">{note}</span>
              <span className="interval">({intervalName})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reference;
