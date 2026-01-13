import { useMemo } from 'react';
import { FRET_MARKERS, DOUBLE_MARKERS, getNoteOnFret } from '../../data/notes';
import { INTERVAL_NAMES } from '../../data/scales';
import { getIntervalFromRoot, getPositionName } from '../../utils/musicTheory';
import './Fretboard.css';

// Helper to check if a position is in the voicing
function findVoicingPosition(stringIdx, fret, tabView, tuning, voicingPositions) {
  const actualStringIndex = tabView ? (tuning.length - 1 - stringIdx) : stringIdx;
  const voicingPos = voicingPositions.find(
    p => p.stringIndex === actualStringIndex && p.fret === fret
  );
  return { voicingPos, isInVoicing: voicingPos && !voicingPos.isMuted };
}

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
  traversalPath = [],
  positionMode = false,
  positionStartFret = 1,
  showInlays = true,
  voicingPositions = null
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

        // Handle voicing positions in practice mode (shape quiz)
        if (voicingPositions && voicingPositions.length > 0) {
          const { isInVoicing } = findVoicingPosition(stringIdx, fret, tabView, tuning, voicingPositions);

          if (!isInVoicing && highlightedNotes.includes(note)) {
            return 'dimmed';
          }
          if (!isInVoicing) return 'inactive';
          if (note === rootNote && practiceShowRootHint) return 'root';
          return 'chord';
        }

        // Standard chord highlight (no voicing)
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

    // Voicing mode logic - similar to path mode but for specific chord positions
    if (voicingPositions && voicingPositions.length > 0) {
      const { isInVoicing } = findVoicingPosition(stringIdx, fret, tabView, tuning, voicingPositions);

      if (!isInVoicing && highlightedNotes.includes(note)) {
        // Note is in chord but NOT in voicing - dim it
        return 'dimmed';
      }
      if (!isInVoicing) {
        // Note is not in chord at all
        return 'inactive';
      }
      // Note IS in voicing - apply normal coloring below
      if (note === rootNote) return 'root';
      return 'chord';
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

    // Position mode logic - filter notes outside the 4-fret position window
    if (positionMode && highlightedNotes.includes(note)) {
      const positionEndFret = positionStartFret + 3;
      const isInPosition = fret >= positionStartFret && fret <= positionEndFret;

      if (!isInPosition) {
        // Note is in scale/chord but outside the position window - dim it
        return 'dimmed';
      }
      // Note IS in position window - apply normal coloring below
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
            return INTERVAL_NAMES[interval] || note;
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
    return INTERVAL_NAMES[interval] || note;
  };

  const handleFretClick = (stringIdx, fret, note) => {
    if (practiceMode && onFretClick) {
      onFretClick(stringIdx, fret, note);
    }
  };

  // Get muted strings for voicing mode
  const getMutedStrings = useMemo(() => {
    if (!voicingPositions || voicingPositions.length === 0) return [];
    return voicingPositions
      .filter(p => p.isMuted)
      .map(p => p.stringIndex);
  }, [voicingPositions]);

  // Check if a string is muted (accounting for tabView)
  const isStringMuted = (stringIdx) => {
    const actualStringIndex = tabView ? (tuning.length - 1 - stringIdx) : stringIdx;
    return getMutedStrings.includes(actualStringIndex);
  };

  return (
    <div className="fretboard-container">
      <div className="fretboard">
        {fretboardData.map((string, stringIdx) => (
          <div key={stringIdx} className="string-row">
            <div className="string-label">
              {string.openNote}
              {voicingPositions && isStringMuted(stringIdx) && (
                <span className="muted-indicator">X</span>
              )}
            </div>
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
        {showInlays && (
          <div className="fretboard-inlays">
            {Array.from({ length: fretCount + 1 }, (_, fret) => (
              <div key={fret} className="inlay-position">
                {FRET_MARKERS.includes(fret) && (
                  DOUBLE_MARKERS.includes(fret) ? (
                    <div className="inlay-dot double">
                      <div className="inlay-dot-inner" />
                      <div className="inlay-dot-inner" />
                    </div>
                  ) : (
                    <div className="inlay-dot">
                      <div className="inlay-dot-inner" />
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
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
        {positionMode && (
          <div className="position-indicator-overlay">
            {Array.from({ length: fretCount + 1 }, (_, fret) => {
              const positionEndFret = positionStartFret + 3;
              const isInPosition = fret >= positionStartFret && fret <= positionEndFret;
              const isPositionStart = fret === positionStartFret;
              return (
                <div
                  key={fret}
                  className={`position-fret ${isInPosition ? 'in-position' : ''} ${isPositionStart ? 'position-start' : ''}`}
                >
                  {isPositionStart && (
                    <span className="position-label">{getPositionName(positionStartFret)}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Fretboard;
