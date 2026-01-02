import { useState, useCallback, useEffect } from 'react';
import { NOTES, getNoteOnFret, FRET_COUNT } from '../../data/notes';
import './Practice.css';

function Practice({ tuning, onReset }) {
  const [quizType, setQuizType] = useState('note'); // 'note' or 'fret'
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

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

  const generateQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    // Reset revealed frets when generating new question
    if (onReset) {
      onReset();
    }

    if (quizType === 'note') {
      setQuestion(generateNoteQuestion());
    } else {
      setQuestion(generateFretQuestion());
    }
  }, [quizType, generateNoteQuestion, generateFretQuestion, onReset]);

  useEffect(() => {
    generateQuestion();
  }, [quizType, tuning]);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);

    let correct;
    if (question.type === 'note') {
      correct = answer === question.correctAnswer;
    } else {
      correct = question.correctAnswers.includes(answer);
    }

    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1)
    }));
  };

  const getButtonClass = (option) => {
    if (selectedAnswer === null) return '';

    if (question.type === 'note') {
      if (option === question.correctAnswer) return 'correct';
      if (option === selectedAnswer && option !== question.correctAnswer) return 'incorrect';
    } else {
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

      <p className="hint-text">💡 Click any fret on the fretboard below to reveal its note as a hint</p>

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
        ) : (
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
        )}

        {selectedAnswer !== null && (
          <>
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? 'Correct!' : question.type === 'note'
                ? `Incorrect. The answer is ${question.correctAnswer}`
                : `Incorrect. ${question.targetNote} is on fret${question.correctAnswers.length > 1 ? 's' : ''} ${question.correctAnswers.join(', ')}`
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
