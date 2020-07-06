export interface SelectedBooks {
  BOM: boolean;
  DC: boolean;
  PGP: boolean;
  OT: boolean;
  NT: boolean;
}

export interface GameSettings {
  numPlayers: number;
  selectedBooks: SelectedBooks;
  rounds: number;
}
