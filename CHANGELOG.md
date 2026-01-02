# Changelog

All notable changes to Guitar Theory Lab will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
