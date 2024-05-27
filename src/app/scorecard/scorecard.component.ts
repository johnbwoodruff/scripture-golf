import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { GameStore } from '../stores/game-store/game.store';
import { ScoreOrderPipe } from '../score-order/score-order.pipe';
import { ICONS } from '../utils/icons';
import { Player } from '../stores/game-store/player';

@Component({
  selector: 'sg-scorecard',
  standalone: true,
  imports: [RouterLink, ScoreOrderPipe, LucideAngularModule],
  templateUrl: './scorecard.component.html',
  styleUrl: './scorecard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScorecardComponent {
  store = inject(GameStore);
  router = inject(Router);
  icons = ICONS;

  playAgain(): void {
    this.store.startGame();
    this.router.navigate(['/game']);
  }
}
