import { useState, useMemo, useCallback } from 'react';
import Fretboard from './components/Fretboard/Fretboard';
import Controls from './components/Controls/Controls';
import Reference from './components/Reference/Reference';
import Practice from './components/Practice/Practice';
import Jam from './components/Jam/Jam';
import Footer from './components/Footer/Footer';
import { TUNINGS, DEFAULT_TUNING } from './data/tunings';
import { getScaleNotes, getChordNotes } from './utils/musicTheory';
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

  // Jam mode state
  const [jamHighlight, setJamHighlight] = useState({ notes: [], rootNote: 'A', mode: 'scale' });
  const handleJamHighlightChange = useCallback((data) => {
    setJamHighlight(data);
  }, []);

  // Computed highlighted notes
  const highlightedNotes = useMemo(() => {
    if (mode === 'scale') {
      return getScaleNotes(rootNote, scaleType);
    } else {
      return getChordNotes(rootNote, chordType);
    }
  }, [rootNote, mode, scaleType, chordType]);

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

            <Practice tuning={tuning} />

            <Fretboard
              tuning={tuning}
              highlightedNotes={[]}
              rootNote={rootNote}
              showIntervals={false}
              mode={mode}
              tabView={tabView}
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
            />
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export default App;
