import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GameState, GameSettings } from './game.store.types';
import {
  generateBooks,
  generatePlayers,
  generateScriptures
} from '../../utils/utils';

const initialState: GameState = {
  settings: {
    numPlayers: 1,
    numRounds: 1,
    selectedBooks: {
      BOM: true,
      DC: false,
      PGP: false,
      OT: false,
      NT: false
    }
  },
  players: [],
  currentPlayer: 1,
  currentRound: 1,
  books: [],
  scriptures: [],
  roundState: 'verse'
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    startGame(): void {
      const settings = store.settings();
      const players = generatePlayers(settings.numPlayers);
      const books = generateBooks(settings.selectedBooks);
      const scriptures = generateScriptures(
        settings.selectedBooks,
        settings.numRounds
      );

      const newState = {
        currentRound: 1,
        currentPlayer: 1,
        players,
        books,
        scriptures
      };
      patchState(store, newState);
    },
    updateSettings(settings: GameSettings): void {
      patchState(store, { settings });
    },
    toggleRoundState(): void {
      const roundState = store.roundState();
      const newRoundState = roundState === 'verse' ? 'guess' : 'verse';
      patchState(store, { roundState: newRoundState });
    }
  }))
);
