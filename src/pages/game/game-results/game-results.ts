import { Component } from '@angular/core';

import { Game } from '../../../providers';
import { Player } from '../../../models';

@Component({
  selector: 'game-results',
  templateUrl: 'game-results.html'
})
export class GameResults {
  players: Player[];
  winningPlayer: Player;

  constructor(public gameCtrl: Game) {
    this.players = this.gameCtrl.players;
    this.sortPlayers();
  }

  sortPlayers() {
    this.players.sort((p1, p2) => {
      return p1.getScore() - p2.getScore();
    });
  }
}
