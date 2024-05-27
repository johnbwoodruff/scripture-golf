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

  bookGuessDiabled = computed(() => {
    const guess = this.bookGuess();
    return isNil(guess);
  });

  chapterGuessDiabled = computed(() => {
    const guess = this.chapterGuess();
    return isNil(guess) || guess < 1;
  });

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

  public guessBook(): void {
    if (this.bookGuessDiabled()) {
      return;
    }

    const guess = this.bookGuess()!;

    if (guess === this.store.currentScripture().book) {
      this.store.successfulGuess();
    } else {
      this.store.addIncorrectGuess(guess);
    }

    this.bookGuess.set(null);
  }

  public guessChapter(): void {
    if (this.chapterGuessDiabled()) {
      return;
    }

    const guess = this.chapterGuess()!;

    if (guess === this.store.currentScripture().chapter) {
      this.store.successfulGuess();
    } else {
      this.store.addIncorrectGuess(guess);
    }

    this.chapterGuess.set(null);
  }
}
