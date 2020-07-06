import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Output() playAgain = new EventEmitter();
  winningPlayer: Player;
  players: Player[];

  constructor(public game: GameService) {}

  ngOnInit() {
    this.sortPlayers();
    this.getWinningPlayer();
  }

  sortPlayers() {
    const players = [...this.game.players];
    this.players = players.sort((p1, p2) => {
      return p1.getScore() - p2.getScore();
    });
  }

  getWinningPlayer() {
    this.winningPlayer = this.players[0];
  }

  again() {
    this.playAgain.emit();
  }
}
