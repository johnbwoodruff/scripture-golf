import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GameState, GameSettings } from './game.store.types';

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
  scriptures: []
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    startGame(): void {},
    updateSettings(settings: GameSettings): void {
      patchState(store, { settings });
    }
  }))
);
