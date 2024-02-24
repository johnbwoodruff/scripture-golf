import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { isNil } from 'lodash-es';
import { GameStore } from '../stores/game-store/game.store';
import { GameSettings } from '../stores/game-store/game.store.types';

@Component({
  selector: 'sg-game',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  store = inject(GameStore);
  router = inject(Router);

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
}
