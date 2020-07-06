import { Injectable } from '@angular/core';
import { GameSettings } from '../../interfaces/game-settings';
import { Scripture, ScriptureBook } from '../../interfaces/scripture';
import { SCRIPTURES } from '../../data/scriptures';
import { BOOKS } from '../../data/books';
import { Player } from '../../interfaces/player';

export enum GUESS_STATE {
  BOOK = 'BOOK',
  CHAPTER = 'CHAPTER'
}

export enum PAGE_STATE {
  VERSE = 'VERSE',
  GUESS = 'GUESS',
  RESULTS = 'RESULTS'
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  settings: GameSettings;
  activePlayer: number;
  currentRound: number;
  volumes: string[] = [];
  books: ScriptureBook[] = [];
  scriptures: Scripture[] = [];
  players: Player[] = [];
  pageState: PAGE_STATE = PAGE_STATE.VERSE;
  guessState: GUESS_STATE = GUESS_STATE.BOOK;

  constructor() {}

  startGame() {
    this.clearState();
    this.activePlayer = 1;
    this.currentRound = 1;
    this.generateBooks();
    this.generateScriptures();
    this.generatePlayers();
  }

  get currentScripture() {
    return this.scriptures[this.currentRound - 1];
  }

  get currentPlayer() {
    return this.players.find((p) => p.playerNumber === this.activePlayer);
  }

  nextPlayer() {
    if (this.activePlayer === this.settings.numPlayers) {
      // Starting next round
      this.currentRound++;
      this.activePlayer = 1;
    } else {
      this.activePlayer++;
    }
  }

  incrementPoints() {
    const index = this.players.findIndex(
      (p) => p.playerNumber === this.activePlayer
    );
    this.players[index].addPoint(this.currentRound);
  }

  getBooksByKey(key: string): ScriptureBook[] {
    return this.books.filter((b) => b.key === key);
  }

  private clearState() {
    this.pageState = PAGE_STATE.VERSE;
    this.guessState = GUESS_STATE.BOOK;
    this.volumes = [];
    this.books = [];
    this.scriptures = [];
    this.players = [];
  }

  private generateBooks() {
    for (const key in this.settings.selectedBooks) {
      if (this.settings.selectedBooks[key] === true) {
        this.volumes.push(key);
      }
    }
    this.books = BOOKS.filter((b) => this.volumes.includes(b.key));
  }

  private generateScriptures() {
    const scriptures = SCRIPTURES.filter((s) =>
      this.volumes.includes(s.volume)
    );
    this.scriptures = this.shuffle(scriptures);
  }

  private generatePlayers() {
    for (let i = 1; i <= this.settings.numPlayers; i++) {
      const player = new Player(`Player ${i}`, i);
      this.players.push(player);
    }
  }

  private shuffle(array: Scripture[]): Scripture[] {
    const arr = [...array];
    // Shuffle function based on the Fisher-Yates (Knuth) Shuffle.
    let currentIndex = arr.length;
    let temporaryValue;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }
}
