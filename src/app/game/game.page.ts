import { Component, OnInit } from '@angular/core';
import { GameService, PAGE_STATE } from '../common/services/game/game.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit {
  constructor(
    public game: GameService,
    private router: Router,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.game.startGame();
    console.log(this.game.currentScripture);
  }

  toggleState() {
    this.game.pageState =
      this.game.pageState === PAGE_STATE.VERSE
        ? PAGE_STATE.GUESS
        : PAGE_STATE.VERSE;
  }

  correct() {
    if (this.game.currentRound < this.game.settings.rounds) {
      // Not last round, go to next player
      this.nextPlayer();
    } else {
      if (
        this.game.settings.numPlayers > 1 &&
        this.game.activePlayer < this.game.settings.numPlayers
      ) {
        // Last round, not last player
        this.nextPlayer();
      } else {
        // Last round, last player
        this.endGame();
      }
    }
  }

  incorrect() {
    this.game.incrementPoints();
  }

  nextPlayer() {
    this.game.nextPlayer();
    this.game.pageState = PAGE_STATE.VERSE;
    this.nextPlayerAlert();
    console.log(this.game.currentScripture);
  }

  endGame() {
    this.game.pageState = PAGE_STATE.RESULTS;
  }

  playAgain() {
    this.game.startGame();
    this.game.pageState = PAGE_STATE.VERSE;
  }

  async nextPlayerAlert() {
    const alert = await this.alert.create({
      header: 'You got it!',
      message: 'Pass the phone to the next player',
      buttons: ['OK']
    });
    await alert.present();
  }

  async quit() {
    const alert = await this.alert.create({
      header: 'Are you sure?',
      message: 'You are about to quit the game. Do you want to do this?',
      buttons: [
        {
          text: 'Stay',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Quit',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
}
