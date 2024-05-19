import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../stores/game-store/player';
import { isNil } from 'lodash-es';

@Pipe({
  name: 'scoreOrder',
  standalone: true
})
export class ScoreOrderPipe implements PipeTransform {
  transform(players: Player[]): Player[] {
    if (isNil(players) || players.length === 0) {
      return [];
    }

    return players.sort((a, b) => {
      if (a.getScore() > b.getScore()) return 1;
      if (a.getScore() < b.getScore()) return -1;
      return 0;
    });
  }
}
