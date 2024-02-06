import { Player } from './player';

export interface SelectedBooks {
  BOM: boolean;
  DC: boolean;
  PGP: boolean;
  OT: boolean;
  NT: boolean;
}

export interface GameSettings {
  numPlayers: number;
  numRounds: number;
  selectedBooks: SelectedBooks;
}

export interface GameState {
  settings: GameSettings;
  players: Player[];
}
