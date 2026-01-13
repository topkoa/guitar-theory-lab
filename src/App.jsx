import { useState, useMemo, useCallback, useEffect } from 'react';
import Fretboard from './components/Fretboard/Fretboard';
import Controls from './components/Controls/Controls';
import Reference from './components/Reference/Reference';
import Practice from './components/Practice/Practice';
import EarTraining from './components/EarTraining/EarTraining';
import Jam from './components/Jam/Jam';
import Footer from './components/Footer/Footer';
import FretboardSettings from './components/GlobalSettingsPanel/GlobalSettingsPanel';
import { TUNINGS, DEFAULT_TUNING } from './data/tunings';
import { getScaleNotes, getChordNotes, calculateNeckTraversalPath } from './utils/musicTheory';
import { getVoicingsForChord, voicingToFretPositions } from './utils/voicingUtils';
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

  // Global display settings
  const [showInlays, setShowInlays] = useState(true);

  // Neck traversal path state
  const [pathModeEnabled, setPathModeEnabled] = useState(false);
  const [fretRangeWidth, setFretRangeWidth] = useState(4);
  const [pathDirection, setPathDirection] = useState('ascending'); // 'ascending' or 'descending'

  // Position mode state
  const [positionMode, setPositionMode] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(5); // 5 = V position (frets 5-8)

  // Handle mutual exclusivity between path mode and position mode
  const handleSetPathModeEnabled = useCallback((enabled) => {
    setPathModeEnabled(enabled);
    if (enabled) setPositionMode(false);
  }, []);

  const handleSetPositionMode = useCallback((enabled) => {
    setPositionMode(enabled);
    if (enabled) setPathModeEnabled(false);
  }, []);

  // Voicing state for chord display
  const [voicingMode, setVoicingMode] = useState('all'); // 'all' | 'voicing'
  const [selectedVoicingIndex, setSelectedVoicingIndex] = useState(0);

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
  const [jamHighlight, setJamHighlight] = useState({ notes: [], rootNote: 'A', mode: 'scale', voicingPositions: null });
  const handleJamHighlightChange = useCallback((data) => {
    setJamHighlight(data);
  }, []);

  // Ear training mode state
  const [earHighlightedNotes, setEarHighlightedNotes] = useState([]);
  const [earRootNote, setEarRootNote] = useState('C');
  const [earShowHighlights, setEarShowHighlights] = useState(false);
  const [earShowRootHint, setEarShowRootHint] = useState(false);

  const handleEarTrainingHighlightChange = useCallback((notes, rootNote = 'C', showHighlights = false, showRootHint = false) => {
    setEarHighlightedNotes(notes);
    setEarRootNote(rootNote);
    setEarShowHighlights(showHighlights);
    setEarShowRootHint(showRootHint);
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

  // Voicing positions for practice mode
  const [practiceVoicingPositions, setPracticeVoicingPositions] = useState(null);

  const handlePracticeHighlightChange = useCallback((notes, rootNote = 'C', showHighlights = false, showRootHint = false, voicingPositions = null) => {
    setPracticeHighlightedNotes(notes);
    setPracticeRootNote(rootNote);
    setPracticeShowHighlights(showHighlights);
    setPracticeShowRootHint(showRootHint);
    setPracticeVoicingPositions(voicingPositions);
  }, []);

  // Computed highlighted notes
  const highlightedNotes = useMemo(() => {
    if (mode === 'scale') {
      return getScaleNotes(rootNote, scaleType);
    } else {
      return getChordNotes(rootNote, chordType);
    }
  }, [rootNote, mode, scaleType, chordType]);

  // Compute available voicings for current chord
  const availableVoicings = useMemo(() => {
    if (mode !== 'chord') return [];
    return getVoicingsForChord(rootNote, chordType, tuning);
  }, [mode, rootNote, chordType, tuning]);

  // Reset voicing index when chord or tuning changes
  useEffect(() => {
    setSelectedVoicingIndex(0);
  }, [rootNote, chordType, tuningKey]);

  // Compute voicing positions for fretboard display
  const voicingPositions = useMemo(() => {
    if (mode !== 'chord' || voicingMode !== 'voicing' || !availableVoicings.length) {
      return null;
    }
    const safeIndex = Math.min(selectedVoicingIndex, availableVoicings.length - 1);
    return voicingToFretPositions(availableVoicings[safeIndex], tuning);
  }, [mode, voicingMode, availableVoicings, selectedVoicingIndex, tuning]);

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
          className={activeTab === 'ear' ? 'active' : ''}
          onClick={() => setActiveTab('ear')}
        >
          Ear
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
              rootNote={rootNote}
              setRootNote={setRootNote}
              mode={mode}
              setMode={setMode}
              scaleType={scaleType}
              setScaleType={setScaleType}
              chordType={chordType}
              setChordType={setChordType}
              pathModeEnabled={pathModeEnabled}
              setPathModeEnabled={handleSetPathModeEnabled}
              fretRangeWidth={fretRangeWidth}
              setFretRangeWidth={setFretRangeWidth}
              pathDirection={pathDirection}
              setPathDirection={setPathDirection}
              positionMode={positionMode}
              setPositionMode={handleSetPositionMode}
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
              voicingMode={voicingMode}
              setVoicingMode={setVoicingMode}
              selectedVoicingIndex={selectedVoicingIndex}
              setSelectedVoicingIndex={setSelectedVoicingIndex}
              availableVoicings={availableVoicings}
            />

            <Reference
              mode={mode}
              rootNote={rootNote}
              scaleType={scaleType}
              chordType={chordType}
            />

            <FretboardSettings
              tuningKey={tuningKey}
              setTuningKey={setTuningKey}
              tabView={tabView}
              setTabView={setTabView}
              showInlays={showInlays}
              setShowInlays={setShowInlays}
              fretCount={fretCount}
              setFretCount={setFretCount}
              showIntervals={showIntervals}
              setShowIntervals={setShowIntervals}
              filteredIntervals={filteredIntervals}
              setFilteredIntervals={setFilteredIntervals}
              rootNote={rootNote}
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
              positionMode={positionMode}
              positionStartFret={selectedPosition}
              showInlays={showInlays}
              voicingPositions={voicingPositions}
            />
          </>
        ) : activeTab === 'practice' ? (
          <>
            <Practice
              tuning={tuning}
              onReset={handlePracticeReset}
              onHighlightChange={handlePracticeHighlightChange}
              showIntervals={practiceShowIntervals}
              setShowIntervals={setPracticeShowIntervals}
            />

            <FretboardSettings
              tuningKey={tuningKey}
              setTuningKey={setTuningKey}
              tabView={tabView}
              setTabView={setTabView}
              showInlays={showInlays}
              setShowInlays={setShowInlays}
              fretCount={fretCount}
              setFretCount={setFretCount}
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
              showInlays={showInlays}
              voicingPositions={practiceVoicingPositions}
            />
          </>
        ) : activeTab === 'ear' ? (
          <>
            <EarTraining
              tuning={tuning}
              onHighlightChange={handleEarTrainingHighlightChange}
            />

            <FretboardSettings
              tuningKey={tuningKey}
              setTuningKey={setTuningKey}
              tabView={tabView}
              setTabView={setTabView}
              showInlays={showInlays}
              setShowInlays={setShowInlays}
              fretCount={fretCount}
              setFretCount={setFretCount}
            />

            <Fretboard
              tuning={tuning}
              highlightedNotes={earHighlightedNotes}
              rootNote={earRootNote}
              showIntervals={false}
              mode="chord"
              tabView={tabView}
              practiceMode={true}
              practiceShowHighlights={earShowHighlights}
              practiceShowRootHint={earShowRootHint}
              fretCount={fretCount}
              showInlays={showInlays}
            />
          </>
        ) : activeTab === 'jam' ? (
          <>
            <Jam
              tuning={tuning}
              tabView={tabView}
              onHighlightChange={handleJamHighlightChange}
            />

            <FretboardSettings
              tuningKey={tuningKey}
              setTuningKey={setTuningKey}
              tabView={tabView}
              setTabView={setTabView}
              showInlays={showInlays}
              setShowInlays={setShowInlays}
              fretCount={fretCount}
              setFretCount={setFretCount}
            />

            <Fretboard
              tuning={tuning}
              highlightedNotes={jamHighlight.notes}
              rootNote={jamHighlight.rootNote}
              showIntervals={false}
              mode={jamHighlight.mode}
              tabView={tabView}
              fretCount={fretCount}
              voicingPositions={jamHighlight.voicingPositions}
              showInlays={showInlays}
            />
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export default App;
