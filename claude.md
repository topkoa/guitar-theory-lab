# Claude Context - Guitar Theory Lab

This file contains important context for Claude Code when working on the Guitar Theory Lab project.

## Project Overview

Guitar Theory Lab is a web application for learning guitar theory with an interactive fretboard, scale/chord reference, practice quizzes, and a jam mode for playing along with chord progressions.

- **Live Demo**: https://topkoa.github.io/guitar-theory-lab/
- **Technology Stack**: React 19 + Vite 7
- **Build Tool**: Vite (NOT Create React App, NOT Webpack)
- **Deployment**: GitHub Pages (automated via gh-pages package)

## Development Commands

### Running the App
```bash
npm run dev          # Start Vite dev server at http://localhost:5173
npm run build        # Create production build in dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run deploy       # Build and deploy to GitHub Pages
```

**Important**: This project uses **Vite**, not Create React App. The dev server runs on port 5173 by default.

## Versioning and Release Process

### When Making Changes That Should Be Released:

1. **Update package.json version**
   - Location: `package.json` line 4
   - Follow semantic versioning: `0.0.X` for patches, `0.X.0` for minor, `X.0.0` for major
   - Current version: 0.0.10

2. **Update CHANGELOG.md**
   - Add new version section at the top (after the format description)
   - Format: `## [X.X.X] - YYYY-MM-DD`
   - Categorize changes under: Added, Changed, Fixed, Removed
   - Be specific and include file locations for technical changes
   - Follow Keep a Changelog format: https://keepachangelog.com/

3. **Create release branch**
   - Pattern: `release/vX.X.X` (e.g., `release/v0.0.10`)
   - Commit message pattern: `Release vX.X.X: Brief description of main change`

4. **Commit and push**
   - Commit all changes (package.json, CHANGELOG.md, and code changes)
   - Push branch to remote
   - Create PR to master branch
   - User will merge manually

5. **Deploy to GitHub Pages**
   - Run: `npm run deploy`
   - This builds and publishes to gh-pages branch automatically

### Changelog Format Example
```markdown
## [0.0.10] - 2026-01-03

### Changed
- Root note dropdowns now display enharmonic equivalents (e.g., C♯/D♭)
  - Updated src/data/notes.js with getNoteDisplayName() helper
  - Modified dropdowns in src/components/Controls/Controls.jsx
  - Modified dropdowns in src/components/Jam/SequenceStep.jsx
  - Uses Unicode musical symbols: ♯ (U+266F) and ♭ (U+266D)
  - Internal values remain as sharps for backward compatibility
```

## Project Structure

### Key Directories
```
src/
├── data/              # Data definitions
│   ├── notes.js       # Note definitions, ENHARMONIC mapping, helpers
│   ├── tunings.js     # Guitar/bass tuning presets
│   ├── scales.js      # Scale definitions with intervals
│   └── chords.js      # Chord definitions with intervals
├── utils/
│   └── musicTheory.js # Music theory helper functions
└── components/
    ├── Fretboard/     # Interactive fretboard display
    ├── Controls/      # Learn mode controls (tuning, root, scale/chord)
    ├── Reference/     # Scale/chord information panel
    ├── Practice/      # Quiz components
    └── Jam/           # Chord progression sequencer
        └── SequenceStep.jsx # Individual step controls
```

### Important Files
- `package.json` - Version number (line 4), dependencies, scripts
- `CHANGELOG.md` - All version history and changes
- `src/data/notes.js` - Source of truth for note definitions and enharmonics
- `src/App.jsx` - Main application component, mode routing
- `src/components/Footer.jsx` - Displays version from package.json

## Architecture Patterns

### Data Flow
- Notes defined in `src/data/notes.js` as NOTES array (sharps only: C, C#, D, etc.)
- ENHARMONIC object maps sharps to flats (e.g., 'C#' → 'Db')
- Display transformations via helper functions (e.g., `getNoteDisplayName()`)
- Internal state always uses sharp notation for consistency

### React Patterns
- Functional components with hooks (useState, useEffect, useRef, useMemo)
- Props passed down from App.jsx to control modes
- Custom hooks in Jam mode (useMetronome.js, useAudio.js)
- Web Audio API for metronome timing (synchronous, not setTimeout)

### Styling
- CSS variables defined in `src/index.css`
- Component-level CSS in separate files (e.g., Controls.css)
- Responsive design with flexbox

## Common Tasks

### Adding a New Feature
1. Identify which mode it affects (Learn, Practice, Jam)
2. Check if data definitions need updates (notes.js, scales.js, chords.js)
3. Update relevant components
4. Test in dev mode (`npm run dev`)
5. Build to verify no errors (`npm run build`)
6. Update version and changelog
7. Create release branch and PR
8. Deploy to GitHub Pages after merge

### Modifying Root Note Dropdowns
- Both Learn and Jam modes have root note dropdowns
- Learn mode: `src/components/Controls/Controls.jsx` (lines ~122-124)
- Jam mode: `src/components/Jam/SequenceStep.jsx` (lines ~78-80)
- Display logic: `getNoteDisplayName()` in `src/data/notes.js`
- Internal values: Always use sharp notation from NOTES array

### Working with Audio
- Metronome uses Web Audio API (requires user interaction to start)
- Audio context created in Jam mode
- Timing is synchronous via AudioContext.currentTime
- No setTimeout for timing-critical operations

## Browser Considerations

- Modern browsers only (Chrome, Firefox, Safari, Edge)
- Web Audio API requires user interaction before playing
- Audio context may be suspended until user clicks
- Runs fully client-side (no backend required)

## Git Workflow

- Main branch: `master`
- Feature branches: `feature/description`
- Release branches: `release/vX.X.X`
- Always create branches for version releases
- User handles PR merging manually
- gh-pages branch managed automatically by deploy script

## Dependencies

### Production
- react: ^19.2.0
- react-dom: ^19.2.0

### Development
- vite: ^7.2.4
- @vitejs/plugin-react: ^5.1.1
- eslint: ^9.39.1
- gh-pages: ^6.3.0

## Important Notes

- Version number appears in Footer component (loaded from package.json)
- Always test with `npm run build` before releasing
- CHANGELOG.md must be updated with every version change
- Use Unicode musical symbols for professional appearance: ♯ (sharp), ♭ (flat), ♮ (natural)
- Maintain backward compatibility with existing presets and state
- Display transformations should not affect internal data structures
