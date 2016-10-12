import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StatsPage} from '../stats/stats';
import {GamePage} from '../game/game';
import {LeaderboardPage} from '../leaderboard/leaderboard';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public nav: NavController) {}

  openPage(page: string) {
    switch(page) {
      case 'stats':
        this.nav.push(StatsPage);
        break;
      case 'game':
        this.nav.setRoot(GamePage);
        break;
      case 'leaderboard':
        this.nav.push(LeaderboardPage);
        break;
    }
  }
}
