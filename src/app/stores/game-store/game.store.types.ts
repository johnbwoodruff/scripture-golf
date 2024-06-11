import { Scripture, ScriptureBook } from '../../data/data.types';
import { Player } from './player';

export interface SelectedBooks {
  BOM: boolean;
  DC: boolean;
  PGP: boolean;
  OT: boolean;
  NT: boolean;
}

export interface GroupedBook {
  volume: string;
  books: ScriptureBook[];
}

export interface GameSettings {
  numPlayers: number;
  numRounds: number;
  selectedBooks: SelectedBooks;
  hints: boolean;
  limitGuesses: boolean;
}

export type RoundState = 'verse' | 'guess';

export type GuessState = 'book' | 'chapter';

export interface GameState {
  settings: GameSettings;
  players: Player[];
  currentPlayerNum: number;
  currentRound: number;
  books: ScriptureBook[];
  scriptures: Scripture[];
  roundState: RoundState;
  guessState: GuessState;
  incorrectGuesses: (string | number)[];
}
