import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService, GUESS_STATE } from '../../services/game/game.service';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  /**
   * Emitted when both guesses are correct, indicating to move to the next round.
   */
  @Output() correct = new EventEmitter();

  /**
   * Emitted on any incorrect guess. Used for incrementing points.
   */
  @Output() incorrect = new EventEmitter();

  constructor(public game: GameService) {}

  ngOnInit() {}

  onBookCorrect() {
    this.game.guessState = GUESS_STATE.CHAPTER;
  }

  onBookIncorrect() {
    // Increment point count
    this.incorrect.emit();
  }

  onChapterCorrect() {
    this.correct.emit();
    this.game.guessState = GUESS_STATE.BOOK;
  }

  onChapterIncorrect() {
    this.incorrect.emit();
  }
}
