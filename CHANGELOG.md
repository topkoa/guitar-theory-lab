# Changelog

All notable changes to Guitar Theory Lab will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.23] - 2026-01-09

### Added
- Expanded chord voicing library with 50+ new voicings
  - CAGED system shapes: Added G-shape, D-shape, and C-shape for major, minor, dom7, min7, maj7
  - Power chords: Open voicings (E5, A5, D5, G5, C5) and moveable shapes (E5, A5, D5 with/without octave)
  - Extended chords: add9 (C, G, D, A, E), dom9 (E, A, G), maj9 (C, G, F), min9 (A, E, D)
  - Moveable extended shapes: add9, dom9, maj9, min9 with E-shape and A-shape barre voicings
  - Jazz voicing: dom9 funk shape (4-string voicing)
- All new voicings include difficulty ratings and category tags
- Updated src/data/voicings.js with comprehensive voicing definitions

## [0.0.22] - 2026-01-08

### Fixed
- Chord voicing highlights now update correctly when tuning changes
  - Open voicings (C Open, G Open, etc.) are now only shown in standard tuning
  - Updated src/utils/voicingUtils.js getVoicingsForChord() to filter open voicings by tuning
  - Added tuning check using isStandardTuning() before including open voicings
  - Open voicings are hardcoded for standard tuning and don't work in alternate tunings
- Voicing selection now resets to first voicing when tuning changes
  - Updated src/App.jsx to reset selectedVoicingIndex on tuning change (Learn mode)
  - Added tuningKey to useEffect dependency array (line 113)
- Jam mode voicing indices reset when tuning changes
  - Updated src/components/Jam/Jam.jsx to reset all step voicing indices
  - Added useEffect to map sequence and reset selectedVoicingIndex to 0 (lines 68-76)
  - Prevents invalid voicing indices when available voicings change between tunings

## [0.0.21] - 2026-01-08

### Added
- Chord voicing/position cycling feature
  - Toggle between "All Notes" and "Voicing" view when viewing chords
  - Cycle through playable chord shapes with prev/next arrows and dropdown
  - New files: src/data/voicings.js (chord voicing data), src/utils/voicingUtils.js (utilities)
  - New component: src/components/VoicingControls/ for voicing selection UI
- Predefined voicings for common chords
  - Open chord shapes: C, G, D, A, E, F major; Am, Em, Dm minor; plus 7th chords
  - Moveable barre shapes: E-shape and A-shape for major, minor, dom7, min7, maj7
- Algorithmic voicing generation for chords without predefined shapes
  - Generates playable positions based on fret span constraints
  - Fallback for any chord type in any key
- Learn mode voicing integration
  - VoicingControls component appears when in chord mode
  - Shows muted string indicators (X) next to string labels for voicing mode
  - Dimmed notes show chord tones not in current voicing
- Jam mode per-step voicing controls
  - Each chord step has "All" / "Shape" toggle
  - Prev/next navigation when in Shape mode
  - Voicing positions passed to fretboard for accurate display
- Practice mode "Name That Shape" quiz
  - New quiz type that shows a specific voicing
  - User identifies the chord (root + type) from the shape
  - Uses same hint options as "Name That Chord" quiz

### Changed
- Updated src/App.jsx with voicing state management
- Updated src/components/Controls/Controls.jsx to integrate VoicingControls
- Updated src/components/Fretboard/Fretboard.jsx to render voicing positions
- Updated src/components/Jam/Jam.jsx with voicing support per step
- Updated src/components/Jam/SequenceStep.jsx with voicing controls UI
- Updated src/components/Practice/Practice.jsx with shape quiz type

## [0.0.20] - 2026-01-05

### Changed
- Streamlined settings UI architecture
  - Created new FretboardSettings component (src/components/GlobalSettingsPanel/)
  - Consolidated tuning, fret count, invert, and inlays into inline bar that appears with fretboard in all modes
  - Moved Intervals toggle and Filter dropdown from Controls to FretboardSettings (Learn mode only)
  - Removed duplicate settings controls from Practice and Jam modes
  - Simplified Controls.jsx to only mode/root/type selection and Path Mode
- Simplified Jam mode settings
  - Renamed GlobalSettings to JamSettings with 2 grouped sections (Rhythm, Sound) instead of 4 collapsible
  - Added "Vol:" prefix to metronome and chord audio volume sliders for clarity
  - Restored BPM slider in transport controls alongside number input
  - Simplified SequenceStep per-step overrides to keep only time signature override

### Removed
- Deleted src/components/Jam/GlobalSettings.jsx and GlobalSettings.css (replaced by JamSettings)
- Removed redundant tuning/invert controls that were duplicated across modes
- Removed per-step accent pattern, metronome sound, and chord audio overrides from SequenceStep

## [0.0.19] - 2026-01-04

### Added
- Toggleable fretboard inlays feature
  - Pearl-style dot inlays appear on the fretboard wood surface at standard positions (3, 5, 7, 9, 12, 15, 17, 19, 21)
  - Double dots at octave positions (frets 12 and 24)
  - Global "Show Inlays" toggle in header area, applies to all modes (Learn, Practice, Jam)
  - Inlays ON by default to help beginners orient on the neck
  - Added `showInlays` state to src/App.jsx with global toggle UI
  - Added inlay overlay layer in src/components/Fretboard/Fretboard.jsx
  - Added pearl gradient styling in src/components/Fretboard/Fretboard.css
  - Added global settings styling in src/App.css
  - Inlays render behind strings and note dots using z-index layering

## [0.0.18] - 2026-01-04

