import { Component, Output, EventEmitter } from '@angular/core';
import { SocialSharing } from 'ionic-native';

import { Game, SgToast } from '../../../providers/index';
import { Player } from '../../../models/index';

export const SG_IMAGE_URL = 'https://scontent.fsnc1-2.fna.fbcdn.net/v/t1.0-9/546832_481226958564464_176895884_n.png?oh=8ba669a95e242d88fbbbdbaf5d16ddec&oe=5893BEAE';

@Component({
  selector: 'game-results',
  templateUrl: 'game-results.html'
})
export class GameResults {
  @Output() onEndResults = new EventEmitter<string>();
  players: Player[];
  winningPlayer: Player;
  numRounds: number;
  numPlayers: number;

  constructor(public gameCtrl: Game, public toastCtrl: SgToast) {
    this.players = this.gameCtrl.players;
    this.numPlayers = this.gameCtrl.options.numPlayers;
    this.numRounds = this.gameCtrl.options.numRounds;
    this.sortPlayers();
    this.getWinningPlayer();
  }

  sortPlayers() {
    this.players.sort((p1, p2) => {
      return p1.getScore() - p2.getScore();
    });
  }

  getWinningPlayer() {
    this.winningPlayer = this.players[0];
  }

  share() {
    let message: string;
    if(this.numPlayers === 1) {
      message = `I scored ${this.winningPlayer.getScore()} in a game of Scripture Golf! #ScriptureGolf`;
    }
    else {
      message = `I defeated ${this.numPlayers - 1} other players in a game of Scripture Golf! #ScriptureGolf`;
    }
    SocialSharing.share(message, 'Scripture Golf', SG_IMAGE_URL, 'https://www.facebook.com/ldsscripturegolf/').then(() => {
      console.log('Shared');
    }).catch(() => {
      this.toastCtrl.showToast('Cannot share at this time');
    });
  }

  playAgain() {
    this.onEndResults.emit('AGAIN');
  }
}
