import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
import { GameState, GameSettings } from './game.store.types';
import {
  generateBooks,
  generatePlayers,
  generateScriptures,
  groupBooksByVolume
} from '../../utils/utils';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';

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
    },
    hints: true,
    expertMode: false,
    limitGuesses: false
  },
  players: [],
  currentPlayerNum: 1,
  currentRound: 1,
  books: [],
  scriptures: [],
  roundState: 'verse',
  guessState: 'book',
  incorrectGuesses: []
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(
    ({ currentRound, currentPlayerNum, scriptures, players, books }) => ({
      /**
       * The current scripture. Derived from the current round.
       */
      currentScripture: computed(() => scriptures()[currentRound() - 1]),
      /**
       * The current player. Derived from the current player number.
       */
      currentPlayer: computed(() => players()[currentPlayerNum() - 1]),
      /**
       * The current player's score.
       */
      currentPlayerScore: computed(() =>
        players()[currentPlayerNum() - 1].getScore()
      ),
      /**
       * The books grouped by volume for the select list.
       */
      booksSelectList: computed(() => groupBooksByVolume(books()))
    })
  ),
  withMethods((store, router = inject(Router)) => ({
    /**
     * Given the game settings, start the game and begin with the
     * first player and scripture.
     */
    startGame(): void {
      const settings = store.settings();
      const players = generatePlayers(settings.numPlayers);
      const books = generateBooks(settings.selectedBooks);
      const scriptures = generateScriptures(
        settings.selectedBooks,
        settings.numRounds,
        settings.expertMode
      );

      const newState: Partial<GameState> = {
        guessState: 'book',
        roundState: 'verse',
        currentRound: 1,
        currentPlayerNum: 1,
        players,
        books,
        scriptures,
        incorrectGuesses: []
      };
      patchState(store, newState);
    },
    /**
     * Move to the next player. If at the end, move to next round
     * and start back at first player.
     */
    nextPlayer(): void {
      const currentRound = store.currentRound();
      const currentPlayerNum = store.currentPlayerNum();
      if (currentPlayerNum === store.players().length) {
        if (currentRound === store.settings.numRounds()) {
          // Game over
          router.navigate(['scorecard']);
        } else {
          // Move to new round, start with first player
          patchState(store, {
            currentPlayerNum: 1,
            roundState: 'verse',
            guessState: 'book',
            incorrectGuesses: [],
            currentRound: currentRound + 1
          });
        }
      } else {
        // Stay on current round, move to next player.
        patchState(store, {
          currentPlayerNum: currentPlayerNum + 1,
          roundState: 'verse',
          guessState: 'book',
          incorrectGuesses: []
        });
      }
    },
    /**
     * Update the game state settings.
     */
    updateSettings(settings: GameSettings): void {
      patchState(store, { settings });
    },
    /**
     * Toggles the state of the round, whether looking at the
     * verse or the guess screen.
     */
    toggleRoundState(): void {
      const newRoundState = store.roundState() === 'verse' ? 'guess' : 'verse';
      patchState(store, { roundState: newRoundState });
    },
    /**
     * We have a successful guess. If it was a book guess, move
     * to the chapter guess state. If it was a chapter guess,
     * then move to the next player.
     */
    successfulGuess(): void {
      if (store.guessState() === 'book') {
        patchState(store, { guessState: 'chapter', incorrectGuesses: [] });
      } else {
        this.nextPlayer();
      }
    },
    /**
     * Add a wrong guess to the list of wrong guesses and increment
     * the player's score.
     */
    addIncorrectGuess(guess: string | number): void {
      if (!store.incorrectGuesses().includes(guess)) {
        const currentRound = store.currentRound();
        const player = store.currentPlayer();
        const playerIndex = store.currentPlayerNum() - 1;
        player.addPoint(currentRound);
        const players = store.players();
        patchState(store, (state) => ({
          players: [
            ...players.slice(0, playerIndex),
            player,
            ...players.slice(playerIndex + 1)
          ],
          incorrectGuesses: Array.from(
            new Set([...state.incorrectGuesses, guess])
          )
        }));
      }
    }
  }))
);
