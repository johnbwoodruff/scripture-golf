# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Scripture Golf is an LDS scripture trivia game where players guess the book and chapter of displayed scripture verses. Built with Angular 18 and Capacitor for cross-platform deployment (web, iOS, Android).

## Commands

```bash
npm start          # Dev server at http://localhost:4200/
npm run build      # Production build
npm test           # Run Karma tests (Chrome)
npm run sync       # Build and sync to native platforms

# Native development
npx cap open ios      # Open in Xcode
npx cap open android  # Open in Android Studio
npx cap run ios       # Run on iOS device/simulator
npx cap run android   # Run on Android device/emulator
```

## Architecture

### State Management

Uses NgRx SignalStore (`@ngrx/signals`) with two stores:

- **GameStore** (`src/app/stores/game-store/game.store.ts`) - Core game logic: player management, round progression, scoring, scripture selection. Handles game flow state machines (`RoundState`: verse/guess, `GuessState`: book/chapter).
- **ScriptureGolfStore** (`src/app/stores/app-store/app.store.ts`) - App-level state (theme preferences).

### Scripture Data

Two scripture data sources in `src/app/data/`:
- `scriptures.ts` - Curated scripture mastery verses for standard mode
- `lds-scriptures.ts` - Full LDS scripture database for expert mode (larger dataset)

Volume keys: `BOM`, `DC`, `PGP`, `OT`, `NT`

### Game Flow

1. **Settings** (`game-settings/`) - Configure players, rounds, volumes, hints, expert mode
2. **Game** (`game/`) - Display verse, accept book guess, then chapter guess
3. **Scorecard** (`scorecard/`) - Final scores (golf-style: lower is better)

### Key Patterns

- All components use `OnPush` change detection
- Standalone components with lazy loading via routes
- SCSS styling with TailwindCSS and DaisyUI
- Component prefix: `sg-`
- Icons via Lucide Angular (`src/app/utils/icons.ts`)
