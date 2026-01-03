# Changelog

All notable changes to Guitar Theory Lab will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.14] - 2026-01-03

### Fixed
- Jam mode: Time signature settings no longer incorrectly modify custom accents (Issue #10)
  - Updated src/components/Jam/GlobalSettings.jsx handleTimeSignatureChange function
  - Custom accents array now only modified when accent pattern is set to "custom"
  - Prevents unintended side effects when changing time signature with standard patterns
  - Time signature controls metronome accent pattern cycle
  - Step beats control step duration independently of time signature
  - Per-step time signature overrides work correctly via resolveStepSettings()

## [0.0.13] - 2026-01-03

### Fixed
- Jam mode: Pause and stop now immediately silence chord audio (Issue #11)
  - Modified src/utils/chordSounds.js to return oscillator/gain node references from createChordSound()
  - Added stopActiveOscillators() utility function to immediately silence playing audio
  - Updated src/components/Jam/Jam.jsx to track active oscillators in activeOscillatorsRef
  - handleStop() now silences all active oscillators before stopping playback
  - handlePlay() now silences oscillators when pausing (toggling from play to pause)
  - Automatic cleanup of expired oscillators prevents memory leaks
  - Audio stops immediately when pause or stop is pressed, even mid-chord
  - Uses Web Audio API gain nodes set to 0 for instant silence without audio pops

## [0.0.12] - 2026-01-03

### Fixed
- Jam mode: Step highlighting now persists when paused (Issue #12)
  - Updated src/components/Jam/Jam.jsx line 332 to remove isPlaying condition from isActive prop
  - Current step remains visually highlighted when playback is paused
  - Step highlighting now solely depends on currentStepIndex, not playback state
- Jam mode: Current step info now displays when paused
  - Updated src/components/Jam/TransportControls.jsx line 111 to remove isPlaying condition
  - "Current Step Info" section now shows which step is current even when paused
  - Provides better user feedback about playback position during pause

## [0.0.11] - 2026-01-03

### Added
- Metronome volume control in Jam mode Global Settings
  - New volume slider (0-100%) in Metronome Sound section
  - Default volume set to 50% for balanced sound levels
  - Volume control works with all sound types (beep, click, woodblock)
  - Volume control works with all subdivisions (quarter, eighth, triplet)
  - Maintains accent pattern behavior while scaling overall volume
  - Updated src/utils/jamSettings.js to include volume property in DEFAULT_GLOBAL_SETTINGS
  - Updated src/utils/metronomeSounds.js to accept and apply volume parameter to all sound generators
  - Updated src/components/Jam/useMetronome.js to pass volume from settings to sound generator
  - Updated src/components/Jam/GlobalSettings.jsx to add volume slider UI control
  - Backward compatible with saved presets (defaults to 50% if volume property missing)
  - Reset to Defaults button includes metronome volume

## [0.0.7] - 2026-01-02

### Added
- Adjustable fretboard length slider
  - New slider control to adjust fret count from 12 to 24 frets
  - Displays current fret count above the slider
  - Fretboard dynamically updates in real-time across all modes (Learn, Practice, Jam)
  - Added fret 24 marker position with double dots (2nd octave)
  - Smooth styled slider with hover effects and visual feedback

## [0.0.6] - 2026-01-02

### Added
- Interval/Note filtering functionality in Learn mode
  - New IntervalFilter component with checkboxes for each interval (R, b2, 2, b3, 3, 4, b5, 5, b6, 6, b7, 7)
  - Filter toggles dynamically switch between interval names and actual note names based on root
  - "All" and "None" buttons for quick filter selection
  - Unchecked intervals/notes are hidden from the fretboard display
  - Works seamlessly with both "Show Intervals" mode and note display mode
  - Allows selective study of specific intervals or notes (e.g., hide all 4ths, show only root and 5th, etc.)

## [0.0.5] - 2026-01-02

### Changed
- Footer version now automatically loads from package.json instead of being hardcoded
  - Version updates no longer require manual changes to Footer component
  - Eliminates version sync issues between package.json and UI

## [0.0.4] - 2026-01-02

### Fixed
- Fixed metronome timing issues in Jam mode caused by incorrect React hook usage
  - Changed `useMemo` to `useEffect` for parent component updates (Jam.jsx:138)
  - Removed `scheduler` from useEffect dependencies to prevent mid-playback resets (useMetronome.js:110)
  - Metronome now maintains consistent timing without skipping beats
  - Eliminated React warning: "Cannot update a component while rendering a different component"

## [0.0.3] - 2026-01-02

### Added
- Custom favicon with fretboard design and highlighted notes
- Updated page title to "Guitar Theory Lab"

### Changed
- Fixed package name from "guitar" to "guitar-theory-lab"

## [0.0.2] - 2026-01-02

### Fixed
- Practice mode now completely hides notes on the fretboard instead of showing them in grey
- Notes are no longer visible until intentionally revealed

### Added
- Click-to-reveal hint system in Practice mode
  - Users can click any fret to reveal its note as a hint
  - Revealed frets are highlighted with the accent color
  - All revealed frets reset when moving to the next question
- Helpful instruction text explaining the hint feature

## [0.0.1] - 2026-01-02

### Fixed
- Fixed metronome timing when switching between sequence steps in Jam mode
  - Replaced setTimeout-based step transitions with synchronous beat counting
  - Step changes now happen exactly on beat, synchronized with Web Audio clock
  - Fixed off-by-one error where steps were switching one beat too early

### Added
- Bass guitar support (4, 5, and 6-string configurations)
- Live demo deployment to GitHub Pages
- Comprehensive documentation in README

### Initial Features
- Interactive fretboard visualization for guitar and bass
- Learn mode with scales and chords reference
- Practice mode with randomized note identification
- Jam mode with chord/scale sequencer and metronome
- Support for multiple tunings (Standard, Drop D, DADGAD, etc.)
- Interval display option
- Tab view (inverted strings) option
