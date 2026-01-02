# Guitar Theory Lab

A web application for learning guitar theory with an interactive fretboard, scale/chord reference, practice quizzes, and a jam mode for playing along with chord progressions.

## Features

### Learn Mode
- **Interactive Fretboard**: 22-fret visualization with note highlighting
- **Scales**: Major, Minor, Pentatonic, Blues, Harmonic Minor, Melodic Minor, and all 7 modes (Dorian, Phrygian, Lydian, Mixolydian, Locrian)
- **Chords**: Major, Minor, Diminished, Augmented, Sus2, Sus4, Dom7, Maj7, Min7, Dim7, m7b5, Add9, Power chords, 9th chords
- **Tuning Presets**: Standard, Drop D, D Standard, Half Step Down, Open G, Open D, Open E, Open A, DADGAD, Drop C
- **Display Options**: Toggle between note names and interval notation (R, 2, b3, 3, etc.)
- **Invert Strings**: Flip the fretboard orientation to match tab view

### Practice Mode
- **Name the Note**: Identify which note is at a given string and fret
- **Find the Fret**: Locate where a specific note appears on a string
- **Score Tracking**: Keep track of correct/incorrect answers per session

### Jam Mode
- **Sequence Builder**: Create chord/scale progressions with multiple steps
- **Per-Step Options**: Choose chord OR scale/mode for each step
- **Tempo Control**: Adjustable BPM (40-240)
- **Metronome**: Optional click track with Web Audio API for precise timing
- **Beat Indicator**: Visual feedback showing current position
- **Loop Toggle**: Repeat the sequence continuously
- **Live Fretboard**: Updates in real-time as each chord/scale plays

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher recommended)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes bundled with Node.js)
  - Verify installation: `npm --version`

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/topkoa/guitar-theory-lab.git
   cd guitar-theory-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages including React, Vite, and ESLint.

## Running the Application

### Development Mode (with hot reload)

```bash
npm run dev
```

This starts the Vite development server. You'll see output like:
```
VITE v7.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open your browser and navigate to **http://localhost:5173**

The development server features:
- **Hot Module Replacement (HMR)**: Changes to your code appear instantly without full page reload
- **Fast Refresh**: React components maintain their state during updates
- **Error Overlay**: Syntax and runtime errors are displayed in the browser

### Production Build

To create an optimized production build:

```bash
npm run build
```

This generates a `dist/` folder with minified, optimized files ready for deployment.

### Preview Production Build

To locally preview the production build:

```bash
npm run preview
```

This serves the `dist/` folder on a local server (typically http://localhost:4173).

## Project Structure

```
guitar-theory-lab/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main application component
│   ├── App.css             # App-level styles
│   ├── index.css           # Global styles and CSS variables
│   ├── data/
│   │   ├── notes.js        # Note definitions and helpers
│   │   ├── tunings.js      # Guitar tuning presets
│   │   ├── scales.js       # Scale definitions with intervals
│   │   └── chords.js       # Chord definitions with intervals
│   ├── utils/
│   │   └── musicTheory.js  # Music theory helper functions
│   └── components/
│       ├── Fretboard/      # Interactive fretboard display
│       ├── Controls/       # Selection controls (tuning, root, scale/chord)
│       ├── Reference/      # Scale/chord information panel
│       ├── Practice/       # Quiz components
│       └── Jam/            # Chord progression sequencer
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check for code issues |

## Browser Support

This application works best in modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: The metronome feature in Jam mode uses the Web Audio API, which requires user interaction before audio can play (browser autoplay policy).

## Troubleshooting

### "command not found: npm"
Node.js is not installed or not in your PATH. Download and install from https://nodejs.org/

### Port 5173 already in use
Another process is using port 5173. Either:
- Stop the other process
- Or run Vite on a different port: `npm run dev -- --port 3000`

### Audio not working in Jam mode
Click anywhere on the page first. Browsers require user interaction before playing audio.

### Fretboard looks wrong
Try toggling "Invert Strings" in the controls to switch between guitar view and tab view orientation.

## License

MIT

## Acknowledgments

Built with:
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