### Added
- Practice mode: "Learn More" panel for Name That Chord quiz
  - New collapsible panel showing music theory context for each chord type
  - "Learn more" checkbox toggle in hint options (hidden by default)
  - Panel displays four educational sections:
    - **Common Uses**: Genres, musical contexts, and famous artists who use the chord
    - **Tension & Resolution**: How the chord creates or resolves musical tension
    - **Related Chords**: Other chord types that share notes or pair well
    - **Typical Progressions**: Common chord progressions featuring this chord
  - Added `theoryContext` property to all 16 chord definitions in src/data/chords.js
  - Purple-tinted panel styling to distinguish from green strategy hints
  - Comprehensive theory content covering triads, suspended, 7th, and 9th chords
  - Educational content includes genre associations (jazz, rock, funk, R&B, etc.)
  - Added CSS styles for `.learn-more-panel` and `.theory-section` in Practice.css

## [0.0.17] - 2026-01-03

### Added
- Learn mode: Neck traversal path feature for practice visualization (Issue #25)
  - Added "Path Mode" toggle in Controls to enable/disable diagonal path visualization
  - Path shows optimal route for playing scales/chords up and down the neck
  - Diagonal path algorithm creates ascending or descending patterns across strings
  - Direction toggle with "↗ Ascending" and "↙ Descending" buttons
  - Ascending mode: starts at low frets, climbs ~2 frets per string toward body
  - Descending mode: starts at high frets, descends ~2 frets per string toward nut
  - Range slider (±2 to ±8 frets) controls path width for narrow or wide patterns
  - Notes on path remain bright (green for scales, yellow for chords, red for root)
  - Off-path scale/chord notes dimmed to 30% opacity for visual distinction
  - Added calculateNeckTraversalPath() function in src/utils/musicTheory.js
  - Implemented greedy nearest-neighbor algorithm with directional preference
  - Path expands based on fret range window to include nearby alternate positions
  - Works with all scales and chords in both Learn Mode scale and chord views
  - Added pathModeEnabled, fretRangeWidth, and pathDirection state to src/App.jsx
  - Updated src/components/Controls/Controls.jsx with path mode UI controls
  - Updated src/components/Fretboard/Fretboard.jsx with path rendering logic
  - Added .dimmed CSS class in src/components/Fretboard/Fretboard.css
  - Added path control styling in src/components/Controls/Controls.css
  - Path respects tab view (inverted strings) with proper string index mapping
  - Path respects interval filtering - only includes filtered notes
  - Compatible with all tunings (standard, bass, alternate tunings)
  - Handles edge cases: sparse scales, chromatic scale, varying fret counts

## [0.0.16] - 2026-01-03

### Added
- Practice mode: New "Name That Chord" practice mode
  - Added third quiz type alongside "Name the Note" and "Find the Fret"
  - Displays random chord on fretboard with highlighted notes
  - Multiple choice format with 6 options combining root note and chord type (e.g., "C Major", "D♯ Minor 7th")
  - Includes all chord types from chord database for comprehensive learning
  - Chord notes automatically highlighted on fretboard during quiz
  - Added generateChordQuestion() function in src/components/Practice/Practice.jsx
  - Extended mode selector UI to show three buttons
  - Updated answer validation logic to support chord mode
  - Added feedback messages for incorrect chord answers
- Practice mode: Chord identification hint system
  - "Show root note hint" toggle - highlights root note with distinct color to help identify chord center
  - "Show strategy hint" toggle - displays educational guidance on chord identification with interval patterns
  - "Show intervals" toggle - displays interval labels (R, 3, 5, 7, etc.) instead of note names
  - Strategy hints include characteristic sound descriptions and half-step counting for each chord type
  - Covers all chord types: major, minor, diminished, augmented, 7th chords, suspended, and 6th chords
  - Added getChordStrategyHint() function with music theory education content
  - Hint system integrated with fretboard visualization for interactive learning

### Changed
- Practice mode: Expanded quiz type toggle to three buttons
  - Updated src/components/Practice/Practice.jsx with three-option toggle UI
  - Modified src/components/Practice/Practice.css for responsive three-button layout
  - Added flex-wrap and mobile responsive styles (two buttons per row on small screens)
  - Each button has min-width: 120px for consistent sizing
- Practice mode: Enhanced fretboard integration
  - Added practiceHighlightedNotes, practiceRootNote, practiceShowHighlights, practiceShowRootHint, and practiceShowIntervals state to src/App.jsx
  - Added handlePracticeHighlightChange callback to pass chord notes and root from Practice to Fretboard
  - Practice component now controls fretboard highlighting and display modes for chord mode
  - Highlighted notes cleared when switching to note/fret modes
  - Updated src/components/Fretboard/Fretboard.jsx to support practice mode interval display
  - Root note highlighting can be toggled on/off independently in chord mode
- Practice mode: Improved answer rendering logic
  - Updated quiz content rendering to handle three question types
  - Chord mode displays option.label for readable chord names
  - Updated getButtonClass() to treat chord mode like note mode for validation
  - Enhanced feedback messages with proper chord answer display
  - Added styled strategy hint box with green accent for educational tips

## [0.0.15] - 2026-01-03

### Fixed
- Jam mode: Step preview play buttons now work correctly
  - Fixed handlePlayChord in src/components/Jam/Jam.jsx to check step.type
  - Now correctly plays either chord notes or scale notes based on step type
  - Added audio context initialization on first button click (no longer requires main playback first)
  - Removed isChordAudioEnabled conditional from play button in src/components/Jam/SequenceStep.jsx
  - Play button now always visible for both chord and scale steps
  - Button tooltip dynamically shows "Play Chord" or "Play Scale" based on step type
  - Fixed three interconnected bugs that prevented preview functionality

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
