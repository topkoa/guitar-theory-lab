import { useState, useCallback, useEffect, useMemo } from 'react';
import { NOTES, getNoteOnFret, FRET_COUNT } from '../../data/notes';
import { CHORDS } from '../../data/chords';
import { getChordNotes } from '../../utils/musicTheory';
import './Practice.css';

function Practice({ tuning, onReset, onHighlightChange, showIntervals, setShowIntervals }) {
  const [quizType, setQuizType] = useState('note'); // 'note' or 'fret'
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showRootHint, setShowRootHint] = useState(false);
  const [showStrategyHint, setShowStrategyHint] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  // Generate string names dynamically based on tuning
  const getStringName = (idx) => {
    const ordinals = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
    const note = tuning[idx];
    return `${ordinals[idx]} (${note})`;
  };

  const generateNoteQuestion = useCallback(() => {
    const stringIdx = Math.floor(Math.random() * tuning.length);
    const fret = Math.floor(Math.random() * 13); // 0-12 for reasonable range
    const correctNote = getNoteOnFret(tuning[stringIdx], fret);

    return {
      type: 'note',
      stringIdx,
      fret,
      correctAnswer: correctNote,
      options: NOTES
    };
  }, [tuning]);

  const generateFretQuestion = useCallback(() => {
    const stringIdx = Math.floor(Math.random() * tuning.length);
    const targetNote = NOTES[Math.floor(Math.random() * 12)];

    // Find all frets where this note appears on this string (0-12)
    const correctFrets = [];
    for (let fret = 0; fret <= 12; fret++) {
      if (getNoteOnFret(tuning[stringIdx], fret) === targetNote) {
        correctFrets.push(fret);
      }
    }

    // Generate options including correct answer(s) and some wrong ones
    const options = new Set(correctFrets);
    while (options.size < 4) {
      const randomFret = Math.floor(Math.random() * 13);
      options.add(randomFret);
    }

    return {
      type: 'fret',
      stringIdx,
      targetNote,
      correctAnswers: correctFrets,
      options: Array.from(options).sort((a, b) => a - b)
    };
  }, [tuning]);

  const generateChordQuestion = useCallback(() => {
    // Get all available chord types
    const chordTypes = Object.keys(CHORDS);

    // Pick random root note and chord type
    const rootNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    const correctChordType = chordTypes[Math.floor(Math.random() * chordTypes.length)];

    // Get the notes for this chord
    const chordNotes = getChordNotes(rootNote, correctChordType);

    // Generate wrong answer options (5 total wrong answers)
    const wrongAnswers = [];
    while (wrongAnswers.length < 5) {
      const wrongRoot = NOTES[Math.floor(Math.random() * NOTES.length)];
      const wrongType = chordTypes[Math.floor(Math.random() * chordTypes.length)];
      const answerKey = `${wrongRoot}-${wrongType}`;

      // Don't include the correct answer
      if (wrongRoot === rootNote && wrongType === correctChordType) continue;

      // Avoid duplicates
      if (wrongAnswers.some(a => a.key === answerKey)) continue;

      wrongAnswers.push({
        key: answerKey,
        label: `${wrongRoot} ${CHORDS[wrongType].name}`,
        root: wrongRoot,
        type: wrongType
      });
    }

    // Add correct answer and shuffle
    const allOptions = [
      {
        key: `${rootNote}-${correctChordType}`,
        label: `${rootNote} ${CHORDS[correctChordType].name}`,
        root: rootNote,
        type: correctChordType
      },
      ...wrongAnswers
    ].sort(() => Math.random() - 0.5);

    return {
      type: 'chord',
      rootNote,
      chordType: correctChordType,
      chordNotes,
      correctAnswer: `${rootNote}-${correctChordType}`,
      options: allOptions
    };
  }, []);

  const getChordStrategyHint = (chordType) => {
    const hints = {
      'major': 'Look for a bright, happy sound. Count 4 half-steps from root to the 3rd, then 3 more to the 5th.',
      'minor': 'Listen for a sad, dark quality. Count 3 half-steps from root to the minor 3rd, then 4 more to the 5th.',
      'diminished': 'This chord sounds tense and unresolved. It has a minor 3rd (3 half-steps) and a diminished 5th (6 half-steps from root).',
      'augmented': 'This chord sounds suspenseful. It has a major 3rd (4 half-steps) and an augmented 5th (8 half-steps from root).',
      'major7': 'A jazzy, sophisticated sound. It\'s a major triad with a major 7th added (11 half-steps from root).',
      'minor7': 'Common in jazz and blues. Minor triad with a minor 7th added (10 half-steps from root).',
      'dominant7': 'The classic "blues" chord. Major triad with a minor 7th (10 half-steps from root).',
      'diminished7': 'Very tense, symmetrical chord. Minor 3rd intervals stacked: 3, 6, and 9 half-steps from root.',
      'sus2': 'Suspended sound - replaces the 3rd with the 2nd (2 half-steps from root). Neither major nor minor.',
      'sus4': 'Suspended sound - replaces the 3rd with the 4th (5 half-steps from root). Creates tension.',
      'major6': 'Sweet, nostalgic sound. Major triad with a major 6th added (9 half-steps from root).',
      'minor6': 'Melancholic but colorful. Minor triad with a major 6th (9 half-steps from root).',
    };
    return hints[chordType] || 'Look at the intervals between the notes to identify the chord quality.';
  };

  const generateQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    // Reset revealed frets when generating new question
    if (onReset) {
      onReset();
    }

    if (quizType === 'note') {
      setQuestion(generateNoteQuestion());
    } else if (quizType === 'fret') {
      setQuestion(generateFretQuestion());
    } else if (quizType === 'chord') {
      setQuestion(generateChordQuestion());
    }
  }, [quizType, generateNoteQuestion, generateFretQuestion, generateChordQuestion, onReset]);

  useEffect(() => {
    generateQuestion();
  }, [quizType, tuning]);

  // Update highlighted notes for chord mode
  useEffect(() => {
    if (onHighlightChange) {
      if (quizType === 'chord' && question?.chordNotes && question?.rootNote) {
        onHighlightChange(question.chordNotes, question.rootNote, true, showRootHint);
      } else {
        onHighlightChange([], 'C', false, false);
      }
    }
  }, [quizType, question, onHighlightChange, showRootHint]);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);

    let correct;
    if (question.type === 'note') {
      correct = answer === question.correctAnswer;
    } else if (question.type === 'fret') {
      correct = question.correctAnswers.includes(answer);
    } else if (question.type === 'chord') {
      correct = answer === question.correctAnswer;
    }

    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1)
    }));
  };

  const getButtonClass = (option) => {
    if (selectedAnswer === null) return '';

    if (question.type === 'note' || question.type === 'chord') {
      if (option === question.correctAnswer) return 'correct';
      if (option === selectedAnswer && option !== question.correctAnswer) return 'incorrect';
    } else if (question.type === 'fret') {
      if (question.correctAnswers.includes(option)) return 'correct';
      if (option === selectedAnswer && !question.correctAnswers.includes(option)) return 'incorrect';
    }
    return '';
  };

  if (!question) return null;

  return (
    <div className="practice-panel">
      <div className="practice-header">
        <h2>Practice Mode</h2>
        <div className="score">
          <span className="correct">Correct: {score.correct}</span>
          <span className="incorrect">Wrong: {score.incorrect}</span>
        </div>
      </div>

      <p className="hint-text">
        {quizType === 'chord'
          ? '🎸 Identify the chord displayed on the fretboard'
          : '💡 Click any fret on the fretboard below to reveal its note as a hint'
        }
      </p>

      {quizType === 'chord' && (
        <div className="hint-toggle-container">
          <label className="hint-toggle">
            <input
              type="checkbox"
              checked={showRootHint}
              onChange={(e) => setShowRootHint(e.target.checked)}
            />
            Show root note hint
          </label>
          <label className="hint-toggle">
            <input
              type="checkbox"
              checked={showStrategyHint}
              onChange={(e) => setShowStrategyHint(e.target.checked)}
            />
            Show strategy hint
          </label>
          <label className="hint-toggle">
            <input
              type="checkbox"
              checked={showIntervals}
              onChange={(e) => setShowIntervals(e.target.checked)}
            />
            Show intervals
          </label>
          <label className="hint-toggle">
            <input
              type="checkbox"
              checked={showLearnMore}
              onChange={(e) => setShowLearnMore(e.target.checked)}
            />
            Learn more
          </label>
        </div>
      )}

      <div className="quiz-type-toggle">
        <button
          className={quizType === 'note' ? 'active' : ''}
          onClick={() => setQuizType('note')}
        >
          Name the Note
        </button>
        <button
          className={quizType === 'fret' ? 'active' : ''}
          onClick={() => setQuizType('fret')}
        >
          Find the Fret
        </button>
        <button
          className={quizType === 'chord' ? 'active' : ''}
          onClick={() => setQuizType('chord')}
        >
          Name That Chord
        </button>
      </div>

      <div className="quiz-content">
        {question.type === 'note' ? (
          <>
            <p className="question">
              What note is on the <span className="highlight">{getStringName(question.stringIdx)}</span> string,
              fret <span className="highlight">{question.fret}</span>?
            </p>
            <div className="answer-options">
              {question.options.map(note => (
                <button
                  key={note}
                  className={`answer-btn ${getButtonClass(note)}`}
                  onClick={() => handleAnswer(note)}
                  disabled={selectedAnswer !== null}
                >
                  {note}
                </button>
              ))}
            </div>
          </>
        ) : question.type === 'fret' ? (
          <>
            <p className="question">
              Where is <span className="highlight">{question.targetNote}</span> on the
              <span className="highlight"> {getStringName(question.stringIdx)}</span> string?
            </p>
            <div className="answer-options">
              {question.options.map(fret => (
                <button
                  key={fret}
                  className={`answer-btn ${getButtonClass(fret)}`}
                  onClick={() => handleAnswer(fret)}
                  disabled={selectedAnswer !== null}
                >
                  Fret {fret}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="question">
              What chord is displayed on the fretboard?
            </p>
            {showStrategyHint && question.chordType && (
              <div className="strategy-hint">
                💡 {getChordStrategyHint(question.chordType)}
              </div>
            )}
            {showLearnMore && question.chordType && CHORDS[question.chordType]?.theoryContext && (
              <div className="learn-more-panel">
                <h4>About {CHORDS[question.chordType].name} Chords</h4>
                <div className="theory-section">
                  <strong>Common Uses:</strong>
                  <p>{CHORDS[question.chordType].theoryContext.commonUses}</p>
                </div>
                <div className="theory-section">
                  <strong>Tension & Resolution:</strong>
                  <p>{CHORDS[question.chordType].theoryContext.tensionResolution}</p>
                </div>
                <div className="theory-section">
                  <strong>Related Chords:</strong>
                  <p>{CHORDS[question.chordType].theoryContext.relatedChords.map(c => CHORDS[c]?.name || c).join(', ')}</p>
                </div>
                <div className="theory-section">
                  <strong>Typical Progressions:</strong>
                  <ul>
                    {CHORDS[question.chordType].theoryContext.typicalProgressions.map((prog, idx) => (
                      <li key={idx}>{prog}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="answer-options">
              {question.options.map(option => (
                <button
                  key={option.key}
                  className={`answer-btn ${getButtonClass(option.key)}`}
                  onClick={() => handleAnswer(option.key)}
                  disabled={selectedAnswer !== null}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}

        {selectedAnswer !== null && (
          <>
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? 'Correct!' : question.type === 'note'
                ? `Incorrect. The answer is ${question.correctAnswer}`
                : question.type === 'fret'
                ? `Incorrect. ${question.targetNote} is on fret${question.correctAnswers.length > 1 ? 's' : ''} ${question.correctAnswers.join(', ')}`
                : `Incorrect. The answer is ${question.options.find(o => o.key === question.correctAnswer)?.label}`
              }
            </div>
            <button className="next-btn" onClick={generateQuestion}>
              Next Question
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Practice;
