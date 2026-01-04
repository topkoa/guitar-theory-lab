import { useMemo } from 'react';
import { FRET_MARKERS, DOUBLE_MARKERS, getNoteOnFret } from '../../data/notes';
import { getIntervalFromRoot } from '../../utils/musicTheory';
import './Fretboard.css';

function Fretboard({
  tuning,
  highlightedNotes,
  rootNote,
  showIntervals,
  mode,
  tabView,
  practiceMode = false,
  practiceShowHighlights = false,
  practiceShowRootHint = false,
  onFretClick = null,
  revealedFrets = [],
  filteredIntervals = null,
  fretCount = 22,
  pathModeEnabled = false,
  traversalPath = []
}) {
  const fretboardData = useMemo(() => {
    const data = tuning.map((openNote, stringIndex) => {
      const frets = [];
      for (let fret = 0; fret <= fretCount; fret++) {
        const note = getNoteOnFret(openNote, fret);
        frets.push({
          fret,
          note,
          stringIndex: stringIndex + 1
        });
      }
      return { openNote, frets };
    });
    // Reverse for tab view (high E on top)
    return tabView ? [...data].reverse() : data;
  }, [tuning, tabView, fretCount]);

  const getNoteClass = (note, stringIdx, fret) => {
    if (practiceMode) {
      // If practiceShowHighlights is true, show highlighted notes (chord mode)
      if (practiceShowHighlights) {
        if (!highlightedNotes.length) return 'inactive';
        // Only show root color if practiceShowRootHint is true
        if (note === rootNote && practiceShowRootHint) return 'root';
        if (highlightedNotes.includes(note)) {
          return mode === 'chord' ? 'chord' : 'highlighted';
        }
        return 'inactive';
      }

      // Otherwise, only show notes if they've been revealed (note/fret mode)
      const fretKey = `${stringIdx}-${fret}`;
      if (!revealedFrets.includes(fretKey)) {
        return 'hidden';
      }
      // Show revealed notes
      return 'revealed';
    }

    if (!highlightedNotes.length) return 'inactive';

    // Check if this note should be filtered out
    if (filteredIntervals && highlightedNotes.includes(note)) {
      const interval = getIntervalFromRoot(note, rootNote);
      if (!filteredIntervals[interval]) {
        return 'inactive';
      }
    }

    // Path mode logic
    if (pathModeEnabled && traversalPath.length > 0) {
      // Get the actual stringIndex from tuning (accounting for tabView)
      const actualStringIndex = tabView ? (tuning.length - 1 - stringIdx) : stringIdx;

      const isInPath = traversalPath.some(
        p => p.stringIndex === actualStringIndex && p.fret === fret && p.note === note
      );

      if (!isInPath && highlightedNotes.includes(note)) {
        // Note is in scale/chord but NOT in path - dim it
        return 'dimmed';
      }
      if (!isInPath) {
        // Note is not in scale/chord at all
        return 'inactive';
      }
      // Note IS in path - apply normal coloring below
    }

    if (note === rootNote) return 'root';
    if (highlightedNotes.includes(note)) {
      return mode === 'chord' ? 'chord' : 'highlighted';
    }
    return 'inactive';
  };

  const getDisplayText = (note, stringIdx, fret) => {
    if (practiceMode) {
      // If showing highlights (chord mode), show note names or intervals for highlighted notes
      if (practiceShowHighlights) {
        if (highlightedNotes.includes(note) || note === rootNote) {
          // Check if intervals should be shown
          if (showIntervals) {
            const interval = getIntervalFromRoot(note, rootNote);
            const intervalNames = {
              0: 'R', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4',
              6: 'b5', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7'
            };
            return intervalNames[interval] || note;
          }
          return note;
        }
        return '';
      }

      // Otherwise, only show note name if revealed (note/fret mode)
      const fretKey = `${stringIdx}-${fret}`;
      if (!revealedFrets.includes(fretKey)) {
        return '';
      }
      return note;
    }

    if (!showIntervals || !highlightedNotes.includes(note)) {
      return note;
    }
    const interval = getIntervalFromRoot(note, rootNote);
    const intervalNames = {
      0: 'R', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4',
      6: 'b5', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7'
    };
    return intervalNames[interval] || note;
  };

  const handleFretClick = (stringIdx, fret, note) => {
    if (practiceMode && onFretClick) {
      onFretClick(stringIdx, fret, note);
    }
  };

  return (
    <div className="fretboard-container">
      <div className="fretboard">
        {fretboardData.map((string, stringIdx) => (
          <div key={stringIdx} className="string-row">
            <div className="string-label">{string.openNote}</div>
            <div className="frets-container">
              {string.frets.map((fretData) => (
                <div key={fretData.fret} className="fret">
                  <div
                    className={`note-dot ${getNoteClass(fretData.note, stringIdx, fretData.fret)} ${practiceMode ? 'clickable' : ''}`}
                    onClick={() => handleFretClick(stringIdx, fretData.fret, fretData.note)}
                  >
                    {getDisplayText(fretData.note, stringIdx, fretData.fret)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="fret-markers">
          {Array.from({ length: fretCount + 1 }, (_, fret) => (
            <div key={fret} className="fret-marker">
              {fret === 0 ? (
                <span className="fret-number">0</span>
              ) : FRET_MARKERS.includes(fret) ? (
                <>
                  <div className="marker-dot" />
                  {DOUBLE_MARKERS.includes(fret) && <div className="marker-dot" />}
                </>
              ) : null}
              {fret > 0 && FRET_MARKERS.includes(fret) && (
                <span className="fret-number">{fret}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fretboard;
