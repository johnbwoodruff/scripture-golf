import { Injectable } from '@angular/core';
import { GameOptionsConfig, Player } from '../../models';
import 'rxjs/add/operator/map';

/*
  Generated class for the Game provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Game {
  public options: GameOptionsConfig;
  public players: Player[];
  public currentRound: number;
  public currentPlayer: number;

  constructor() {}

  public configure(options: GameOptionsConfig) {
    this.options = options;
  }

  public getOptions(): GameOptionsConfig {
    return this.options;
  }

  public initPlayers(players: Player[]) {
    this.players = players;
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayer-1];
  }

  public getCurrentRound(): number {
    return this.currentRound;
  }

  public getPlayer(playerNumber: number): Player {
    return this.players[playerNumber-1];
  }

  public savePlayer(player: Player) {
    this.players[player.playerNumber-1] = player;
  }

  public startGame() {
    this.currentRound = 1;
    this.currentPlayer = 1;
  }

  public nextPlayer() {
    if(this.currentPlayer === this.players.length) {
      // Start New Round
      this.currentPlayer = 1;
      this.currentRound++;
    }
    else {
      this.currentPlayer++;
    }
  }
}
