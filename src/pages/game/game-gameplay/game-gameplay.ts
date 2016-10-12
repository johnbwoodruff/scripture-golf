import { Component, Output, EventEmitter } from '@angular/core';
import { Game, Scriptures } from '../../../providers';
import { Scripture, Player, Book } from '../../../models';

const GUESSING_STATE_CHAPTER = 'CHAPTER';

@Component({
  selector: 'game-gameplay',
  templateUrl: 'game-gameplay.html'
})
export class GameGameplay {
  @Output() onFinishGame = new EventEmitter<boolean>();
  scriptures: Scripture[];
  books: Book[];
  numPlayers: number;
  numRounds: number;
  sameScriptures: boolean;
  currScripture: Scripture;
  currPlayer: Player;
  currRound: number;
  guessedChapters: number[];
  chapterGuess: number;
  showVerse: boolean;
  guessingState: string;
  bookOfMormon: string;
  doctrineAndCovenants: string;
  pearlOfGreatPrice: string;
  oldTestament: string;
  newTestament: string;

  constructor(public scriptureService: Scriptures, public gameCtrl: Game) {
    this.currPlayer = new Player('Player 1', 1);
    this.currScripture = {
      book: '',
      chapter: 0,
      verse: ''
    };
    this.guessedChapters = [];
    this.showVerse = false;
    this.guessingState = GUESSING_STATE_CHAPTER;
    this.numPlayers = this.gameCtrl.getOptions().numPlayers;
    this.numRounds = this.gameCtrl.getOptions().numRounds;
    this.sameScriptures = this.gameCtrl.getOptions().sameScriptures;
    this.getBooks();
    this.selectScriptures(this.numPlayers, this.numRounds, this.sameScriptures).then((successful) => {
      if(successful) {
        this.startGame();
      }
    });
  }

  /* GAME SETUP */

  selectScriptures(numPlayers: number, numRounds: number, sameScriptures: boolean): Promise<boolean> {
    let p = new Promise((resolve, reject) => {
      let allScriptures: Scripture[], numScriptures: number;
      this.scriptureService.getScriptures().then((data) => {
        // Ensure scriptures are sufficiently randomized.
        allScriptures = this.shuffle(data);
        if(sameScriptures) {
          numScriptures = numRounds;
        }
        else {
          numScriptures = numRounds * numPlayers;
        }
        this.scriptures = allScriptures.slice(0, numScriptures);
        resolve(true);
      });
    });
    return p;
  }

  getBooks() {
    this.scriptureService.getBooks().then((data) => {
      this.books = data;
    });
  }

  shuffle(array: Scripture[]): Scripture[] {
    // Shuffle function based on the Fisher-Yates (Knuth) Shuffle.
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  /* GAME METHODS */

  startGame() {
    this.gameCtrl.startGame();
    this.currPlayer = this.gameCtrl.getCurrentPlayer();
    this.currScripture = this.scriptures[0];
    this.currRound = this.gameCtrl.getCurrentRound();
    // TODO: TAKE THIS OUT
    console.log(this.currScripture);
  }

  selectionChanged(select: string) {
    if(select !== 'BOM') {
      this.bookOfMormon = null;
    }
    if(select !== 'DC') {
      this.doctrineAndCovenants = null;
    }
    if(select !== 'PGP') {
      this.pearlOfGreatPrice = null;
    }
    if(select !== 'OT') {
      this.oldTestament = null;
    }
    if(select !== 'NT') {
      this.newTestament = null;
    }
  }

  checkBook() {
    let book = this.currScripture.book;
    if(this.bookOfMormon === book || this.doctrineAndCovenants === book || this.pearlOfGreatPrice === book || this.oldTestament === book || this.newTestament === book) {
      // Answer is correct
      this.guessingState = GUESSING_STATE_CHAPTER;
    }
    else {
      // Answer is incorrect, add point
      this.currPlayer.addPoint(this.currRound);
    }
  }

  checkChapter() {
    if(this.chapterGuess === this.currScripture.chapter) {
      // Answer is correct, end current player's turn
      this.endRound();
    }
    else {
      // Answer is incorrect, record guess and add point
      this.guessedChapters.push(this.chapterGuess);
      this.currPlayer.addPoint(this.currRound);
      this.chapterGuess = null;
    }
  }

  endRound() {
    // Persist player to the game controller
    this.gameCtrl.savePlayer(this.currPlayer);
    this.gameCtrl.nextPlayer();
  }

  toggleVerse() {
    this.showVerse = !this.showVerse;
  }

  finishGame() {
    // End game and emit event
    this.onFinishGame.emit(true);
  }
}
