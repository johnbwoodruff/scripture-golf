import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {GoogleAnalytics} from 'ionic-native';
import {Auth} from '@ionic/cloud-angular';
import {StatsPage} from '../stats/stats';
import {GamePage} from '../game/game';

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
  isAuthenticated: boolean;

  constructor(public nav: NavController, public platform: Platform, public auth: Auth) {
    if(this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.isAuthenticated = this.auth.isAuthenticated();
        GoogleAnalytics.trackView('Home Page');
      });
    }
    else {
      this.isAuthenticated = false;
    }
  }

  openPage(page: string) {
    switch(page) {
      case 'stats':
        this.nav.push(StatsPage);
        break;
      case 'game':
        this.nav.setRoot(GamePage);
        break;
    }
  }
}
