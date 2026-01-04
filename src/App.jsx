import { useState, useMemo, useCallback } from 'react';
import Fretboard from './components/Fretboard/Fretboard';
import Controls from './components/Controls/Controls';
import Reference from './components/Reference/Reference';
import Practice from './components/Practice/Practice';
import Jam from './components/Jam/Jam';
import Footer from './components/Footer/Footer';
import { TUNINGS, DEFAULT_TUNING } from './data/tunings';
import { getScaleNotes, getChordNotes, calculateNeckTraversalPath } from './utils/musicTheory';
import './App.css';

function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' or 'practice'

  // Tuning state
  const [tuningKey, setTuningKey] = useState(DEFAULT_TUNING);
  const tuning = TUNINGS[tuningKey].notes;

  // Selection state
  const [rootNote, setRootNote] = useState('C');
  const [mode, setMode] = useState('scale'); // 'scale' or 'chord'
  const [scaleType, setScaleType] = useState('major');
  const [chordType, setChordType] = useState('major');
  const [showIntervals, setShowIntervals] = useState(false);
  const [tabView, setTabView] = useState(false);
  const [fretCount, setFretCount] = useState(22);

  // Neck traversal path state
  const [pathModeEnabled, setPathModeEnabled] = useState(false);
  const [fretRangeWidth, setFretRangeWidth] = useState(4);
  const [pathDirection, setPathDirection] = useState('ascending'); // 'ascending' or 'descending'

  // Filter state for intervals/notes
  const [filteredIntervals, setFilteredIntervals] = useState({
    0: true,   // R (Root)
    1: true,   // b2
    2: true,   // 2
    3: true,   // b3
    4: true,   // 3
    5: true,   // 4
    6: true,   // b5
    7: true,   // 5
    8: true,   // b6
    9: true,   // 6
    10: true,  // b7
    11: true   // 7
  });

  // Jam mode state
  const [jamHighlight, setJamHighlight] = useState({ notes: [], rootNote: 'A', mode: 'scale' });
  const handleJamHighlightChange = useCallback((data) => {
    setJamHighlight(data);
  }, []);

  // Practice mode state
  const [revealedFrets, setRevealedFrets] = useState([]);
  const [practiceHighlightedNotes, setPracticeHighlightedNotes] = useState([]);
  const [practiceRootNote, setPracticeRootNote] = useState('C');
  const [practiceShowHighlights, setPracticeShowHighlights] = useState(false);
  const [practiceShowRootHint, setPracticeShowRootHint] = useState(false);
  const [practiceShowIntervals, setPracticeShowIntervals] = useState(false);

  const handleFretClick = useCallback((stringIdx, fret, note) => {
    const fretKey = `${stringIdx}-${fret}`;
    if (!revealedFrets.includes(fretKey)) {
      setRevealedFrets(prev => [...prev, fretKey]);
    }
  }, [revealedFrets]);

  const handlePracticeReset = useCallback(() => {
    setRevealedFrets([]);
  }, []);

  const handlePracticeHighlightChange = useCallback((notes, rootNote = 'C', showHighlights = false, showRootHint = false) => {
    setPracticeHighlightedNotes(notes);
    setPracticeRootNote(rootNote);
    setPracticeShowHighlights(showHighlights);
    setPracticeShowRootHint(showRootHint);
  }, []);

  // Computed highlighted notes
  const highlightedNotes = useMemo(() => {
    if (mode === 'scale') {
      return getScaleNotes(rootNote, scaleType);
    } else {
      return getChordNotes(rootNote, chordType);
    }
  }, [rootNote, mode, scaleType, chordType]);

  // Compute traversal path when enabled
  const traversalPath = useMemo(() => {
    if (!pathModeEnabled || !highlightedNotes.length) return [];

    return calculateNeckTraversalPath(
      tuning,
      highlightedNotes,
      rootNote,
      fretCount,
      fretRangeWidth,
      tabView,
      pathDirection
    );
  }, [pathModeEnabled, tuning, highlightedNotes, rootNote, fretCount, fretRangeWidth, tabView, pathDirection]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Guitar <span>Theory</span> Lab</h1>
        <p>Master scales, chords, and the fretboard</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={activeTab === 'learn' ? 'active' : ''}
          onClick={() => setActiveTab('learn')}
        >
          Learn
        </button>
        <button
          className={activeTab === 'practice' ? 'active' : ''}
          onClick={() => setActiveTab('practice')}
        >
          Practice
        </button>
        <button
          className={activeTab === 'jam' ? 'active' : ''}
          onClick={() => setActiveTab('jam')}
        >
          Jam
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'learn' ? (
          <>
            <Controls
              tuning={tuningKey}
              setTuning={setTuningKey}
              rootNote={rootNote}
              setRootNote={setRootNote}
              mode={mode}
              setMode={setMode}
              scaleType={scaleType}
              setScaleType={setScaleType}
              chordType={chordType}
              setChordType={setChordType}
              showIntervals={showIntervals}
              setShowIntervals={setShowIntervals}
              tabView={tabView}
              setTabView={setTabView}
              filteredIntervals={filteredIntervals}
              setFilteredIntervals={setFilteredIntervals}
              fretCount={fretCount}
              setFretCount={setFretCount}
              pathModeEnabled={pathModeEnabled}
              setPathModeEnabled={setPathModeEnabled}
              fretRangeWidth={fretRangeWidth}
              setFretRangeWidth={setFretRangeWidth}
              pathDirection={pathDirection}
              setPathDirection={setPathDirection}
            />

            <Reference
              mode={mode}
              rootNote={rootNote}
              scaleType={scaleType}
              chordType={chordType}
            />

            <Fretboard
              tuning={tuning}
              highlightedNotes={highlightedNotes}
              rootNote={rootNote}
              showIntervals={showIntervals}
              mode={mode}
              tabView={tabView}
              filteredIntervals={filteredIntervals}
              fretCount={fretCount}
              pathModeEnabled={pathModeEnabled}
              traversalPath={traversalPath}
            />
          </>
        ) : activeTab === 'practice' ? (
          <>
            <div className="controls" style={{ margin: '20px', padding: '15px' }}>
              <div className="control-group">
                <label>Tuning</label>
                <select
                  value={tuningKey}
                  onChange={(e) => setTuningKey(e.target.value)}
                >
                  {Object.entries(TUNINGS).map(([key, t]) => (
                    <option key={key} value={key}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="control-group toggle-group">
                <label>
                  <input
                    type="checkbox"
                    checked={tabView}
                    onChange={(e) => setTabView(e.target.checked)}
                  />
                  Invert Strings
                </label>
              </div>
            </div>

            <Practice
              tuning={tuning}
              onReset={handlePracticeReset}
              onHighlightChange={handlePracticeHighlightChange}
              showIntervals={practiceShowIntervals}
              setShowIntervals={setPracticeShowIntervals}
            />

            <Fretboard
              tuning={tuning}
              highlightedNotes={practiceHighlightedNotes}
              rootNote={practiceRootNote}
              showIntervals={practiceShowIntervals}
              mode={mode}
              tabView={tabView}
              practiceMode={true}
              practiceShowHighlights={practiceShowHighlights}
              practiceShowRootHint={practiceShowRootHint}
              onFretClick={handleFretClick}
              revealedFrets={revealedFrets}
              fretCount={fretCount}
            />
          </>
        ) : activeTab === 'jam' ? (
          <>
            <div className="controls" style={{ margin: '20px', padding: '15px' }}>
              <div className="control-group">
                <label>Tuning</label>
                <select
                  value={tuningKey}
                  onChange={(e) => setTuningKey(e.target.value)}
                >
                  {Object.entries(TUNINGS).map(([key, t]) => (
                    <option key={key} value={key}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="control-group toggle-group">
                <label>
                  <input
                    type="checkbox"
                    checked={tabView}
                    onChange={(e) => setTabView(e.target.checked)}
                  />
                  Invert Strings
                </label>
              </div>
            </div>

            <Jam
              tuning={tuning}
              tabView={tabView}
              onHighlightChange={handleJamHighlightChange}
            />

            <Fretboard
              tuning={tuning}
              highlightedNotes={jamHighlight.notes}
              rootNote={jamHighlight.rootNote}
              showIntervals={false}
              mode={jamHighlight.mode}
              tabView={tabView}
              fretCount={fretCount}
            />
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export default App;
