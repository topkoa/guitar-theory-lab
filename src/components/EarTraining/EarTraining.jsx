import { useState, useCallback, useEffect, useRef } from 'react';
import { NOTES, getNoteAtInterval } from '../../data/notes';
import {
  INTERVALS,
  CHORD_QUALITIES,
  getIntervalsByDifficulty,
  getChordQualitiesByDifficulty
} from '../../data/intervals';
import {
  playInterval,
  playChordForEarTraining,
  playArpeggio,
  getAudioContext,
  stopAllNotes
} from '../../utils/noteAudio';
import './EarTraining.css';

function EarTraining({ tuning, onHighlightChange }) {
  // Exercise state
  const [exerciseType, setExerciseType] = useState('interval'); // 'interval' | 'chordQuality' | 'rootNote'
  const [difficulty, setDifficulty] = useState('easy');
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [playbackMode, setPlaybackMode] = useState('block'); // 'block' | 'arpeggio' (for chord exercises)

  // Audio context
  const audioContextRef = useRef(null);
  const activeNodesRef = useRef([]);

  // Initialize audio context on first user interaction
  const ensureAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = getAudioContext();
    }
    return audioContextRef.current;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (activeNodesRef.current.length > 0 && audioContextRef.current) {
        stopAllNotes(activeNodesRef.current, audioContextRef.current);
      }
    };
  }, []);

  // Generate interval question
  const generateIntervalQuestion = useCallback(() => {
    const availableIntervals = getIntervalsByDifficulty(difficulty);
    const intervalKey = availableIntervals[Math.floor(Math.random() * availableIntervals.length)];
    const interval = INTERVALS[intervalKey];

    // Pick a random root note
    const rootNote = NOTES[Math.floor(Math.random() * NOTES.length)];

    // Calculate the second note
    const secondNote = getNoteAtInterval(rootNote, interval.semitones);

    // Generate answer options (correct + wrong answers)
    const options = [intervalKey];
    while (options.length < Math.min(4, availableIntervals.length)) {
      const wrongKey = availableIntervals[Math.floor(Math.random() * availableIntervals.length)];
      if (!options.includes(wrongKey)) {
        options.push(wrongKey);
      }
    }

    return {
      type: 'interval',
      rootNote,
      secondNote,
      intervalKey,
      semitones: interval.semitones,
      correctAnswer: intervalKey,
      options: options.sort(() => Math.random() - 0.5)
    };
  }, [difficulty]);

  // Generate chord quality question
  const generateChordQualityQuestion = useCallback(() => {
    const availableQualities = getChordQualitiesByDifficulty(difficulty);
    const qualityKey = availableQualities[Math.floor(Math.random() * availableQualities.length)];
    const quality = CHORD_QUALITIES[qualityKey];

    // Pick a random root note
    const rootNote = NOTES[Math.floor(Math.random() * NOTES.length)];

    // Calculate chord notes
    const chordNotes = quality.intervals.map(interval => getNoteAtInterval(rootNote, interval));

    // Generate answer options
    const options = [qualityKey];
    while (options.length < Math.min(4, availableQualities.length)) {
      const wrongKey = availableQualities[Math.floor(Math.random() * availableQualities.length)];
      if (!options.includes(wrongKey)) {
        options.push(wrongKey);
      }
    }

    return {
      type: 'chordQuality',
      rootNote,
      qualityKey,
      chordNotes,
      correctAnswer: qualityKey,
      options: options.sort(() => Math.random() - 0.5)
    };
  }, [difficulty]);

  // Generate root note question
  const generateRootNoteQuestion = useCallback(() => {
    const availableQualities = getChordQualitiesByDifficulty(difficulty);
    const qualityKey = availableQualities[Math.floor(Math.random() * availableQualities.length)];
    const quality = CHORD_QUALITIES[qualityKey];

    // Pick a random root note
    const rootNote = NOTES[Math.floor(Math.random() * NOTES.length)];

    // Calculate chord notes
    const chordNotes = quality.intervals.map(interval => getNoteAtInterval(rootNote, interval));

    // Generate answer options (all 12 notes, limited to 6 for UI)
    const options = [rootNote];
    while (options.length < 6) {
      const wrongNote = NOTES[Math.floor(Math.random() * NOTES.length)];
      if (!options.includes(wrongNote)) {
        options.push(wrongNote);
      }
    }

    return {
      type: 'rootNote',
      rootNote,
      qualityKey,
      chordNotes,
      correctAnswer: rootNote,
      options: options.sort(() => Math.random() - 0.5)
    };
  }, [difficulty]);

  // Generate question based on exercise type
  const generateQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setHasPlayed(false);
    setShowHint(false);

    // Clear fretboard highlight
    if (onHighlightChange) {
      onHighlightChange([], 'C', false, false, null);
    }

    let newQuestion;
    if (exerciseType === 'interval') {
      newQuestion = generateIntervalQuestion();
    } else if (exerciseType === 'chordQuality') {
      newQuestion = generateChordQualityQuestion();
    } else if (exerciseType === 'rootNote') {
      newQuestion = generateRootNoteQuestion();
    }

    setQuestion(newQuestion);
  }, [exerciseType, generateIntervalQuestion, generateChordQualityQuestion, generateRootNoteQuestion, onHighlightChange]);

  // Generate new question when exercise type or difficulty changes
  useEffect(() => {
    generateQuestion();
  }, [exerciseType, difficulty]);

  // Play the current question's audio
  const handlePlay = useCallback(() => {
    if (!question) return;

    const ctx = ensureAudioContext();

    // Stop any currently playing sounds
    if (activeNodesRef.current.length > 0) {
      stopAllNotes(activeNodesRef.current, ctx);
    }

    if (question.type === 'interval') {
      activeNodesRef.current = playInterval(ctx, question.rootNote, question.semitones, {
        octave: 4,
        volume: 0.35,
        noteDuration: 0.8,
        gapDuration: 0.2
      });
    } else if (question.type === 'chordQuality' || question.type === 'rootNote') {
      if (playbackMode === 'arpeggio') {
        activeNodesRef.current = playArpeggio(ctx, question.chordNotes, {
          baseOctave: 3,
          volume: 0.3,
          noteDuration: 0.5,
          gapDuration: 0.1
        });
      } else {
        activeNodesRef.current = playChordForEarTraining(ctx, question.chordNotes, {
          baseOctave: 3,
          volume: 0.25,
          duration: 1.8
        });
      }
    }

    setHasPlayed(true);
  }, [question, ensureAudioContext, playbackMode]);

  // Handle answer selection
  const handleAnswer = useCallback((answer) => {
    if (selectedAnswer !== null || !hasPlayed) return;

    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);

    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1)
    }));

    // Show the answer on fretboard
    if (onHighlightChange && question) {
      if (question.type === 'interval') {
        onHighlightChange(
          [question.rootNote, question.secondNote],
          question.rootNote,
          true,
          true,
          null
        );
      } else {
        onHighlightChange(
          question.chordNotes,
          question.rootNote,
          true,
          true,
          null
        );
      }
    }
  }, [selectedAnswer, hasPlayed, question, onHighlightChange]);

  // Get button class based on answer state
  const getButtonClass = (option) => {
    if (selectedAnswer === null) return '';
    if (option === question.correctAnswer) return 'correct';
    if (option === selectedAnswer && option !== question.correctAnswer) return 'incorrect';
    return '';
  };

  // Get feedback message
  const getFeedbackMessage = () => {
    if (isCorrect) return 'Correct!';

    if (question.type === 'interval') {
      const interval = INTERVALS[question.correctAnswer];
      return `Incorrect. The answer is ${interval.name}`;
    } else if (question.type === 'chordQuality') {
      const quality = CHORD_QUALITIES[question.correctAnswer];
      return `Incorrect. The answer is ${quality.name}`;
    } else {
      return `Incorrect. The root note is ${question.correctAnswer}`;
    }
  };

  if (!question) return null;

  return (
    <div className="ear-training-panel">
      <div className="ear-training-header">
        <h2>Ear Training</h2>
        <div className="score">
          <span className="correct">Correct: {score.correct}</span>
          <span className="incorrect">Wrong: {score.incorrect}</span>
        </div>
      </div>

      <p className="hint-text">
        🎧 Train your ear to recognize intervals and chord qualities
      </p>

      {/* Exercise type selector */}
      <div className="exercise-type-toggle">
        <button
          className={exerciseType === 'interval' ? 'active' : ''}
          onClick={() => setExerciseType('interval')}
        >
          Intervals
        </button>
        <button
          className={exerciseType === 'chordQuality' ? 'active' : ''}
          onClick={() => setExerciseType('chordQuality')}
        >
          Chord Quality
        </button>
        <button
          className={exerciseType === 'rootNote' ? 'active' : ''}
          onClick={() => setExerciseType('rootNote')}
        >
          Root Note
        </button>
      </div>

      {/* Settings row */}
      <div className="settings-row">
        <div className="difficulty-selector">
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {(exerciseType === 'chordQuality' || exerciseType === 'rootNote') && (
          <div className="playback-mode-selector">
            <label>Playback:</label>
            <select value={playbackMode} onChange={(e) => setPlaybackMode(e.target.value)}>
              <option value="block">Block (all at once)</option>
              <option value="arpeggio">Arpeggiated</option>
            </select>
          </div>
        )}

        <label className="hint-toggle">
          <input
            type="checkbox"
            checked={showHint}
            onChange={(e) => setShowHint(e.target.checked)}
          />
          Show hints
        </label>
      </div>

      <div className="quiz-content">
        {/* Play button */}
        <div className="play-section">
          <button
            className="play-btn"
            onClick={handlePlay}
          >
            {hasPlayed ? '🔄 Replay' : '▶ Play'}
          </button>

          {!hasPlayed && (
            <p className="play-instruction">Click play to hear the {question.type === 'interval' ? 'interval' : 'chord'}</p>
          )}
        </div>

        {/* Question text */}
        {hasPlayed && (
          <>
            <p className="question">
              {question.type === 'interval' ? (
                'What interval did you hear?'
              ) : question.type === 'chordQuality' ? (
                'What type of chord did you hear?'
              ) : (
                'What is the root note of the chord?'
              )}
            </p>

            {/* Hint section */}
            {showHint && question.type === 'interval' && (
              <div className="hint-panel">
                {question.options.map(key => {
                  const interval = INTERVALS[key];
                  return (
                    <div key={key} className="hint-item">
                      <strong>{interval.shortName}</strong>: {interval.songReference}
                      <span className="hint-artist"> - {interval.songArtist}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {showHint && (question.type === 'chordQuality' || question.type === 'rootNote') && (
              <div className="hint-panel">
                {question.type === 'chordQuality' ? (
                  question.options.map(key => {
                    const quality = CHORD_QUALITIES[key];
                    return (
                      <div key={key} className="hint-item">
                        <strong>{quality.name}</strong>: {quality.description}
                      </div>
                    );
                  })
                ) : (
                  <div className="hint-item">
                    Listen for the lowest, most prominent note in the chord. That&apos;s usually the root.
                  </div>
                )}
              </div>
            )}

            {/* Answer options */}
            <div className="answer-options">
              {question.options.map(option => {
                let label;
                if (question.type === 'interval') {
                  label = INTERVALS[option].name;
                } else if (question.type === 'chordQuality') {
                  label = CHORD_QUALITIES[option].name;
                } else {
                  label = option;
                }

                return (
                  <button
                    key={option}
                    className={`answer-btn ${getButtonClass(option)}`}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Feedback and next button */}
            {selectedAnswer !== null && (
              <>
                <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {getFeedbackMessage()}
                </div>

                {/* Show additional info on correct/incorrect */}
                {question.type === 'interval' && (
                  <div className="answer-detail">
                    <strong>{INTERVALS[question.correctAnswer].name}</strong>
                    <p>{INTERVALS[question.correctAnswer].description}</p>
                    <p className="song-ref">
                      🎵 Remember: {INTERVALS[question.correctAnswer].songReference}
                    </p>
                  </div>
                )}

                {question.type === 'chordQuality' && (
                  <div className="answer-detail">
                    <strong>{CHORD_QUALITIES[question.correctAnswer].name}</strong>
                    <p>{CHORD_QUALITIES[question.correctAnswer].description}</p>
                  </div>
                )}

                <button className="next-btn" onClick={generateQuestion}>
                  Next Question
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default EarTraining;
