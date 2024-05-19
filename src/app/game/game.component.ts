import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isNil } from 'lodash-es';
import { GameStore } from '../stores/game-store/game.store';
import { GameSettings } from '../stores/game-store/game.store.types';
import { LucideAngularModule } from 'lucide-angular';
import { ICONS } from '../utils/icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sg-game',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  store = inject(GameStore);
  router = inject(Router);
  icons = ICONS;
  guessLabel = computed(() =>
    this.store.guessState() === 'book' ? 'Book' : 'Chapter'
  );
  bookGuess = signal<string | null>(null);
  chapterGuess = signal<number | null>(null);

  constructor() {
    const gameSettings = this.router.getCurrentNavigation()?.extras
      .state as GameSettings;
    if (!isNil(gameSettings)) {
      this.store.updateSettings(gameSettings);
      this.store.startGame();
    }
  }

  toggleRoundState(): void {
    this.store.toggleRoundState();
  }

  guess(): void {
    if (this.store.guessState() === 'book') {
      this.guessBook();
    } else {
      this.guessChapter();
    }
  }

  private guessBook(): void {
    const guess = this.bookGuess();
    if (isNil(guess)) {
      return;
    }

    if (guess === this.store.currentScripture().book) {
      this.store.successfulGuess();
    } else {
      this.store.addIncorrectGuess(guess);
    }

    this.bookGuess.set(null);
  }

  private guessChapter(): void {
    const guess = this.chapterGuess();
    if (isNil(guess)) {
      return;
    }

    if (guess === this.store.currentScripture().chapter) {
      this.store.successfulGuess();
    } else {
      this.store.addIncorrectGuess(guess);
    }

    this.chapterGuess.set(null);
  }
}
